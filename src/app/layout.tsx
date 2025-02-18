import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
        <title>MovieReviews</title>
      </head>
      <body className="main-section antialiased relative font-nunito text-sm font-normal">
        {children}
      </body>
    </html>
  );
}
