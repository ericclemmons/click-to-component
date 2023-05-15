export { ClickToComponent } from './ClickToComponent'

export type Editor = 'vscode' | 'vscode-insiders'

export type ClickToComponentProps = {
  editor?: Editor,
  pathModifier?: (path: string) => string;
}

export type Coords = [MouseEvent['pageX'], MouseEvent['pageY']]

export type Target = HTMLElement

export type ContextMenuProps = {
  onClose?: () => void
}

declare global {
  interface Window {
    __click_to_react_component_project_path: string;
  }
}