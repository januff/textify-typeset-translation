import React, { useState, useEffect } from "react"
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { Header, Text, Previous, Scan, Buttons } from "../components"
import { useScans, getScans } from "../hooks";

const Home = () => {
  const [ page, setPage ] = useState({ 
    message: 'Choose or Upload Image',
    saved: false
  })

  return (
    <div className="home-container">
      <div className="home-grid">
        <Header />
        <Scan 
          page={ page } 
          setPage={ setPage } />
        <Buttons 
          page={ page }
          setPage={ setPage } />
        <Previous 
          page={ page } 
          setPage={ setPage } />
        <Text 
          page={ page }
          setPage={ setPage } />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  // const scans = await getScans()
  // console.log('scans from getScans from getStaticProps: ', scans)
  
  // queryClient.setQueryData('scans', scans)

  // Object.keys(scans).forEach(key => {
  //   console.log('scans[key] ', scans[key])
  //   queryClient.setQueryData(['scan', key], scans[key])
  // })

  
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

// https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-788447705
// I'm having this same issue. Using JSON.parse(JSON.stringify(dehydrate(queryClient))) works but feels a bit hacky.

export default Home