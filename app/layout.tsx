import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Babcia Gotuje - Tradycyjna Kuchnia Polska',
  description: 'Wysokiej klasy restauracja serwująca kultowe, ręcznie lepione pierogi, staropolski żurek i wybitne dania polskiej kuchni.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
