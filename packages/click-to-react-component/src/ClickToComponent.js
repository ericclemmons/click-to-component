/**
 * @typedef {import('./types').ClickToComponentProps} Props
 * @typedef {import('./types').Coords} Coords
 */

import { FloatingPortal } from '@floating-ui/react-dom-interactions'
import { html } from 'htm/react'
import * as React from 'react'

import { ContextMenu } from './ContextMenu.js'
import { getPathToSource } from './getPathToSource.js'
import { getReactInstancesForElement } from './getReactInstancesForElement.js'
import { getSourceForInstance } from './getSourceForInstance.js'
import { getUrl } from './getUrl.js'

export const State = /** @type {const} */ ({
  IDLE: 'IDLE',
  HOVER: 'HOVER',
  SELECT: 'SELECT',
})

/**
 * @param {Props} props
 */
export function ClickToComponent({
  editor = 'vscode',
  pathModifier,
  active = false,
  portalId,
  onStatus,
}) {
  const [state, setState] = React.useState(
    /** @type {State[keyof State]} */
    (active ? State.HOVER : State.IDLE)
  )

  const [target, setTarget] = React.useState(
    /** @type {HTMLElement | null} */
    (null)
  )

  const onClick = React.useCallback(
    function handleClick(
      /**
       * @type {MouseEvent}
       */
      event
    ) {
      if (
        !(event.target instanceof HTMLElement) ||
        event.target.closest('[data-click-to-component-ignore]')
      ) {
        return
      }

      if (state === State.HOVER || active || event.altKey) {
        event.preventDefault()
        event.stopPropagation()
        const instance = getReactInstancesForElement(event.target).find(
          (instance) => getSourceForInstance(instance)
        )

        if (!instance) {
          onStatus?.(
            'No source information found. Use a React development build with source metadata.'
          )
          return console.warn(
            'Could not find React instance for element',
            event.target
          )
        }

        const source = getSourceForInstance(instance)

        if (!source) {
          onStatus?.('Source information is unavailable for this component.')
          return console.warn(
            'Could not find source for React instance',
            instance
          )
        }
        const path = getPathToSource(source, pathModifier)
        const url = getUrl({
          editor,
          pathToSource: path,
        })

        onStatus?.(`Opening source: ${path}`)
        window.location.assign(url)

        setState(active ? State.HOVER : State.IDLE)
      }
    },
    [active, editor, onStatus, pathModifier, state]
  )

  const onClose = React.useCallback(
    function handleClose(returnValue) {
      if (returnValue) {
        const url = getUrl({
          editor,
          pathToSource: returnValue,
        })

        onStatus?.(`Opening source: ${returnValue}`)
        window.location.assign(url)
      }

      setState(active ? State.HOVER : State.IDLE)
    },
    [active, editor, onStatus]
  )

  const onContextMenu = React.useCallback(
    function handleContextMenu(
      /**
       * @type {MouseEvent}
       */
      event
    ) {
      const { target } = event

      if (
        target instanceof HTMLElement &&
        !target.closest('[data-click-to-component-ignore]') &&
        (state === State.HOVER || active || event.altKey)
      ) {
        event.preventDefault()

        setState(State.SELECT)
        setTarget(target)
      }
    },
    [active, state]
  )

  const onKeyDown = React.useCallback(
    function handleKeyDown(
      /**
       * @type {KeyboardEvent}
       */
      event
    ) {
      switch (state) {
        case State.IDLE:
          if (event.altKey) setState(State.HOVER)
          break

        default:
      }
    },
    [state]
  )

  const onKeyUp = React.useCallback(
    function handleKeyUp(
      /**
       * @type {KeyboardEvent}
       */
      event
    ) {
      switch (state) {
        case State.HOVER:
          if (!active && !event.altKey) setState(State.IDLE)
          break

        default:
      }
    },
    [active, state]
  )

  const onMouseMove = React.useCallback(
    function handleMouseMove(
      /** @type {MouseEvent} */
      event
    ) {
      if (!(event.target instanceof HTMLElement)) {
        return
      }
      if (event.target.closest('[data-click-to-component-ignore]')) return

      switch (state) {
        case State.IDLE:
        case State.HOVER:
          setTarget(event.target)
          if (active || event.altKey) setState(State.HOVER)
          else if (state === State.HOVER) setState(State.IDLE)
          break

        default:
          break
      }
    },
    [active, state]
  )

  const onBlur = React.useCallback(
    function handleBlur() {
      switch (state) {
        case State.HOVER:
          if (!active) setState(State.IDLE)
          break

        default:
      }
    },
    [active, state]
  )

  React.useEffect(() => {
    setState(active ? State.HOVER : State.IDLE)
  }, [active])

  React.useEffect(
    function toggleIndicator() {
      for (const element of Array.from(
        document.querySelectorAll('[data-click-to-component-target]')
      )) {
        if (element instanceof HTMLElement) {
          delete element.dataset.clickToComponentTarget
        }
      }

      if (state === State.IDLE) {
        delete window.document.body.dataset.clickToComponent
        if (target) {
          delete target.dataset.clickToComponentTarget
        }
        return
      }

      if (target instanceof HTMLElement) {
        window.document.body.dataset.clickToComponent = state
        target.dataset.clickToComponentTarget = state
      }
    },
    [state, target]
  )

  React.useEffect(
    function addEventListenersToWindow() {
      window.addEventListener('click', onClick, { capture: true })
      window.addEventListener('contextmenu', onContextMenu, { capture: true })
      window.addEventListener('keydown', onKeyDown, { capture: true })
      window.addEventListener('keyup', onKeyUp, { capture: true })
      window.addEventListener('mousemove', onMouseMove, { capture: true })
      window.addEventListener('blur', onBlur)

      return function removeEventListenersFromWindow() {
        window.removeEventListener('click', onClick, { capture: true })
        window.removeEventListener('contextmenu', onContextMenu, {
          capture: true,
        })
        window.removeEventListener('keydown', onKeyDown, { capture: true })
        window.removeEventListener('keyup', onKeyUp, { capture: true })
        window.removeEventListener('mousemove', onMouseMove, { capture: true })
        window.removeEventListener('blur', onBlur)
      }
    },
    [onClick, onContextMenu, onKeyDown, onKeyUp, onMouseMove, onBlur]
  )

  return html`
    <style key="click-to-component-style">
      [data-click-to-component-target] {
        cursor: var(--click-to-component-cursor, context-menu) !important;
        outline: auto 1px;
        outline: var(
          --click-to-component-outline,
          -webkit-focus-ring-color auto 1px
        ) !important;
      }
    </style>

    <${FloatingPortal} key="click-to-component-portal" id=${portalId}>
      ${html`<${ContextMenu}
        key="click-to-component-contextmenu"
        onClose=${onClose}
        pathModifier=${pathModifier}
        active=${active}
      />`}
    </${FloatingPortal}
  `
}
