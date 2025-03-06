import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../model/User"; 
import connectDB from "../../../../lib/mongodb";
import bcrypt from 'bcryptjs';

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Connect to MongoDB (you can do this at the top of the file for better performance)
          await connectDB();

          // Find user by username
          const user = await User.findOne({
            username: credentials.username,
          });

          // Check if password matches using bcrypt
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            // Return user object for successful login
            return { id: user._id, name: user.username };
          }
          
          return null; // Return null if credentials don't match
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page (optional)
  },
  session: {
    jwt: true, // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to the JWT token if it exists
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session object
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Optional: Set a secret to encrypt JWT tokens
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
