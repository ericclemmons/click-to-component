# Click to Component

<kbd>Option+Click</kbd> a Component in the browser to **instantly** goto the source in your editor.

## Features

- <kbd>Option+Click</kbd> opens the immediate Component's source
- <kbd>Option+Right-click</kbd> opens a context menu with the parent Components' props, filename, column, and line number
- Works with frameworks like [Next.js](https://nextjs.org/),
  [Create React App](https://create-react-app.dev/),
  & [Remix](https://remix.run/) that uses [@babel/plugin-transform-react-jsx-source](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source)
- Supports `vscode` & `vscode-insiders`' [URL handling](https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls)
- Automatically **eliminated** from `production` builds
- Keyboard navigation in context menu (e.g. <kbd>←</kbd>, <kbd>→</kbd>, <kbd>⏎</kbd>)

## Installation

<details>
<summary>npm</summary>

```shell
npm install click-to-react-component
```

</details>

<details>
<summary>pnpm</summary>

```shell
pnpm add click-to-react-component
```

</details>

<details>
<summary>yarn</summary>

```shell
yarn add click-to-react-component
```

</details>

Even though `click-to-react-component` is added to `dependencies`, [tree-shaking](https://esbuild.github.io/api/#tree-shaking) will remove `click-to-react-component` from `production` builds.

## Usage

<details>
<summary>Create React App</summary>

[/src/index.js](https://github.com/ericclemmons/click-to-component/blob/main/apps/cra/src/index.js#L11)

```diff
+import { ClickToComponent } from 'click-to-react-component';
 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import './index.css';
@@ -8,7 +7,6 @@ import reportWebVitals from './reportWebVitals';
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
+    <ClickToComponent editor="vscode-insiders" />
     <App />
   </React.StrictMode>
 );
```

</details>

<details>
<summary>Next.js</summary>

[pages/\_app.tsx](https://github.com/ericclemmons/click-to-component/blob/main/apps/next/pages/_app.tsx#L8)

```diff
+import { ClickToComponent } from 'click-to-react-component'
 import type { AppProps } from 'next/app'
 import '../styles/globals.css'

 function MyApp({ Component, pageProps }: AppProps) {
   return (
     <>
+      <ClickToComponent editor="vscode-insiders" />
       <Component {...pageProps} />
     </>
   )
```

</details>

## Run Locally

Clone the project

```shell
gh repo clone ericclemmons/click-to-component
```

Go to the project directory

```shell
cd click-to-component
```

Install dependencies

```shell
pnpm install
```

Run one of the examples:

<details>
<summary>Create React App</summary>

```shell
cd apps/cra
pnpm start
```

</details>

<details>
<summary>Next.js</summary>

```shell
cd apps/next
pnpm dev
```

</details>
