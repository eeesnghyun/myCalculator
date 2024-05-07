import type { Metadata } from "next";
import "./globals.css";
import "./font.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "간편한 대출이자계산기",
  description: "대출이자계산기를 간편하게 사용해 보세요",
};

declare global {
  interface Window {
    Kakao: any;
    shareChannel: any;
    alertChannel: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}

        <div id="modal"></div>
      </body>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
        integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
        crossOrigin="anonymous"
        async
      />
    </html>
  );
}
