import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "Mango — share vividly",
    description:
      "A playful, interactive friends-first social journal powered by magic words.",
    applicationName: "Mango",
    themeColor: "#faf7f5",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Mango — share vividly",
      description: "Friends, magic words, waves, and wonderfully low-stakes sharing.",
      type: "website",
      images: [{ url: imageUrl, width: 1730, height: 909, alt: "Mango — share vividly" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mango — share vividly",
      description: "Friends, magic words, waves, and wonderfully low-stakes sharing.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
