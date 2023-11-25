/**
 * @typedef {import('react-reconciler').Fiber} Fiber
 * @typedef {import('react-reconciler').Source} Source
 */

/**
 * @param {Fiber} instance
 */
export function getSourceForInstance({ _debugSource, _debugOwner }) {
  // source is sometimes stored on _debugOwner
  const source = _debugSource || (_debugOwner && _debugOwner._debugSource)

  if (!source) return

  const {
    // It _does_ exist!
    // @ts-ignore Property 'columnNumber' does not exist on type 'Source'.ts(2339)
    columnNumber = 1,
    fileName,
    lineNumber = 1,
  } = source

  return { columnNumber, fileName, lineNumber }
}
