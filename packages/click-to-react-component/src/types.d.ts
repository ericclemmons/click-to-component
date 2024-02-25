export { ClickToComponent } from './ClickToComponent'

export type Editor = 'vscode' | 'vscode-insiders' | 'webstorm'

export type PathModifier = (path: string) => string;

export type ClickToComponentProps = {
  editor?: Editor;
  getEditorUrl?: (params:{path:string , line:number , column:number}) => string
  pathModifier?: PathModifier;
}

export type Coords = [MouseEvent['pageX'], MouseEvent['pageY']]

export type Target = HTMLElement

export type ContextMenuProps = {
  onClose?: () => void;
  pathModifier?: PathModifier;
}
