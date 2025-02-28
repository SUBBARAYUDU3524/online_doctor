import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import SplashLayout from "./components/SplashLayout";
import { UserProvider } from "./UserContext";

const inter = Inter({ subsets: ["latin"] }); // ✅ Define Inter properly
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ONLINE DOCTOR CONSULTATAION",
  description: "THIS IS THE WEBISTIE FOR ONLINE DOCTOR CONSULTATION",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ThemeProvider>
            <SplashLayout>{children}</SplashLayout>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
