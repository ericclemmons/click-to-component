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
  } = source;

  // some transpilers store fileName as a relative path in that case user should provide the project absolute path manually.
  const projectRoot = window.__click_to_react_component_project_path || '';
  const filePath = `${projectRoot.replace(/\/$/, '')}/${fileName}`;

  return `${filePath}:${lineNumber}:${columnNumber}`;
}
