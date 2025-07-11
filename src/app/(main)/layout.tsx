import "../../app/globals.css";
import { ThemeProvider } from "@/components/providers/themes-provider";
import QueryProvider from "@/components/providers/query-provider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
