import { useState } from "react"
import Upload from "../components/Upload"
import LastFive from "../components/LastFive"
import PageInfo from "../components/PageInfo"
import Header from "../components/Header"
import Translation from "../components/Translation"
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [page, setPage] = useState({ message: null })
  return (
    <div className="home-container">
      <Head>
        <link
          rel="preload"
          href="/fonts/ReadyforAnythingBB-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ReadyforAnythingBB-Bold.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <div className="home-grid">
        <Header />
        <Translation 
          page={ page } 
          setPage={ setPage } />
        <Upload 
          page={ page }
          setPage={ setPage } />
        <LastFive />
        <PageInfo 
          page={ page }
          setPage={ setPage } />
      </div>
    </div>
  )
}
