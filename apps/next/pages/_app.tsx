import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useClickToComponent } from 'click-to-component'

function MyApp({ Component, pageProps }: AppProps) {
  useClickToComponent()

  return <Component {...pageProps} />
}

export default MyApp
