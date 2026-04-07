import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ResumeAI - AI-Powered Resume Builder",
    template: "%s | ResumeAI",
  },
  description: "Build professional resumes in minutes with AI-powered content generation. Choose from beautiful templates and export to PDF.",
  keywords: ["resume builder", "AI resume", "CV maker", "professional resume"],
  openGraph: {
    title: "ResumeAI - AI-Powered Resume Builder",
    description: "Build professional resumes in minutes with AI.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    siteName: "ResumeAI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white font-sans">{children}</body>
    </html>
  );
}
