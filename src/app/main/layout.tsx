import "../app/globals.css";
import { ThemeProvider } from "@/components/providers/themes-provider";
import ClientLayout from "@/components/ClientLayout";
import QueryProvider from "@/components/providers/query-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}