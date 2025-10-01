import MainLayout from "@/components/MainLayout/MainLayout";
import "./global.css"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'body'}>
        <MainLayout/>
        {children}
      </body>
    </html>
  );
}
