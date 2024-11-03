# click-to-react-component

## 1.1.2

### Patch Changes

- 32bd930: feat: Fix lots of bugs with getting source

  This works with newer versions of React, too. But, importantly, the algorithm to get the `source` is way more accurate.

## 1.1.1

### Patch Changes

- 06bff87: Fix TypeScript error "Could not find a declaration file for module"

## 1.1.0

### Minor Changes

- 9246a89: Add remix/esbuild support by checking the \_debugOwner.\_debugSource

## 1.0.10

### Patch Changes

- 1bd62f1: Change outline style to accessible colors:

  > <img width="751" alt="Screen Shot 2022-06-11 at 11 51 58 AM" src="https://user-images.githubusercontent.com/15182/173197193-dd831818-1fc9-403f-8f0b-9b5bae55f8db.png">

- c7cccdb: Prevent bundle from being included in prod build
- b2dbad4: Fix "Cannot find module './src/ClickToComponent' or its corresponding type declarations."

## 1.0.9

### Patch Changes

- 3c81f0b: Fixes `data-click-to-component` attribute staying on body indefinitely

## 1.0.8

### Patch Changes

- 7661be0: Set floating-ui to max z-index

## 1.0.7

### Patch Changes

- 3ae6fcf: Show menu only on Option+Right-click

## 1.0.6

### Patch Changes

- 66606f2: - Fix file references
  - Fix types references
  - Add `lint` script to `click-to-react-component`

## 1.0.5

### Patch Changes

- 5cad12c: Update README with demos
- 10fc042: Return `null` instead of `undefined` to fix React warning
- 361b076: Only publish `src` files

## 1.0.4

### Patch Changes

- e31bda9: Add package.json#exports

## 1.0.3

### Patch Changes

- 6f4d7a3: Move README to packages/click-to-react-component so it gets published on NPM

## 1.0.2

### Patch Changes

- 65faad29a82e5a772423bb83cd431de67705377e: Use "type": "module"
- 10125adb511e3164ae7cdf9642864d5bf51503fc: Default `editor` to `vscode`

## 1.0.1

### Patch Changes

- 8849558: Remove ClickToComponent from production builds
