import type { Metadata } from "next";
import { Roboto, Noto_Sans, ADLaM_Display } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { SITE_URL } from "@/constants/api.constants";

const geistRoboto = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistNotoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin', 'cyrillic'],
});

const adlam = ADLaM_Display({
  variable: '--font-adlam-display',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Wubble",
  description: "Web service monitoring system",
  metadataBase: new URL(SITE_URL)
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistRoboto.variable} ${geistNotoSans.variable} ${adlam.variable} h-full antialiased text-base`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


