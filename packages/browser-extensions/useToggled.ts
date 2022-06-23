import { useCallback, useEffect } from "react"

import { useStorage } from "@plasmohq/storage"

export function useToggled() {
  const [toggled, setToggled] = useStorage("enabled", (storedValue) => {
    return false
  })

  const toggle = useCallback(() => {
    if (toggled) {
      setToggled(false)
    } else {
      setToggled(true)
    }
  }, [toggled, setToggled])

  return [toggled, toggle]
}
