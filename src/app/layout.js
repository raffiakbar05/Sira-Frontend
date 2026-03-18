import './globals.css';

export const metadata = {
  title: 'SIRA — Socratic Interactive RPG Academy',
  description: 'Belajar coding seperti bermain game RPG',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}