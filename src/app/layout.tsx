import '../app/globals.css';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/Providers/ThemeProvider';

export const metadata = {
  title: "Built In Public",
  description:
    "Join our supportive community where developers collaborate, share progress, and grow together",
  keywords: ["relevant", "keywords", "for", "your", "project"],
  authors: [{ name: "Built In Public" }],
  openGraph: {
    title: "Built In Public",
    description:
      "Join our supportive community where developers collaborate, share progress, and grow together",
    url: "https://www.builtinpublic.tech/",
    siteName: "Built In Public",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Built In Public",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Built In Public",
    description:
      "Join our supportive community where developers collaborate, share progress, and grow together",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
