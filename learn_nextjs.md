# Page routing and linking between pages

`pages/index.js` is associated with the / route.
`pages/posts/first-post.js` is associated with the /posts/first-post route.

Create a JS file under the pages directory, and the path to the file becomes the URL path.

`Link` component enables client-side navigation page transition happens using JavaScript.

If you’ve used `<a href="…">` instead of `<Link href="…">` the browser does a full refresh.

whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background.

Note: If you need to link to an external page outside the Next.js app, just use an `<a>` tag without `Link`.

Note: If you need to add attributes like, for example, className, add it to the `<a>` tag, not to the `Link`.

# Assets, metadata and CSS  

Files inside `public` can be referenced from the root of the application similar to pages.

The public directory is also useful for robots.txt, Google Site Verification, and any other static assets.

## metadata  

`<Head>` is a React Component that is built into Next.js, allows you to modify the `<head>` of a page.

to add the lang attribute, you can do so by creating a pages/_document.js file.

## styling  

"styled-jsx" is a “CSS-in-JS” library — it lets you write CSS within a React component, and the CSS styles will be scoped.

Next.js has built-in support for styled-jsx, for CSS and Sass which allows you to import .css and .scss files.

CSS Modules automatically generates unique class names. No class name collisons. 

To load global CSS files, create a file called `pages/_app.js` with the following content:

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
App component is the top-level component which will be common across all the different pages. 
Can use this App component to keep state when navigating between pages, for example.

Can add global CSS files by importing them from `pages/_app.js`. You **cannot** import global CSS anywhere else.

can place the global CSS file anywhere and use any name.

## Tips

Use `classnames` library to toggle classes.
```css
.success {
  color: green;
}
.error {
  color: red;
}
```
```jsx
import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
```

Next.js compiles CSS using PostCSS out of the box.

See [official starter app tutorial](https://nextjs.org/learn/basics/assets-metadata-css/styling-tips) for Tailwind CSS and SASS setup.


# Data Fetching

Content may be in filesystem or remote database/ Headless CMS.

Next pre-renders the HTML of each page in advance, not allowing client-side JS to do it. Only minimal JS to make the page interactive is loaded by the browser. This process is called hydration.  
Whereas plain React, app is not rendered until JS is loaded.

## Static Generation and Server-side rendering 

In dev mode, even pages in static generation are SSR-ed on each request.  

![SSG "Static Site Generation without Data"][2]
Next.js lets you choose which pre-rendering form to use for each page. 

![SSG "Static Site Generation with Data"][3]

use Static Generation for many types of pages, including:
* Marketing pages
* Blog posts
* E-commerce product listings
* Help and documentation
can be built once and served by CDN

Use SSG if data is frequently updated on your page. Will be slower. Or use client-side JS to fetch the updated data. 

SSG with `getStaticProps`:  in Next.js, when you export a page component, you can also export an async function called `getStaticProps`.
Runs at build time, Inside the function, you can fetch external data and send it as props to the page. 

fetch the data from other sources, like an external API endpoint; import and call inside `getStaticProps`
```jsx
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
```
Note: Next.js polyfills fetch() on both the client and server. You don't need to import it.

query the database directly:
```jsx
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```
getStaticProps only runs on the server-side.
won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

getStaticProps can only be exported from a page. You can’t export it from non-page files.

## server side rendering 

![SSR "Server Side Rendering with Data"][1]

getServerSideProps is called at request time, its parameter (context) contains request specific parameters.

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

## client-side rendering  

* Statically generate (pre-render) parts of the page that do not require external data.
* When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

![CSR "Client side rendering with Data"][4]

works for dashboard pages.    
Because a dashboard is a private, user-specific page, SEO is not relevant and need for frequently updated data.  

## SWR  

SWR is a React hook for fetching data on the client side.   
It handles caching, revalidation, focus tracking, refetching on interval, and more

```jsx
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```
# Dynamic Routes  

URL for these pages depend on the blog data, which means we need to use dynamic routes.

![Image "Page Path External Data"][5]

* Pages that begin with `[` and end with `]` are dynamic routes in Next.js.
* write code that will render a post page
* add an async `getStaticPaths` function to return a list of possible ids.

![HOWTO "How to Dynamic Routes"][6]

## tips  

`getStaticPaths` can fetch data from any data source

* In development (`npm run dev` or `yarn dev`), getStaticPaths runs on every request.
* In production, getStaticPaths runs at build time.

## fallback  

* If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

* If fallback is true, then the behavior of getStaticProps changes:

The paths returned from getStaticPaths will be rendered to HTML at build time.
The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

* If fallback is blocking, then new paths will be server-side rendered with getStaticProps, and cached for future requests so it only happens once per path.

## Catch-all routes  

can be extended to catch all paths by adding three dots (...) inside the brackets.

pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on
in getStaticPaths, you must return an array as the value of the id key
```jsx
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
```

And params.id will be an array in getStaticProps
```jsx
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```
### Next.js router 

access the Next.js router, you can do so by importing the useRouter hook from next/router.

# API Routes

create an API endpoint as a Node.js serverless function

create an API endpoint inside a Next.js app by creating a **function** inside `pages/api`

```jsx
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```
can be deployed as Serverless Functions (also known as Lambdas).

`req` is an instance of http.IncomingMessage, plus some pre-built middlewares

`res` is an instance of http.ServerResponse, plus some helper functions 

Do Not Fetch an API Route from `getStaticProps` or `getStaticPaths`
`getStaticProps` and  `getStaticPaths` runs only on the server-side. It will never be run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

### handling form input 

good use case for API Routes is handling form input. For example, you can create a form on your page and have it send a POST request to your API Route. You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.

Static Generation not ideal when you’re writing a draft on your headless CMS and want to preview the draft immediately on your page. Solution: See [preview mode ](https://nextjs.org/docs/advanced-features/preview-mode)

API Routes can be dynamic, just like regular pages.

# Deploying 




[1]: ./learn/images/server-side-rendering-with-data.png
[2]: ./learn/images/static-generation-without-data.png
[3]: ./learn/images/static-generation-with-data.png
[4]: ./learn/images/client-side-rendering.png
[5]: ./learn/images/page-path-external-data.png
[6]: ./learn/images/how-to-dynamic-routes.png