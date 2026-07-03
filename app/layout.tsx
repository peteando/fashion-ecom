import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Shopit-ecom",
  description:
    "Search and apply to the latest jobs easily. JobQuest helps job seekers find the best opportunities quickly.",
  openGraph: {
    title: "JobQuest – Your Job Search Companion",
    description:
      "Discover jobs, track applications, and manage your job search efficiently with JobQuest.",
    url: "https://yourjobsite.com",
    images: [
      {
        url: "/og-jobquest.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobQuest – Find Your Next Job Fast",
    description:
      "Search, track, and apply to jobs with ease using JobQuest.",
    images: ["/og-jobquest.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ClerkProvider>
          <Header />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}