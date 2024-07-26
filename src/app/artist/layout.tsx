// Import statements
import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles if necessary
import Sidebar from "@/components/global/sidebar";

const inter = Inter({ subsets: ["latin"] });

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* Render the sidebar component */}
      <div style={{ flex: 1, marginLeft: "20px" }}> {/* Main content area */}
        <div className={inter.className}> {/* Apply Inter font styles */}
          {children} {/* Render children components */}
        </div>
      </div>
    </div>
  );
}
// ss#EdUf3d