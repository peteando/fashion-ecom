import React from "react";

export default function Footer(){
  return (
    <footer className="bg-black text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4 text-sm">
          © {new Date().getFullYear()} Sparkies Loans. All rights reserved.
        </p>

        <div className="flex justify-center space-x-6 text-sm">
          <a href="#how" className="hover:underline">
            How It Works
          </a>

          <a href="#loan-types" className="hover:underline">
            Loan Types
          </a>

          <a href="#trust" className="hover:underline">
            Why Trust Us
          </a>

          <a href="#success-stories" className="hover:underline">
            Success Stories
          </a>

          <a href="#faq" className="hover:underline">
            FAQ
          </a>

          <a
            href="#contact"
            className="hover:underline font-semibold text-white"
          >
            Get a Free Quote
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          ABN 12 345 678 910 | Australian Credit License Number 123456
        </p>
      </div>
    </footer>
  );
}