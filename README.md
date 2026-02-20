Frontend: http://localhost:5173  
Backend API: http://localhost:5000

# 🤖 AI Feedback Analyzer

An AI-powered full-stack feedback analysis system built using **React** and **Flask**.  
The application allows users to submit feedback which is automatically analyzed using a machine learning emotion detection model.  
Administrators can monitor platform activity through an analytics dashboard.

---

## Features

* User authentication (Signup & Login)  
* Feedback submission with ratings  
* AI-based emotion detection  
* Admin dashboard with analytics  
* Emotion distribution visualization (Chart.js)  
* Modern glassmorphism UI with Tailwind CSS  

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Chart.js
- Framer Motion

### Backend
- Flask
- Flask-SQLAlchemy
- SQLite Database
- Machine Learning Emotion Model

---

## Setup Instructions

Clone Repository

git clone https://github.com/devakrishnanks0000/ai-feedback-analyzer.git
cd ai-feedback-analyzer

Backend Setup (Flask)

cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python seed.py
python app.py

Backend runs at http://localhost:5000

Frontend Setup (React)

cd frontend
npm install
npm run dev

Frontend runs at http://localhost:5173

Test Credentials
Email: test@example.com
Password: 123456

Admin login
Username: admin
Password: admin123


