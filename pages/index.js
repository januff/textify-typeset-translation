import { useState } from "react"
import Upload from "../components/Upload"
import LastFive from "../components/LastFive"
import PageInfo from "../components/PageInfo"
import Header from "../components/Header"
import Translation from "../components/Translation"

export default function Home() {
  const [page, setPage] = useState({ message: null })
  return (
    <div className="home-container">
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
