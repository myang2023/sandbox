import { Geist } from "next/font/google";
import { ContextProvider } from "../components/ContextProvider";

import localFont from 'next/font/local'
import "./globals.css";

export const dynamic = 'force-dynamic';

const sim = localFont({
  src: [
    {
      path: '../../public/fonts/simpSHS/sim_sourcehansan_bold-webfont.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/simpSHS/sim_sourcehansan_medium-webfont.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/simpSHS/sim_sourcehansan_normal-webfont.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/simpSHS/sim_sourcehansan_light-webfont.woff2',
      weight: '300',
      style: 'normal'
    },
  ],
  variable: '--font-sim'
})

const trad = localFont({
  src: [
    {
      path: '../../public/fonts/tradSHS/trad_sourcehansan_bold-webfont.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/tradSHS/trad_sourcehansan_medium-webfont.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/tradSHS/trad_sourcehansan_normal-webfont.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/tradSHS/trad_sourcehansan_light-webfont.woff2',
      weight: '300',
      style: 'normal'
    },
  ],
  variable: '--font-trad'
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "个人博客",
  description: "分享趣事",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-cn">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body
        className={`${sim.variable} ${trad.variable} ${geistSans.variable}  antialiased`}
      >
        <ContextProvider>
          {children}

        </ContextProvider>
      </body>
    </html>
  );
}
