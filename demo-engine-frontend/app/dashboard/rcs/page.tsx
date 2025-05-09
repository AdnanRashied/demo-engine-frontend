"use client";
import React from "react";
import RcsCards from "@/components/molecule/RcsCards";

export default function RcsPage() {
  return (
    <div className="min-h-screen bg-[#013e28] text-white flex flex-col">
      <main className="p-6 md:p-10 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
            Webpage Content
          </h1>
          <p className="text-gray-300 mb-6">
            This is the main content area for the webpage. You can add any
            components or text here. The background color and text color follow
            the specified theme.
          </p>
          <div className="flex flex-wrap gap-6 px-4 sm:px-8 justify-start">
            {" "}
            <RcsCards
              title="RCS Message"
              subtext="Send a message"
              inputWidth="w-full"
              inputHeight="h-10"
              description="A message from a RCS brand."
              inputPlaceholder="Enter the message you want to send."
              showCharacterCount={true}
            />
          </div>
        </div>
      </main>

      <footer className="bg-emerald-900 py-4 px-6 text-center mt-auto">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Your Website Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
