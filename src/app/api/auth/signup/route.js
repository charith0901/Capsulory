import bcrypt from 'bcryptjs';
import User from '@/model/User';
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const handler = async (req) => {
  if (req.method === 'POST') {
    try {
      const { username, password } = await req.json();

      // Connect to MongoDB
      await connectDB();

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      // Save the new user to the database
      await newUser.save();

      return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    // Handle any other HTTP method (e.g., GET)
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
};

export { handler as GET, handler as POST };
