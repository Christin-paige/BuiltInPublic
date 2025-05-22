import "../app/globals.css";
import Footer from "../components/footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ThemeProvider } from "../components/themes-provider";
import ClientLayout from "@/components/ClientLayout";
import QueryProvider from "@/components/query-provider";


export default async function RootLayout({ children } : { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: session } = await supabase.auth.getSession();

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
        <Footer />

      
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
