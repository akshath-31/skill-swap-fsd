# Skill Swap Marketplace

A modern web application facilitating the exchange of skills between users. Built with a focus on a seamless user experience, robust authentication, and scalable architecture.

## 🚀 Technologies Used

### Frontend

- **React 18**: Core library for building the user interface.
- **TypeScript**: Statically typed JavaScript for better code quality.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn/ui**: Reusable, accessible component library based on Radix UI.
- **Sonner**: For elegant toast notifications.

### Backend & Infrastructure

- **Firebase**: Handles User Authentication (Google Sign-In, Email/Password).
- **Supabase (PostgreSQL)**: Primary database for storing user profiles and application data.
- **Node.js + Express** (Planned): For implementing complex business logic and API endpoints.

## 📂 Project Structure

```bash
c:/Projects/Skill-Swap/skill-swap-fsd/
├── src/
│   ├── components/     # Reusable UI components (shadcn/ui, layout, etc.)
│   ├── contexts/       # Global State (AuthContext, ThemeContext)
│   ├── lib/            # Configuration files (firebase.ts, supabase.ts, utils.ts)
│   ├── pages/          # Application Routes (Login, Register, Learn, Teach, Profile)
│   └── hooks/          # Custom React Hooks
├── public/             # Static assets
└── server/             # (Planned) Node.js Backend
```

## ✨ Key Features

- **Authentication**: Secure login and registration using Firebase Auth.
  - **Google Sign-In**: One-click login.
  - **Email/Password**: Traditional account creation.
- **Data Synchronization**: Automatically syncs Firebase user identities to a Supabase PostgreSQL `users` table.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS.
- **Dark Mode**: Built-in, system-aware theme support.

## 🛠️ Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/akshath-31/skill-swap-fsd.git
    cd skill-swap-fsd
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The application will start at `http://localhost:8080`.

## 🔒 Configuration

The project currently uses direct configuration for Firebase and Supabase in `src/lib/`.

- **Firebase**: configured in `src/lib/firebase.ts`
- **Supabase**: configured in `src/lib/supabase.ts`

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
