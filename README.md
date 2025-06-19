# 💬 Chatty

**Chatty** is a real-time chat application built with a modern tech stack — React on the frontend and Express + Socket.IO on the backend. It supports user authentication, real-time messaging, and a responsive UI.

---

## 📂 Project Structure

Chatty/
├── backend/ # Node.js + Express + MongoDB + Socket.IO
│ └── src/
│ └── index.js
│ └── package.json
│
├── frontend/ # React + Vite + TailwindCSS
│ └── src/
│ └── package.json
│
└── package.json # Root (optional, for concurrently)

yaml
Copy
Edit

---

## 🚀 Tech Stack

### 🔧 Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- Cloudinary (file/image uploads)
- JWT Authentication
- dotenv + cors + cookie-parser

### 🎨 Frontend
- React 19 + Vite
- TailwindCSS + DaisyUI
- Zustand (state management)
- Axios (API calls)
- React Router DOM
- React Hot Toast (notifications)
- Lucide React (icons)

---

## ⚙️ Getting Started

### 📦 Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud e.g. MongoDB Atlas)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/BellamDeva/Chatty.git
cd Chatty
2. Install Root Dependencies (Optional, for concurrent start)
bash
Copy
Edit
npm install
3. Install Backend Dependencies
bash
Copy
Edit
cd backend
npm install
4. Install Frontend Dependencies
bash
Copy
Edit
cd ../frontend
npm install
🌐 Environment Variables
🔒 Backend .env
Create a .env file inside /backend folder:

ini
Copy
Edit
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
▶️ Running the App
Option 1: Run separately
Backend

bash
Copy
Edit
cd backend
npm run dev
Frontend

bash
Copy
Edit
cd frontend
npm run dev
Option 2: Run both with a single command
From root directory:

bash
Copy
Edit
npm run dev
Requires concurrently and a root package.json with script setup.

📦 Build for Production
Frontend Build

bash
Copy
Edit
cd frontend
npm run build
Backend Deployment

Host with Render, Railway, or VPS.

Set proper CORS origin and .env values.

📸 Screenshots
<!-- Add screenshots or demo gifs here -->
(Coming soon)

🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgements
React & Vite Docs

Express.js

Socket.IO

TailwindCSS

OpenAI for assistance

🔗 Connect with Me
GitHub: BellamDeva
LinkedIn: https://www.linkedin.com/in/bellamdeva/
