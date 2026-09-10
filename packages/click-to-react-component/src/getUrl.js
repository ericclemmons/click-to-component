/**
 * @param {Object} param
 * @param {string} param.editor
 * @param {string} param.pathToSource
 */
export function getUrl({ editor, pathToSource }) {
  // For IntelliJ IDEA and WebStorm, use different protocol
  const intelliJEditors = ['idea', 'webstorm']
  const isIntelliJ = intelliJEditors.includes(editor)
  // https://youtrack.jetbrains.com/articles/SUPPORT-A-2159/How-to-open-a-source-file-with-line-and-column-specified-from-an-URL
  const protocol = isIntelliJ ? `${editor}://open?file` : `${editor}://file`

  // Fix https://github.com/microsoft/vscode/issues/197319
  if (pathToSource[0] === '/') {
    return `${protocol}${pathToSource}`
  }

  return `${protocol}/${pathToSource}`
}
