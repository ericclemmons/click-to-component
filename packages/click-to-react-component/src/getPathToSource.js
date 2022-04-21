/**
 * @typedef {import('react-reconciler').Source} Source
 */

/**
 * @param {Source} source
 */
export function getPathToSource(source) {
  const {
    // It _does_ exist!
    // @ts-ignore Property 'columnNumber' does not exist on type 'Source'.ts(2339)
    columnNumber = 1,
    fileName,
    lineNumber = 1,
  } = source

  return `${fileName}:${lineNumber}:${columnNumber}`
}
