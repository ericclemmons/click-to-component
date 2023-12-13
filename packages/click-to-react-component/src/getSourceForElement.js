import { getReactInstanceForElement } from './getReactInstanceForElement'
import { getSourceForInstance } from './getSourceForInstance'

/**
 * @typedef {import('react-reconciler').Fiber} Fiber
 */

export function getSourceForElement(element) {
  const instance = getReactInstanceForElement(element)
  const source = getSourceForInstance(instance)

  if (source) return source

  // console.warn("Couldn't find a React instance for the element", element)
  // console.info("Let us try to find a React instance ancestor which has a source")

  const fallbackSource = getFirstParentElementWithSource(element)
  return fallbackSource
}

function getFirstParentElementWithSource(element) {
  const parentElement = element.parentElement
  if (parentElement === null) throw new Error('No parent found')

  const instance = getReactInstanceForElement(parentElement)
  const source = getSourceForInstance(instance)

  if (source) return source
  else return getFirstParentElementWithSource(element)
}
