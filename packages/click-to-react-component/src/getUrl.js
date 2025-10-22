/**
 * @param {Object} param
 * @param {string} param.editor
 * @param {string} param.pathToSource
 */
export function getUrl({ editor, pathToSource }) {
  // Handle remote vscode instance
  if (pathToSource.startsWith('vscode-remote')) {
    // We assume here the user has overwritten pathToSource, for WSL and docker, and included the correct path
    return `${editor}://${pathToSource}`
  }
  // Fix https://github.com/microsoft/vscode/issues/197319
  if (pathToSource[0] === '/') {
    return `${editor}://file${pathToSource}`
  }

  return `${editor}://file/${pathToSource}`
}