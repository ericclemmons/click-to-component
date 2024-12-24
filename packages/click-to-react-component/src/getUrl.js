/**
 * @param {Object} param
 * @param {string} param.editor
 * @param {string} param.pathToSource
 * @returns {[string, boolean]} bool isURLScheme
 */
export function getUrl({ editor, pathToSource }) {
  if (JB_EDITORS.includes(editor)) {
    // @see https://github.com/JetBrains/intellij-community/blob/a77365debaadcf00b888a977d89512f3f0f3cf9e/platform/built-in-server/src/org/jetbrains/ide/OpenFileHttpService.kt#L52-L59
    return [`http://localhost:63342/api/file/${pathToSource}`, false]
  }
  // Fix https://github.com/microsoft/vscode/issues/197319
  if (pathToSource[0] === '/') {
    return [`${editor}://file${pathToSource}`, true]
  }

  return [`${editor}://file/${pathToSource}`, true]
}

export const JB_EDITORS = ['idea', 'appcode', 'clion', 'pycharm', 'phpstorm',
  'rubymine', 'webstorm', 'rider', 'goland', 'rustrover']
