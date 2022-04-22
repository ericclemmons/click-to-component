/**
 * @typedef {import('react').DialogHTMLAttributes} DialogHTMLAttributes
 * @typedef {import('react').HTMLAttributes} HTMLAttributes
 * @typedef {import('react').MouseEvent<HTMLElement, MouseEvent>} ReactMouseEvent}
 */

import { html } from 'htm/react'
import * as React from 'react'
import { usePopper } from 'react-popper'

import { getDisplayNameForInstance } from './getDisplayNameFromReactInstance'
import { getPathToSource } from './getPathToSource'
import { getReactInstancesForElement } from './getReactInstancesForElement'
import { getSourceForInstance } from './getSourceForInstance'
import { getPropsForInstance } from './getPropsForInstance'

export function ContextMenu({ coords, onClose, target }) {
  const [contextMenuElement, setContextMenuElement] = React.useState(
    /** @type {HTMLElement | null} */
    (null)
  )

  const [arrowElement, setArrowElement] = React.useState(
    /** @type {HTMLElement | null} */
    (null)
  )

  const [coordsElement, setCoordsElement] = React.useState(
    /** @type {HTMLElement|null} */
    (null)
  )

  const { styles, attributes } = usePopper(coordsElement, contextMenuElement, {
    modifiers: [
      {
        name: 'arrow',
        options: { element: arrowElement },
      },
      {
        name: 'offset',
        options: { offset: [0, 8] },
      },
    ],
  })

  React.useEffect(
    // Careful – this can be buggy in strict mode: https://github.com/facebook/react/issues/24399#issuecomment-1104191934
    function toggleContextMenu() {
      if (contextMenuElement) {
        // @ts-ignore Property 'showModal' does not exist on type 'HTMLElement'.ts(2339)
        contextMenuElement.showModal()

        // @ts-ignore Property 'close' does not exist on type 'HTMLElement'.ts(2339)
        return () => contextMenuElement.close()
      }
    },
    [contextMenuElement]
  )

  // Workaround for this bullshit – https://github.com/microsoft/typescript-styled-plugin/issues/100
  const popperProps = /** @type {DialogHTMLAttributes} */ ({
    // Prevent focusing of elements outside of <dialog>
    inert: '',
    // When using `.showModal()`, the backdrop `event.target` is `<dialog>`
    onClick(
      /**
       * @type {ReactMouseEvent}
       */
      event
    ) {
      if (
        event.target instanceof HTMLElement &&
        event.target.nodeName === 'DIALOG'
      ) {
        // @ts-ignore Property 'close' does not exist on type 'HTMLElement'.ts(2339)
        contextMenuElement.close()
      }
    },
    onClose(event) {
      //@ts-ignore Property 'returnValue' does not exist on type 'HTMLElement'.ts(2339)
      onClose?.(event, contextMenuElement.returnValue)
    },
    ref: setContextMenuElement,
    style: styles.popper,
    ...attributes.popper,
  })

  const arrowProps = /** @type {HTMLAttributes} */ ({
    ref: setArrowElement,
    style: styles.arrow,
  })

  const instances = getReactInstancesForElement(target).filter((instance) =>
    getSourceForInstance(instance)
  )

  return html`
    <style key="click-to-component-dialog-style">
      #click-to-component-dialog::backdrop {
        background: transparent;
        transition: backdrop-filter 0.5s ease;
      }

      #click-to-component-dialog,
      #click-to-component-dialog * {
        box-sizing: border-box !important;
      }

      #click-to-component-dialog {
        background: white;
        color: black;
        font-weight: bold;
        overflow: visible;
        padding: 0px 5px;
        font-size: 13px;
        border-radius: 6px;
        border: none;

        --shadow-color: 0deg 0% 0%;
        --shadow-elevation-low: 0px -1px 0.8px hsl(var(--shadow-color) / 0.1),
          0px -1.2px 0.9px -2.5px hsl(var(--shadow-color) / 0.07),
          0px -3px 2.3px -5px hsl(var(--shadow-color) / 0.03);

        --shadow-elevation-medium: 0px 1px 0.8px hsl(var(--shadow-color) / 0.11),
          0px 1.5px 1.1px -1.7px hsl(var(--shadow-color) / 0.08),
          0px 5.1px 3.8px -3.3px hsl(var(--shadow-color) / 0.05),
          0px 15px 11.3px -5px hsl(var(--shadow-color) / 0.03);
        --shadow-elevation-high: 0px 1px 0.8px hsl(var(--shadow-color) / 0.1),
          0px 1.1px 0.8px -0.7px hsl(var(--shadow-color) / 0.09),
          0px 2.1px 1.6px -1.4px hsl(var(--shadow-color) / 0.07),
          0px 4.9px 3.7px -2.1px hsl(var(--shadow-color) / 0.06),
          0px 10.1px 7.6px -2.9px hsl(var(--shadow-color) / 0.05),
          0px 18.9px 14.2px -3.6px hsl(var(--shadow-color) / 0.04),
          0px 31.9px 23.9px -4.3px hsl(var(--shadow-color) / 0.02),
          0px 50px 37.5px -5px hsl(var(--shadow-color) / 0.01);

        box-shadow: var(--shadow-elevation-high);
        filter: drop-shadow(0px 0px 0.5px rgba(0 0 0 / 50%));
      }

      #click-to-component-dialog ol {
        list-style: none;
        margin: 0;
        padding: 5px 0;
        display: flex;
        flex-direction: column;
      }

      #click-to-component-dialog button {
        all: unset;
        display: flex;
        flex-direction: column;
        width: 100%;
        background: white;
        padding: 5px;
        border-radius: 4px;
        font-size: 13px;
      }

      #click-to-component-dialog button:hover {
        cursor: pointer;
        filter: invert(1) hue-rotate(180deg) contrast(0.9);
      }

      #click-to-component-dialog button > * + * {
        margin-top: 3px;
      }

      #click-to-component-dialog button code {
        color: rgb(87, 70, 175);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }

      #click-to-component-dialog button code var {
        background: rgba(0 0 0 / 5%);
        cursor: help;
        border-radius: 3px;
        padding: 3px 6px;
        font-style: normal;
        font-weight: normal;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
      }

      #click-to-component-dialog button cite {
        font-weight: normal;
        font-style: normal;
        font-size: 11px;
        opacity: 0.5;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }

      #click-to-component-dialog button cite data::after {
        content: attr(value);
        float: right;
        padding-left: 15px;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
      }

      #click-to-component-dialog-arrow,
      #click-to-component-dialog-arrow::before {
        position: absolute;
        width: 8px;
        height: 8px;
        background: inherit;
      }

      #click-to-component-dialog-arrow {
        visibility: hidden;
      }

      #click-to-component-dialog-arrow::before {
        visibility: visible;
        content: '';
        transform: rotate(45deg);
      }

      #click-to-component-dialog[data-popper-placement^='top']
        > #click-to-component-dialog-arrow {
        bottom: -4px;
      }

      #click-to-component-dialog[data-popper-placement^='bottom']
        > #click-to-component-dialog-arrow {
        top: -4px;
      }

      #click-to-component-dialog[data-popper-placement^='left']
        > #click-to-component-dialog-arrow {
        right: -4px;
      }

      #click-to-component-dialog[data-popper-placement^='right']
        > #click-to-component-dialog-arrow {
        left: -4px;
      }
    </style>

    <canvas
      key="click-to-component-canvas"
      ref=${setCoordsElement}
      style=${{
        position: 'absolute',
        left: coords[0],
        top: coords[1],
        width: 1,
        height: 1,
      }}
    />

    <dialog
      id="click-to-component-dialog"
      key="click-to-component-dialog"
      ...${popperProps}
    >
      <form method="dialog">
        <ol>
          ${instances.map((instance, i) => {
            const name = getDisplayNameForInstance(instance)
            const source = getSourceForInstance(instance)
            const path = getPathToSource(source)
            const props = getPropsForInstance(instance)

            return html`
              <li key=${i}>
                <button value=${path}>
                  <code>
                    ${'<'}${name}
                    ${Object.entries(props).map(
                      ([prop, value]) => html`
                        ${' '}
                        <var key=${prop} title="${value}">${prop}</var>
                      `
                    )}
                    ${'>'}
                  </code>
                  <cite>
                    <data value="${source.lineNumber}:${source.columnNumber}">
                      ${source.fileName.replace(/.*(src|pages)/, '$1')}
                    </data>
                  </cite>
                </button>
              </li>
            `
          })}
        </ol>
      </form>
      <div id="click-to-component-dialog-arrow" ...${arrowProps} />
    </dialog>
  `
}
