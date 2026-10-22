import { html } from 'htm/react'
import { createRoot } from 'react-dom/client'

import { ClickToComponent } from '../src/index.js'

/**
 * @type {Window & {
 *   __CTC__?: { unmount: () => void },
 *   __CTC_OPTIONS__?: import('../src/types').ClickToComponentProps
 * }}
 */
const browser = window

browser.__CTC__?.unmount()

const host = document.createElement('div')
host.id = 'click-to-component-browser'
host.setAttribute('data-click-to-component-ignore', '')

const mountPoint = document.createElement('div')
const portal = document.createElement('div')
portal.id = 'click-to-component-browser-portal'
const panel = document.createElement('div')
const shadow = panel.attachShadow({ mode: 'open' })
shadow.innerHTML = `
  <style>
    :host { position: fixed; right: 16px; bottom: 16px; z-index: 2147483647; }
    section { box-sizing: border-box; width: 340px; max-width: calc(100vw - 32px);
      max-height: calc(100vh - 16px); overflow: auto;
      padding: 12px; border: 1px solid #64748b; border-radius: 8px;
      background: #111827; color: #f9fafb; font: 13px/1.5 system-ui, sans-serif;
      box-shadow: 0 4px 20px #0005; }
    strong { display: block; margin-bottom: 8px; cursor: grab;
      user-select: none; touch-action: none; }
    p { margin: 0 0 10px; overflow-wrap: anywhere; }
    button { font: inherit; cursor: pointer; padding: 4px 10px;
      border: 1px solid #64748b; border-radius: 4px; margin-right: 8px;
      background: #1e293b; color: white; }
    button:hover { background: #334155; }
  </style>
  <section aria-label="Source inspector">
    <strong title="Drag to move">Source inspector · Drag to move</strong>
    <p role="status"></p>
    <button type="button">Pause selection</button>
    <button type="button">Close</button>
  </section>
`
const status = shadow.querySelector('p')
const handle = shadow.querySelector('strong')
const [toggle, close] = Array.from(shadow.querySelectorAll('button'))
host.append(mountPoint, portal, panel)
document.body.appendChild(host)

const root = createRoot(mountPoint)
let active = true
let drag

function positionPanel(left, top) {
  const { width, height } = panel.getBoundingClientRect()
  Object.assign(panel.style, {
    left: `${Math.max(8, Math.min(left, window.innerWidth - width - 8))}px`,
    top: `${Math.max(8, Math.min(top, window.innerHeight - height - 8))}px`,
    right: 'auto',
    bottom: 'auto',
  })
}

function keepPanelInView() {
  if (!panel.isConnected || !panel.style.left) return
  const { left, top } = panel.getBoundingClientRect()
  positionPanel(left, top)
}

handle.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || drag) return
  event.preventDefault()
  event.stopPropagation()
  const { left, top } = panel.getBoundingClientRect()
  drag = { id: event.pointerId, x: event.clientX - left, y: event.clientY - top }
  handle.setPointerCapture(event.pointerId)
  handle.style.cursor = 'grabbing'
})
function movePanel(event) {
  if (drag?.id !== event.pointerId) return
  if (!(event.buttons & 1)) {
    endDrag(event)
    return
  }
  positionPanel(event.clientX - drag.x, event.clientY - drag.y)
}
function endDrag(event) {
  if (drag?.id !== event.pointerId) return
  drag = undefined
  handle.style.cursor = ''
  if (handle.hasPointerCapture(event.pointerId))
    handle.releasePointerCapture(event.pointerId)
}
window.addEventListener('pointermove', movePanel, { capture: true })
window.addEventListener('pointerup', endDrag, { capture: true })
window.addEventListener('pointercancel', endDrag, { capture: true })
handle.addEventListener('lostpointercapture', endDrag)
window.addEventListener('resize', keepPanelInView)

function setStatus(message) {
  status.textContent = message
  keepPanelInView()
}

function render() {
  root.render(html`<${ClickToComponent}
    ...${browser.__CTC_OPTIONS__}
    active=${active}
    portalId=${portal.id}
    onStatus=${setStatus}
  />`)
  toggle.textContent = active ? 'Pause selection' : 'Resume selection'
  toggle.setAttribute('aria-pressed', String(active))
  setStatus(
    active
      ? 'Inspector loaded. Move to highlight, click to open source, or right-click to choose a component.'
      : 'Selection paused. Use the page normally or click Resume selection to continue.'
  )
}

toggle.addEventListener('click', () => {
  active = !active
  render()
})
close.addEventListener('click', unmount)

function unmount() {
  if (browser.__CTC__?.unmount !== unmount) return

  root.unmount()
  window.removeEventListener('resize', keepPanelInView)
  window.removeEventListener('pointermove', movePanel, { capture: true })
  window.removeEventListener('pointerup', endDrag, { capture: true })
  window.removeEventListener('pointercancel', endDrag, { capture: true })
  host.remove()
  document.body.removeAttribute('data-click-to-component')
  document
    .querySelectorAll('[data-click-to-component-target]')
    .forEach((element) => {
      element.removeAttribute('data-click-to-component-target')
    })
  delete browser.__CTC__
}

browser.__CTC__ = { unmount }
render()
