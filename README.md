# Skill Swap Marketplace

A modern MERN-stack application facilitating the exchange of skills between users through a credit-based system.

## 🚀 Technologies Used

### Frontend
- **React 18**: Core library for the user interface.
- **TypeScript**: Statically typed code for reliability.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS for premium, responsive styling.
- **React Query**: For efficient data fetching and state synchronization.

### Backend & Infrastructure
- **Node.js + Express**: Scalable backend API server.
- **MongoDB + Mongoose**: Document database for user profiles, skills, and transaction history.
- **Firebase Auth**: Secure identification and Google/Email login integration.

## 📂 Project Structure

```bash
skill-swap-fsd/
├── src/                # Frontend source files
│   ├── components/     # Reusable UI (Skills, Credits, Shared)
│   ├── contexts/       # Auth and Data contexts
│   ├── lib/            # API clients (mongodb-api.ts, firebase.ts)
│   └── pages/          # Core pages (Learn, Teach, Credits)
├── server/             # Backend source files
│   ├── models/         # Mongoose schemas (User, Skill, Transaction)
│   ├── .env.example    # Template for backend environment variables
│   └── index.ts        # Main Express server entry point
└── package.json        # Frontend dependencies and scripts
```

## ✨ Key Features
- **Credit System**: Users start with 100 welcome credits to begin learning.
- **Unified Skills Database**: Filtered "Teach" page for personal skill management and "Learn" page for global community discovery.
- **Transaction History**: Real-time tracking of credit balance and swap history in MongoDB.
- **Automatic User Sync**: Firebase identities are automatically synchronized with MongoDB profiles on first login.

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/akshath-31/skill-swap-fsd.git
cd skill-swap-fsd
```

### 2. Setup Backend (Server)
1. Navigate to the server directory:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in the `server` folder:
   ```env
   # server/.env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
3. Start the backend:
   ```bash
   npm run dev
   ```

### 3. Setup Frontend
1. Return to the root directory:
   ```bash
   cd ..
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`.

## 🔒 Security Note
Environment variables (`.env`) are explicitly ignored by Git to prevent exposing credentials. Always ensure you have a local `.env` file configured before running the application.

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
