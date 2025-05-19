"use client";

import { UserProvider } from "./context/UserContext";
import Navbar from "./components/molecule/NavBar";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-[#013e28] text-white">
        <UserProvider>
          {!hideNavbar && <Navbar />}
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
