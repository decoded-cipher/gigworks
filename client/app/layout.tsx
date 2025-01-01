import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google'; // Ensure you have this import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gigwork",
  description: "place where tasks get done",
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}