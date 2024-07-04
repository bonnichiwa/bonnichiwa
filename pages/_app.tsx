import type { AppProps } from 'next/app';
import { Space_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';

import '@/styles/globals.css'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ErrorBoundary } from "react-error-boundary";
import styled from 'styled-components';

gsap.registerPlugin(useGSAP);

export const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], style: ["italic", "normal"] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary fallback={<Error>Something went wrong. Please try refreshing the page.</Error>}>
      <main className={spaceMono.className}>
        <Component {...pageProps} />
      </main>
    </ErrorBoundary>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});

const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
