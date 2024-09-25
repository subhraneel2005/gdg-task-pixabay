import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";


export const metadata: Metadata = {
  title: "Image-Vault",
  description: "Image-Vault lets you easily save and organize your favorite images in one convenient app. Enjoy seamless image management and quick access to your cherished moments!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
            <Toaster richColors position="top-right"/>
            <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
              {children}
            </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
      