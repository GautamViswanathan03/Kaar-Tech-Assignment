# Kaar Tech Registration App

A full-stack registration application built with React frontend, native Node.js backend (without Express), MongoDB, and Selenium-based automated testing.

## Tech Stack

- **Frontend**: React.js with Vite, React Router, Axios
- **Backend**: Node.js (native `http` module - no Express)
- **Database**: MongoDB (using official `mongodb` driver)
- **Testing**: Selenium WebDriver (Chrome)
- **Theme Colors**: Black (#000), Maroon (#800000), Yellow (#FFD700)

## Prerequisites

- Node.js 18+ and npm
- MongoDB running locally at `mongodb://localhost:27017` (or set `MONGO_URI`)
- Google Chrome browser (for Selenium tests)

## Project Structure

```
├── backend/          # Node.js backend (native http)
│   ├── server.js    # Main server file
│   └── package.json
├── frontend/         # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   └── Welcome.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── tests/           # Selenium E2E tests
│   ├── registration.e2e.js
│   └── package.json
└── README.md
```

## Setup & Installation

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

The backend server will run on `http://localhost:5000` by default.

**Environment Variables** (optional):
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string (default: `mongodb://localhost:27017`)

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` by default (Vite).

### 3. Database

Ensure MongoDB is running locally. The app uses:
- **Database**: `kaarTechDB`
- **Collection**: `kaar_users`

To view data:
```bash
mongosh "mongodb://localhost:27017"
use kaarTechDB
db.kaar_users.find().pretty()
```

## Usage

1. Start MongoDB
2. Start backend: `cd backend && npm start`
3. Start frontend: `cd frontend && npm run dev`
4. Open the frontend URL in your browser
5. Fill in the registration form (username, email, password)
6. Click "Register"
7. You'll be redirected to the Welcome page showing your registration details including the hashed password

## API Endpoints

### POST `/register`

Register a new user.

**Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response** (200 OK):
```json
{
  "username": "string",
  "email": "string",
  "hashedPassword": "string"
}
```

## Running Selenium Tests

### Prerequisites
- Backend and frontend must be running
- Chrome browser installed

### Run Tests

```bash
cd tests
npm install
npm test
```

**Environment Variables** (optional):
- `FRONTEND_URL`: Frontend URL (default: `http://localhost:5173`)

The test will:
1. Open Chrome browser
2. Navigate to the registration page
3. Fill in the registration form
4. Submit and verify navigation to Welcome page
5. Verify displayed user data (username, email, hashed password)

**Note**: If you encounter ChromeDriver version mismatch, install the matching version:
```bash
npm install chromedriver@<your-chrome-version> --save
```

## Features

- ✅ Native Node.js HTTP server (no Express)
- ✅ Manual JSON parsing and CORS handling
- ✅ Password hashing with bcryptjs
- ✅ MongoDB integration using official driver
- ✅ React Router for navigation
- ✅ Themed UI (Black, Maroon, Yellow)
- ✅ Selenium E2E automation testing
- ✅ Clean folder structure

## Security Notes

- Passwords are hashed using bcryptjs before storage
- CORS is enabled manually for frontend origin
- The hashed password is returned only for demo display purposes

## License

ISC

