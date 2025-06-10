import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme_provider";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/SessionWrapper";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn Arabic",
  description: "Arabic Homepage",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </body>
      </html>
    </SessionWrapper>
  );
}
