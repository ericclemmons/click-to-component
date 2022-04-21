import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ClickToComponent } from 'click-to-react-component'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClickToComponent editor="vscode-insiders" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
