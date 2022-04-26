import { ClickToComponent as Component } from './src/ClickToComponent.mjs'

export const ClickToComponent =
  process.env.NODE_ENV === 'development' ? Component : () => null
