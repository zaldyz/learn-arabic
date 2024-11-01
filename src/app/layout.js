import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme_provider";
import "../styles/globals.css";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode_toggle";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn Arabic",
  description: "Arabic Homepage",
};

export default function RootLayout({ children }) {
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
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
