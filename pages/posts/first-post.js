import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post | Basil's Blog</title>
      </Head>
      <main>
        <h1>First Post</h1>
        <p>I am super loving NextJS!</p>
        <p>Write your blog content here!</p>
      </main>
    </Layout>
  )
}