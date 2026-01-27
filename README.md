# MadeEasy

MadeEasy is a full-stack web application built with **Django (Backend)** and **React (Frontend)**.  
It includes authentication, a study management module, and a food management module.

Check out my website: https://made-easyui.onrender.com
---

## 🚀 Project Structure

MadeEasy/
│
├── Backend/ # Django backend
│ ├── myProject/ # Main Django project
│ ├── studyBox/ # App for semesters & documents
│ ├── foodBox/ # App for hotels, items & reactions
| |--accounts/ # App for storing user credentials & authentication
│ └── env/ # Virtual environment
│
├── Frontend/ # React frontend
│ ├── src/ # React components & pages
│ └── public/
│
└── README.md

yaml
Copy code

---

## 🔑 Features
- **Authentication** (JWT with djangorestframework-simplejwt)
- **StudyBox**: manage semesters and documents
- **FoodBox**: 
  - Hotels with images
  - Items under hotels
  - Reactions (like/dislike system with constraints)
- **Frontend**: React with Axios, Tailwind CSS
- **Backend**: Django REST Framework APIs
- **CORS** enabled for frontend-backend integration

---

## ⚙️ Installation & Setup

### Backend (Django)
```
cd Backend
python -m venv env
source env/bin/activate   # (Linux/Mac)
env\Scripts\activate      # (Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend (React)
```
cd Frontend
npm install
npm start
```

📡 Environment Variables
Backend:
Add settings in .env (example: SECRET_KEY, DEBUG, ALLOWED_HOSTS)

Create .env file with:
REACT_APP_BASE_URL=http://localhost:8000

---

## 🖥️ Project Overview

Click here to watch how my project works👉 https://youtu.be/osaozmxgy5I

Here’s a quick walkthrough of the main pages in the MadeEasy app:

### 🏠 Home Page
- Contains **two animated buttons**: **Notes** & **Hotels**.  
- If the user is already logged in → redirects directly to the **Dashboard**.  
- If not logged in → redirects to **Login page**.  
- Below these buttons, there’s a **Get Started** button → redirects to **Signup page**.
<img width="1919" height="868" alt="Screenshot 2025-09-25 200136" src="https://github.com/user-attachments/assets/c8bcc16f-7c77-42e4-82aa-de5c6d7c7d86" />


### 📝 Signup Page
- Collects **Username, Email, and Password**.  
- Allows new users to create an account and get started with the app.
<img width="1900" height="862" alt="Screenshot 2025-09-25 200206" src="https://github.com/user-attachments/assets/5adcc3ac-5b78-4563-9d8c-b1c9e5dc4c8f" />


### 🔑 Login Page
- Asks for **Username and Password**.  
- Includes a **“Remember Me” option** (recommended for easier access).  
- On successful login, redirects the user to the **Dashboard**.
<img width="1919" height="867" alt="Screenshot 2025-09-25 200227" src="https://github.com/user-attachments/assets/cfd28331-fd0a-45cc-88e6-24d8323796eb" />


### 📊 Dashboard
The dashboard is divided into **two main sections**:

1. **Notes Section (StudyBox)**  
   - Displays **Semesters** (e.g., Semester 1, Semester 2…).  
   - Each semester contains a **list of documents** uploaded/available.
<img width="1919" height="867" alt="Screenshot 2025-09-25 200257" src="https://github.com/user-attachments/assets/8bd4fc11-768c-4a83-aa4d-f28f4c9bcfaf" />


2. **Hotels Section (FoodBox)**  
   - Shows a list of **hotels near the college location**.  
   - Clicking a hotel shows the **items** they sell.  
   - Users can **like/dislike items**, with each user allowed only one reaction per item.
<img width="1919" height="869" alt="Screenshot 2025-09-25 200317" src="https://github.com/user-attachments/assets/47f29e3a-d6d1-450d-8558-7071bcc25a01" />
<img width="1919" height="872" alt="Screenshot 2025-09-25 200348" src="https://github.com/user-attachments/assets/0f50e651-8ee8-493c-bf36-89d97ce240de" />


---

## 👨‍💻 Developed By
**Girish G**

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.


