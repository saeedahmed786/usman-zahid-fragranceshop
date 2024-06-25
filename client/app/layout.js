export const metadata = {
  title: "My Shop | High-Quality Fragrances for Men and Women",
  description: "Discover a vast selection of high-quality perfumes, aftershaves, and colognes for men and women at My Shop. Featuring top brands like Dior, Versace, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-manrofe">{children}</body>
    </html>
  );
}
