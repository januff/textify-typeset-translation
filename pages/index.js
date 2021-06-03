import { useState } from "react"
import Buttons from "../components/Buttons"
import LastFive from "../components/LastFive"
import Text from "../components/Text"
import Header from "../components/Header"
import Target from "../components/Target"

export default function Home() {
  const [page, setPage] = useState({ message: null })
  return (
    <div className="home-container">
      <div className="home-grid">
        <Header />
        <Target 
          page={ page } 
          setPage={ setPage } />
        <Buttons 
          page={ page }
          setPage={ setPage } />
        <LastFive />
        <Text 
          page={ page }
          setPage={ setPage } />
      </div>
    </div>
  )
}
