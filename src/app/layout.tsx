'use client';
import "@/css/satoshi.css";
import "@/css/style.css";
import {UserProvider} from "../../context/UserContext";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <UserProvider>
            <html lang="fa" dir={"rtl"}>
            <body suppressHydrationWarning={true}>{children}</body>
            </html>
        </UserProvider>

    );
}
