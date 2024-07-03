import type { AppProps } from 'next/app';
import { Space_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';

import '@/styles/globals.css'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], style: ["italic", "normal"] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <main className={spaceMono.className}>
        <Component {...pageProps} />
      </main>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
