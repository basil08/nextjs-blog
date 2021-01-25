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
        <h1>Head {' '}<Link href="/"><a>back to Home</a></Link>!</h1>
      </main>
    </Layout>
  )
}