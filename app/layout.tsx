// "use client";
import { Footer, Header, ProfileSidebar, Sidebar } from "@/components";
import { Providers } from "@/components/Providers";
import { userActions, userReducer } from "@/store";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import { useEffect } from "react";
// import { useEffect, useState } from "react";

// const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({
  weight: ["400", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Portal for You - Scope",
  description:
    "Scope is your reliable source of up-to-date news. We provide unique functionality to make your stay on our site as comfortable and informative as possible.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mulish.className} flex justify-between `}>
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
