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


## Screenshots
<img width="2560" height="1440" alt="homepage" src="https://github.com/user-attachments/assets/dfc1626d-a60d-4640-89ad-fd956f21ca17" />


<img width="2560" height="1440" alt="signup" src="https://github.com/user-attachments/assets/97685913-c7d9-4f47-8afc-60f4576cf339" />


<img width="2560" height="1440" alt="userlogin" src="https://github.com/user-attachments/assets/b2fe5700-1bde-4ef9-a139-d612326d6748" />

<img width="2560" height="1440" alt="feedback" src="https://github.com/user-attachments/assets/f38358ae-7903-4770-a913-39e4391f5c5a" />


<img width="2560" height="1440" alt="adminlogin" src="https://github.com/user-attachments/assets/cf6ef232-6973-4026-a9f7-ce8485b5bea0" />


<img width="2560" height="1440" alt="successmessage" src="https://github.com/user-attachments/assets/01f5a8b7-59d7-4e60-89ab-391ec876ddc7" />


<img width="2560" height="1440" alt="admindashboard" src="https://github.com/user-attachments/assets/21691ce3-986a-49de-88d5-80922403ea59" />


