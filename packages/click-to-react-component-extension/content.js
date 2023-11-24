// import { ClickToComponent } from './node_modules/click-to-react-component'

// console.log({ ClickToComponent })

;(async () => {
  const src = chrome.runtime.getURL(
    'node_modules/click-to-react-component/src/index.js'
  )

  const m = await import(src)

  console.log({ m })
})().catch(console.error)
