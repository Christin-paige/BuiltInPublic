import '../app/globals.css';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/Providers/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import and setup fonts
import { Audiowide, Lato, Raleway, Roboto } from 'next/font/google';

const audioWide = Audiowide({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-audioWide',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-raleway',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
  display: 'swap',
});

export const metadata = {
  title: 'Built In Public',
  description:
    'Join our supportive community where developers collaborate, share progress, and grow together',
  keywords: ['relevant', 'keywords', 'for', 'your', 'project'],
  authors: [{ name: 'Built In Public' }],
  openGraph: {
    title: 'Built In Public',
    description:
      'Join our supportive community where developers collaborate, share progress, and grow together',
    url: 'https://www.builtinpublic.tech/',
    siteName: 'Built In Public',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Built In Public',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Built In Public',
    description:
      'Join our supportive community where developers collaborate, share progress, and grow together',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${audioWide.variable} ${raleway.variable} ${lato.variable} ${roboto.variable}`}
    >
      <body className='min-h-screen flex flex-col bg-zinc-950'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <main className='flex-1'>{children}</main>
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme='dark'
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
