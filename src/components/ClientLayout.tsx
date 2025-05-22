'use client';

import { usePathname } from 'next/navigation';
import NavBar from "@/components/navbar";


export default function ClientLayout({children}: {children: React.ReactNode}) {
    // This layout is used to wrap the entire application
    const pathname = usePathname();
    const hideNavBar = ['/auth'];

    const shouldShowNavBar = !hideNavBar.includes(pathname);

    return (
        <>
          {shouldShowNavBar && <NavBar />}
          {children}
        
          </>
      );
    }
    