export { ClickToComponent } from './ClickToComponent'

const JB_EDITORS = ['idea', 'appcode', 'clion', 'pycharm', 'phpstorm',
  'rubymine', 'webstorm', 'rider', 'goland', 'rustrover'] as const

export type Editor = 'vscode' | 'vscode-insiders' | 'cursor' | typeof JB_EDITORS[number] | string

export type PathModifier = (path: string) => string

export type ClickToComponentProps = {
  editor?: Editor
  pathModifier?: PathModifier
}

export type Coords = [MouseEvent['pageX'], MouseEvent['pageY']]

export type Target = HTMLElement

export type ContextMenuProps = {
  onClose?: () => void
  pathModifier?: PathModifier
}
