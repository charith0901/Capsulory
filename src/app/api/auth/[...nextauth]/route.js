import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../model/User"; 
import connectDB from "../../../../lib/mongodb";
import bcrypt from 'bcryptjs';

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
    ,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Connect to MongoDB (you can do this at the top of the file for better performance)
          await connectDB();

          // Find user by username
          const user = await User.findOne({
            email: credentials.email,
          });

          // Check if password matches using bcrypt
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            // Return user object for successful login
            return { id: user._id, name: user.name, email: user.email };
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
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session object
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
        });
        await newUser.save();
      }

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // Optional: Set a secret to encrypt JWT tokens
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
