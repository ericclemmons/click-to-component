import { getReactInstanceForElement } from './getReactInstanceForElement.js'
import { getSourceForInstance } from './getSourceForInstance.js'

/**
 * @typedef {import('react-reconciler').Fiber} Fiber
 */

function getFallbackSourceForElement(
  /**
   * @type {HTMLElement}
   */
  element
) {
  const parentElement = element.parentElement
  if (element.tagName === 'HTML' || parentElement === null) {
    return
  }

  const instance = getReactInstanceForElement(parentElement)
  const source = getSourceForInstance(instance)

  if (source) {
    return source
  } else {
    return getFallbackSourceForElement(parentElement)
  }
}

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

  const fallbackSource = getFallbackSourceForElement(element)
  return fallbackSource
}
