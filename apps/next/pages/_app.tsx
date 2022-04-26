import { ClickToComponent } from 'click-to-react-component'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClickToComponent editor="vscode-insiders" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
