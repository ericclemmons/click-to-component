/**
 * @typedef {import('react-reconciler').Fiber} Fiber
 * @param {Fiber} instance
 */
export function getDisplayNameForInstance(instance) {
  const { elementType, tag } = instance

  switch (tag) {
    case 0: // FunctionComponent
    case 1: // ClassComponent
      return (
        elementType.displayName || elementType.name || 'Anonymous Component'
      )

    case 5: // HostComponent:
      return elementType

    case 6: // HostText:
      return 'String'

    case 7: // Fragment
      return 'React.Fragment'

    case 9: // ContextConsumer
      return 'Context.Consumer'

    case 10: // ContextProvider
      return 'Context.Provider'

    case 11: // ForwardRef
      return 'React.forwardRef'

    case 14: // MemoComponent
    case 15: // MemoComponent or LazyComponent in react>16
      // Attempt to get name from wrapped component
      return (
        elementType.type?.name ||
        Symbol.keyFor?.(elementType.$$typeof) ||
        'React.memo'
      )

    case 16: // LazyComponent in react 16
      return 'React.lazy'

    default:
      console.warn(`Unrecognized React Fiber tag: ${tag}`, instance)
      return 'Unknown Component'
  }
}
