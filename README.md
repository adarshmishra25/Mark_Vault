# 🔐 MarkVault

MarkVault is a secure full-stack web application that allows users to safely manage their bookmarks and passwords in one place. It features secure authentication, encrypted password storage, and a clean, responsive user interface built with the MERN stack.

---

## 🚀 Live Demo

🌐 https://mark-vault.netlify.app/

---

## ✨ Features

### 🔑 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Secure Password Hashing using bcrypt

### 🔒 Password Manager
- Add Passwords
- Edit Passwords
- Delete Passwords
- AES-256 Encryption for stored passwords
- Search Passwords

### 🔖 Bookmark Manager
- Add Bookmarks
- Edit Bookmarks
- Delete Bookmarks
- Category-based Organization
- Search Bookmarks

### 🎨 User Interface
- Clean Dashboard
- Responsive Design
- Mobile Friendly
- Modern UI using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt
- AES-256 Encryption

### Deployment
- Netlify (Frontend)
- Render (Backend)

---

## 📁 Project Structure

```
MarkVault
│
├── client/
│   ├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/adarshmishra25/Mark_Vault.git
```

Move into the project folder

```bash
cd Mark_Vault
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ENCRYPTION_KEY=your_32_character_encryption_key
```

---

## Start the Application

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run dev
```


## 🔐 Security Features

- JWT Authentication
- Protected API Routes
- bcrypt Password Hashing
- AES-256 Password Encryption
- User-specific Data Isolation
- Secure REST APIs

---

## 📈 Future Improvements

- Password Generator
- Password Strength Indicator
- Dark Mode
- Browser Extension
- Import/Export Data
- Two-Factor Authentication (2FA)
- Password Expiry Notifications
- Favorite Bookmarks
- Cloud Backup

---

## 👨‍💻 Author

**Adarsh Mishra**

GitHub: https://github.com/adarshmishra25

LinkedIn: *(Add your LinkedIn Profile)*

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
