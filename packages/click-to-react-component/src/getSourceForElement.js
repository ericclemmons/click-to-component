import { getReactInstanceForElement } from './getReactInstanceForElement.js'
import { getSourceForInstance } from './getSourceForInstance.js'

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
