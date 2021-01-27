import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'

export default function Bookshelf() {
  return (
    <Layout>
      <Head>
        <title>Bookshelf | {siteTitle} </title>
      </Head>
      <h1>Bookshelf</h1>
      <p>
        I do read. And I like to share what I learn. Trust me, nothing more rewarding than that.
        So, here I attempt to capture in my writings what I feel, partly instructions and partly documentation for my future self.
      </p>
      <p>Obviously make the below list a BookList component or a generic component maybe?</p>
      <ol>
        <Link href="#"><a>The Three Body Problem | Cixin Liu</a></Link>
      </ol>
    </Layout>
  )
}