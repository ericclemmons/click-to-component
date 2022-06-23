import type { PlasmoContentScript } from "plasmo"

import { useToggled } from "~useToggled"

export const config: PlasmoContentScript = {
  matches: ["http://localhost:*/*"]
}

export default function () {
  const [toggled] = useToggled()

  return (
    <div>
      <h1>Toggled: {String(toggled)}</h1>
    </div>
  )
}
