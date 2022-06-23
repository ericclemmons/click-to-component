import { useEffect, useRef } from "react"

import { useToggled } from "~useToggled"

export default function Popup() {
  const [toggled, toggle] = useToggled()

  useEffect(() => {
    // There's a race-condition with Plasmo that will revert to the previous state if set too soon
    setTimeout(() => {
      toggle()
      window.close()
    }, 300)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        whiteSpace: "nowrap"
      }}>
      👇 Hover & click any of the highlighted React components on your page
      <button onClick={toggle}>{String(toggled)}</button>
    </div>
  )
}
