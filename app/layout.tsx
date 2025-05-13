"use client";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Providers } from "@/lib/Provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <AntdRegistry>{children}</AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
