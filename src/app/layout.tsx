'use client';
import "@/css/satoshi.css";
import "@/css/style.css";
import {UserProvider} from "../../context/UserContext";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "../../lib/queryClient";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <UserProvider>
            <html lang="fa" dir={"rtl"}>
            <QueryClientProvider client={queryClient}>
                <body suppressHydrationWarning={true}>{children}</body>
            </QueryClientProvider>
            </html>
        </UserProvider>

    );
}
