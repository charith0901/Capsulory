# Capsulory

Capsulory is a modern time capsule web application that allows users to store and retrieve memories, messages, and digital artifacts securely over time. Built using **Next.js** for the frontend and **MongoDB** for storage, it offers a seamless and interactive user experience.


## Live Demo

Check out the live demo: [Capsulory](https://capsulory.vercel.app/)

## STRUCTURE

src
    ├── app
        ├── api
        │   ├── Capsules
        │   │   └── route.js
        │   └── auth
        │   │   ├── [...nextauth]
        │   │       └── route.js
        │   │   └── signup
        │   │       └── route.js
        ├── auth
        │   ├── signin
        │   │   └── page.js
        │   └── signup
        │   │   └── page.js
        ├── capsules
        │   ├── [id]
        │   │   └── page.js
        │   └── page.js
        ├── favicon.ico
        ├── globals.css
        ├── layout.js
        ├── page.js
        ├── pages
        │   ├── createCapsule
        │   │   └── page.js
        │   └── myCapsules
        │   │   └── page.js
        ├── recoil
        │   └── capsuleAtom.js
        └── services
        │   └── capsuleApi.js
    ├── components
        ├── CapsuleCard.js
        ├── CapsuloryLanding.js
        ├── CreateCapsule.js
        ├── Navbar.js
        ├── ProtectedRoute.js
        └── ui
        │   └── button.js
    ├── lib
        └── mongodb.js
    └── model
        ├── Capsule.js
        └── User.js

## Features

- **User Authentication**: Secure login and registration with Credentials and Google Oauth.
- **Capsule Creation**: Users can create time capsules with text.
- **Time Lock Mechanism**: Capsules remain locked until the set date.
- **Cloud Deployment**:  **Jenkins** for CI/CD.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Next.js
- **Database**: MongoDB
- **Authentication**: Next-auth , JWT-based authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/charith0901/capsulory.git
   cd capsulory
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_API_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```



**Author**: [Charith](https://github.com/charith0901)
