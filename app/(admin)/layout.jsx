import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NextAuthSessionProviders from "@/providers/NextAuthSessionProviders";
import { cn } from "@/libs/cn";
import { Provider as ReactBalancerProvider } from "react-wrap-balancer";
import Main from "@/components/Main";
import AdminNavBar from "@/components/Admin/AdminNavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jayendra Bharti",
  description: "Portfolio of Jayendra Bharti",
};

export default function RootLayout({ children }) {
return (
<html lang="en" suppressHydrationWarning>
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

<NextAuthSessionProviders>
<ThemeProvider>
<ReactBalancerProvider>
 
  <Main
    id='main' 
    className={cn(
      `main grid grid-rows-[auto_1fr]`,
      `h-[100dvh] max-h-[100dvh] w-full overflow-y-auto`,
      `bg-zinc-100 dark:bg-zinc-900`,
    )}  
    >
    <AdminNavBar/>
    <div className={"flex flex-col h-full overflow-y-scroll"}>
      {children}
    </div>
  </Main>

</ReactBalancerProvider>
</ThemeProvider>
</NextAuthSessionProviders>

</body>
</html>
);
};