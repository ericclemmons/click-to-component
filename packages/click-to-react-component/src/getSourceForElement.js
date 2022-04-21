import { getReactInstanceForElement } from './getReactInstanceForElement'
import { getSourceForInstance } from './getSourceForInstance'

/**
 * @typedef {import('react-reconciler').Fiber} Fiber
 */

export function getSourceForElement(
  /**
   * @type {HTMLElement}
   */
  element
) {
  const instance = getReactInstanceForElement(element)
  const source = getSourceForInstance(instance)

  if (source) return source

  console.warn("Couldn't find a React instance for the element", element)
}
