import '../../app/globals.css';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import QueryProvider from '@/components/Providers/QueryProvider';

// This layout doesn't use a <html> or <body> tag because it's nested
// inside the root layout which already includes those tags.
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
