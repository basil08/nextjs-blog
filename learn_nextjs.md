

# Page routing and linking between pages

`pages/index.js` is associated with the / route.
`pages/posts/first-post.js` is associated with the /posts/first-post route.

Create a JS file under the pages directory, and the path to the file becomes the URL path.

`Link` component enables client-side navigation page transition happens using JavaScript.

If you’ve used <a href="…"> instead of <Link href="…"> the browser does a full refresh.

whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background.

Note: If you need to link to an external page outside the Next.js app, just use an <a> tag without `Link`.

Note: If you need to add attributes like, for example, className, add it to the <a> tag, not to the `Link`.

# Assets, metadata and CSS  

Files inside `public` can be referenced from the root of the application similar to pages.

The public directory is also useful for robots.txt, Google Site Verification, and any other static assets.

## metadata  

<Head> is a React Component that is built into Next.js, allows you to modify the <head> of a page.

to add the lang attribute, you can do so by creating a pages/_document.js file.

"styled-jsx" is a “CSS-in-JS” library — it lets you write CSS within a React component, and the CSS styles will be scoped.

Next.js has built-in support for styled-jsx, for CSS and Sass which allows you to import .css and .scss files.

## styling  

CSS Modules automatically generates unique class names. No class name collisons. 

To load global CSS files, create a file called pages/_app.js with the following content:

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
App component is the top-level component which will be common across all the different pages. 
Can use this App component to keep state when navigating between pages, for example.

Can add global CSS files by importing them from pages/_app.js. You **cannot** import global CSS anywhere else.

can place the global CSS file anywhere and use any name.

