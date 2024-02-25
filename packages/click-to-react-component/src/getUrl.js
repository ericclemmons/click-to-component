const editorsPreset = {
  vscode: ({ path, line, column }) => `vscode://file/${path}:${line}:${column}`,
  'vscode-insider': ({ path, line, column }) => `vscode-insider://file/${path}:${line}:${column}`,
  webstorm: ({ path, line }) => `webstorm://open?file=${path}&line=${line}`
}

/**
 * @param {Object} param
 * @param {string} param.editor
 * @param {string} param.path
 * @param {string} param.line
 * @param {string} param.column
 * @param {string} param.pathToSource
 */
export function getUrl({ editor, path ,line ,column,pathToSource }) {
  const urlFactory = editorsPreset[editor] || editorsPreset["vscode"]
  // support for the old method pathToSource
  if (pathToSource){
    const params = pathToSource.split(":")
    const trimmedPath = params[0].startsWith("/") ? params[0].slice(1) : params[0]
    return urlFactory({path:trimmedPath, line:params[1], column:params[2]})
  }

  const trimmedPath = path.startsWith("/") ? path.slice(1) : path
  return urlFactory({path:trimmedPath, line ,column})
}
