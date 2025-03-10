"use client"; // Make sure this is a client component

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { RecoilRoot } from 'recoil';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Your meta tags and other head elements */}
      </head>
      <body>
        <SessionProvider>
          <RecoilRoot>
            {children} {/* This ensures session context is available throughout the app */}
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}

