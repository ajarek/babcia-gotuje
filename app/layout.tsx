import type { Metadata } from "next"
// @ts-ignore: global CSS import declaration is handled by Next.js
import "./globals.css"
export const metadata: Metadata = {
  title: "Babcia Gotuje - Tradycyjna Kuchnia Polska",
  description:
    "Wysokiej klasy restauracja serwująca kultowe, ręcznie lepione pierogi, staropolski żurek i wybitne dania polskiej kuchni.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pl'>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
