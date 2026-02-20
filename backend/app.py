from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from emotion_model import analyze_emotion
from sqlalchemy import func
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ---------------- MODELS ----------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    sentiment = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)    

# ---------------- ROUTES ----------------
@app.route("/")
def home():
    return {"message": "Backend running"}
# ---------------- SIGNUP ----------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"message": "All fields required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)
    
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"})

    # ---------------- SIGNIN ----------------
@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check hashed password
    if not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid password"}), 401

   # return jsonify({"message": "Login successful"})
    return jsonify({
    "message": "Login successful",
    "user_id": user.id,
    "name": user.name,
    "email": user.email
})

    # ---------------- FEEDBACK ----------------
@app.route("/feedback", methods=["POST"])
def submit_feedback():
    data = request.get_json()

    rating = data.get("rating")
    comment = data.get("comment")
    user_id = data.get("user_id")

    if rating < 1 or rating > 5:
        return jsonify({"message": "Rating must be between 1 and 5"}), 400

    if rating is None or not comment or not user_id:
        return jsonify({"message": "All fields required"}), 400

    # Check if user exists
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    sentiment = analyze_emotion(comment)

    new_feedback = Feedback(
        rating=rating,
        comment=comment,
        sentiment=sentiment,
        user_id=user_id
    )

    db.session.add(new_feedback)
    db.session.commit()

    return jsonify({"message": "Feedback submitted successfully","predicted_emotion": sentiment})

# ---------------- ADMIN LOGIN ----------------
@app.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "admin123":
        return jsonify({"message": "Admin login successful"})
    
    return jsonify({"message": "Invalid admin credentials"}), 401

# ---------------- ADMIN DASHBOARD ----------------
@app.route("/admin/dashboard", methods=["GET"])
def admin_dashboard():
    feedbacks = Feedback.query.all()

    results = []

    for feedback in feedbacks:
        user = User.query.get(feedback.user_id)

        results.append({
            "user_name": user.name if user else "Unknown",
            "user_email": user.email if user else "Unknown",
            "rating": feedback.rating,
            "comment": feedback.comment,
            "emotion": feedback.sentiment,
            "submitted_at": feedback.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(results)

# ---------------- SUMMARY ----------------
@app.route("/admin/summary", methods=["GET"])
def admin_summary():
    total_feedback = Feedback.query.count()
    total_users = User.query.count()

    emotion_counts = db.session.query(
        Feedback.sentiment,
        func.count(Feedback.sentiment)
    ).group_by(Feedback.sentiment).all()

    summary = {
        "total_users": total_users,
        "total_feedback": total_feedback,
        "emotion_distribution": {
            emotion: count for emotion, count in emotion_counts
        }
    }

    return jsonify(summary)    
    
# ---------------- RUN APP ----------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
