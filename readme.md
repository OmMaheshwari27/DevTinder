# ❤️ DevTinder - A Developer Matchmaking App

DevTinder is a MERN stack-based social matchmaking platform where developers can discover and connect with like-minded coders. Users can sign up, update their profile, like/dislike other developers, and match with them if the feeling is mutual — just like Tinder, but for devs!

This full-stack app includes user authentication, protected routes, MongoDB integration, image upload support, and clean, modular structure. It's deployed with Vercel + Render (or any other service of your choice).

---

## 🌟 Features

- User Signup & Login with secure JWT authentication
- Profile creation and editing (bio, skills, interests, image upload)
- Like or dislike other developers
- Get notified if a match happens (i.e. both users like each other)
- View feed of users (excluding already liked/disliked users)
- Protected routes for logged-in users only
- Logout functionality with cookie expiration
- MongoDB database integration with Mongoose
- Frontend built using React and Tailwind CSS
- Backend using Node.js, Express.js and MongoDB

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + HTTP-only Cookies
- **Deployment:** Vercel (frontend) + Render (backend)

---

## 🚀 Getting Started

To run this project locally, you'll need Node.js, MongoDB (Atlas or local), and Git installed.

1. **Clone the repo:**

```bash
git clone https://github.com/yourusername/devtinder.git
cd devtinder

2. Install Dependencies
```
npm install
```
## 📦 Additional Dependencies

| Package         | Purpose                           |
|----------------|-----------------------------------|
| express         | Web framework                     |
| mongoose        | MongoDB object modeling           |
| jsonwebtoken    | JWT token creation & verification |
| bcryptjs        | Password hashing                  |
| cookie-parser   | Cookie parsing middleware         |
| dotenv          | Environment variable handling     |
| nodemon (dev)   | Auto-reload server during dev     |

3. Set Up Environment Variables

Create a .env file in the root directory:
```
PORT=3001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devtinder
JWT_SECRET=SecretKey123
```
4. Start the Server
```
node src/app.js
```
🛠️ Technologies Used
	•	Node.js
	•	Express.js
	•	MongoDB + Mongoose
	•	JWT
	•	dotenv
	•	bcrypt (if added for password hashing)

✅ Features
	•	User Signup/Login (JWT Auth)
	•	Secure route protection
	•	MongoDB Database using Mongoose
	•	Modular MVC file structure
	•	Connect request system between users

dev-tinder-backend/
├── src/
│   ├── app.js                  # Entry point
│   ├── models/
│   │   ├── user.js             # User schema
│   │   └── connectRequests.js  # Connection request schema
│   ├── routers/
│   │   ├── auth.js             # Auth routes (login, signup)
│   │   └── request.js          # Connection routes (send, get, respond)
│   ├── middlewares/
│   │   └── auth.js             # JWT Auth middleware
├── .env
├── package.json

🧪 Testing Tips
	•	Use Postman or Thunder Client to test APIs
	•	Set withCredentials: true in frontend Axios requests for cookies
	•	Ensure CORS origin matches frontend URL and allows credentials

🧠 Matchmaking Logic
	•	When user A likes user B:
	•	A request is created/stored in DB
	•	If user B already liked A → it’s a match!
	•	Both users are notified (via frontend logic)
	•	Dislikes are stored to avoid re-showing same user in feed

⸻
👨‍💻 Author

Made with ❤️ by Om Maheshwari
B.Tech CSE @ ABES Engineering College
Connect on LinkedIn | GitHub
