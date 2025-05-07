import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from "@/libs/cn";
import { Provider as ReactBalancerProvider } from "react-wrap-balancer";
import Main from "@/components/Main";

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

<ThemeProvider>
<ReactBalancerProvider>

  <Main
    id='main' 
    className={cn(
      `main grid grid-rows-[auto_1fr_auto]`,
      `h-[100dvh] max-h-[100dvh] w-full overflow-y-auto`,
      `bg-zinc-100 dark:bg-zinc-900`,
    )}  
    >
    <NavBar/>
    <div className={"flex flex-col"}>{children}</div>
    <Footer/>
  </Main>

</ReactBalancerProvider>
</ThemeProvider>

</body>
</html>
);
};