# Capsulory

Capsulory is a modern time capsule web application that allows users to store and retrieve memories, messages, and digital artifacts securely over time. Built using **Next.js** for the frontend and **MongoDB** for storage, it offers a seamless and interactive user experience.

## Features

- **User Authentication**: Secure login and registration with Credentials and Google Oauth.
- **Capsule Creation**: Users can create time capsules with text.
- **Time Lock Mechanism**: Capsules remain locked until the set date.
- **Cloud Deployment**:  **Jenkins** for CI/CD.

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

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
