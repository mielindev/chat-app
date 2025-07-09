# Chat App

This is a full-stack chat application built with React, Node.js, Express, MongoDB, and Socket.IO. It supports real-time messaging, user authentication, online status, image sharing, and a modern responsive UI.

## Features

- User authentication (sign up, login, logout)
- Real-time one-to-one messaging
- Online status indicator for users
- Ability to send and receive images in chat
- Responsive and modern UI with theme switching (DaisyUI + Tailwind CSS)
- Profile management (update profile picture)
- Toast notifications for feedback
- User presence and online users list
- Secure JWT-based authentication with HTTP-only cookies

## Tech Stack

- **Frontend:** React, React Router, Zustand, Tailwind CSS, DaisyUI, Axios, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO, Cloudinary (for image uploads), JWT, bcryptjs
- **Database:** MongoDB

## Folder Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeds/
│   │   └── utils/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   └── utils/
│   ├── index.html
│   └── package.json
├── README.md
└── .gitignore
```

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Environment Variables**

   Create a file named `.env` in the `backend` directory and add the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the app**

   In two separate terminals, start both servers:

   ```sh
   # In backend/
   npm run dev

   # In frontend/
   npm run dev
   ```

   The frontend will be available at [http://localhost:5173](http://localhost:5173) and the backend at [http://localhost:5001](http://localhost:5001).

## Usage

- Sign up for a new account or log in with existing credentials.
- Start chatting with other users in real time.
- Update your profile picture from the profile page.
- Switch between multiple UI themes in the settings page.
- See which users are online in the sidebar.

## Folder Details

- **backend/src/controllers/**: Express route handlers for authentication and messaging.
- **backend/src/models/**: Mongoose models for User and Message.
- **backend/src/lib/**: Database connection, Cloudinary config, and Socket.IO server.
- **backend/src/routes/**: Express route definitions.
- **backend/src/middlewares/**: Authentication middleware.
- **backend/src/seeds/**: Database seeding scripts.
- **frontend/src/components/**: React UI components (Navbar, Sidebar, Chat, etc.).
- **frontend/src/pages/**: Page-level React components (Home, Login, Signup, Profile, Settings).
- **frontend/src/store/**: Zustand stores for global state management.
- **frontend/src/constants/**: App-wide constants (themes, API URLs).
- **frontend/src/utils/**: Utility functions (e.g., time formatting).

## Roadmap

- Add ability to create groups
- Add ability to add friends
- Add ability to block users
- Add ability to share files
- Improve UI/UX
- Add more features to the chat window (e.g. emojis, GIFs, etc.)

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and new features.

## License

This project is open source and available under the [MIT License](LICENSE).
