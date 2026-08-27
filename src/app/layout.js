// app/layout.jsx
import DemoBanner from '@/components/DemoBanner';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0A1628]">
        <DemoBanner />
        {children}
      </body>
    </html>
  );
}