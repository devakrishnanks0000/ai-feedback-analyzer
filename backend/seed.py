from app import app, db, User, Feedback
from werkzeug.security import generate_password_hash
from emotion_model import analyze_emotion
from datetime import datetime


def seed_database():
    with app.app_context():
        print("Starting database seed...")

        if Feedback.query.count() >= 10:
            print("⚠️ Database already contains feedback. Skipping seed.")
            return

        user = User.query.filter_by(email="test@example.com").first()

        if not user:
            user = User(
                name="Test User",
                email="test@example.com",
                password=generate_password_hash("123456"),
            )
            db.session.add(user)
            db.session.commit()
            print("Test user created")
        else:
            print("Test user already exists")

        samples = [
            (5, "Amazing product, really loved it"),
            (4, "Very good experience overall"),
            (3, "It was okay, nothing special"),
            (2, "Not great, needs improvement"),
            (1, "Very bad service"),
            (5, "Absolutely fantastic app"),
            (4, "Pretty useful and smooth"),
            (3, "Average experience"),
            (2, "Could definitely improve"),
            (1, "Terrible experience overall"),
        ]

        for rating, comment in samples:
            try:
                sentiment = analyze_emotion(comment)
            except Exception as e:
                print(f"Emotion model failed, using fallback: {e}")
                sentiment = "neutral"

            feedback = Feedback(
                rating=rating,
                comment=comment,
                sentiment=sentiment,
                user_id=user.id,
                created_at=datetime.utcnow(),
            )

            db.session.add(feedback)

        db.session.commit()

        print("Successfully inserted 10 feedback records!")
        print("Seed complete.")


if __name__ == "__main__":
    seed_database()