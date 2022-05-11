export { ClickToComponent } from './src/ClickToComponent'

export type Editor = 'vscode' | 'vscode-insiders'

export type ClickToComponentProps = {
  editor?: Editor
}

export type Coords = [MouseEvent['pageX'], MouseEvent['pageY']]

export type Target = HTMLElement

export type ContextMenuProps = {
  onClose?: () => void
}
