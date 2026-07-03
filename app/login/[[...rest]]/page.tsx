"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
        />
      
    </div>
  );
}