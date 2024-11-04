"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme_provider";
import "../styles/globals.css";
import Link from "next/link";
import { ModeToggle } from "@/components/mode_toggle";
import { Toaster } from "@/components/ui/sonner";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-col flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <Link
                  className="text-sm font-medium transition-colors hover:text-primary"
                  href="/"
                >
                  Learn Arabic
                </Link>
                <div className="mx-4">
                  <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                    <Link
                      href="/words"
                      className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
                    >
                      Words
                    </Link>
                    <Link
                      href="/rules"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Rules
                    </Link>
                    <Link
                      href="/book"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Book
                    </Link>
                    <Link
                      href="/admin"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Admin
                    </Link>
                  </nav>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  {/* <div>
                    <Input
                      type="search"
                      placeholder="Search for a Word..."
                      className="md:w-[100px] lg:w-[300px]"
                    />
                  </div> */}
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
          {children}
          <div
            className="border-t flex flex-col items-center justify-between p-5"
            ref={ref}
          >
            <ul className="flex flex-row gap-9 p-[40px]">
              <li
                className={`opacity-0 transition-all duration-1000 ${
                  inView ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2.5px]"
                }`}
              >
                <a
                  className="text-white hover:text-blue-600 transition-colors"
                  target="_blank"
                  href="https://www.instagram.com/zaldyzz"
                >
                  <FaInstagram />
                </a>
              </li>
              <li
                className={`opacity-0 transition-all duration-1000 delay-100 ${
                  inView ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2.5px]"
                }`}
              >
                <a
                  className="text-white hover:text-blue-600 transition-colors"
                  target="_blank"
                  href="https://www.twitter.com/zaddyzt"
                >
                  <FaTwitter />
                </a>
              </li>
              <li
                className={`opacity-0 transition-all duration-1000 delay-200 ${
                  inView ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2.5px]"
                }`}
              >
                <a
                  className="text-white hover:text-blue-600 transition-colors"
                  target="_blank"
                  href="https://www.linkedin.com/in/zaldyt/"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li
                className={`opacity-0 transition-all duration-1000 delay-300 ${
                  inView ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2.5px]"
                }`}
              >
                <a
                  className="text-white hover:text-blue-600 transition-colors"
                  target="_blank"
                  href="https://open.spotify.com/user/shalloess"
                >
                  <FaSpotify />
                </a>
              </li>
              <li
                className={`opacity-0 transition-all duration-1000 delay-400 ${
                  inView ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2.5px]"
                }`}
              >
                <a
                  className="text-white hover:text-blue-600 transition-colors"
                  target="_blank"
                  href="https://www.github.com/zaldyz"
                >
                  <FaGithub />
                </a>
              </li>
            </ul>
            <h6
              id="designed-by"
              className={`opacity-0 transition-all duration-2000 pb-5 ${
                inView ? "opacity-100 blur-[0px]" : "opacity-0 blur-[2.5px]"
              }`}
            >
              {"Designed by "}
              <a
                className="text-blue-500 hover:text-blue-700 transition-colors"
                target="_blank"
                href="https://www.github.com/zaldyz"
              >
                zaldyz
              </a>
            </h6>
          </div>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
