import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="aboslute flex justify-center">
          {children}
          <div className="absolute bg-slate-400 rounded-md shadow-md mt-5">
            <h1 className="text-center text-4xl font-bold p-5">
              Metro Explorer
            </h1>
          </div>
        </main>
      </body>
    </html>
  );
}
