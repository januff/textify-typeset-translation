import React, { useState, useEffect } from "react"
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { Header, Text, Previous, Scan, Buttons } from "../components"
import { useScans, useScan, getScans } from "../hooks";

const Home = () => {
  const [ page, setPage ] = useState({ 
    message: 'Choose or Upload Image',
    saved: false
  })
  // const { data: scans } = useScans()
  // const { data: scan } = useScan(page.id)

  // const { status, data: scan, error, isFetching } = useScan( page.name )

  // console.log("useScan data as scan: ", scan)


  // useEffect (() => {
  //   if (scans) {
  //     setPage(page => ({
  //         ...scans[Object.keys(scans)[0]],
  //         id: Object.keys(scans)[0]
  //       })
  //     )
  //   }
  // }, [page.id])

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
  // console.log('scans: ', scans)
  
  // queryClient.setQueryData('scans', scans)

  // Object.keys(scans).forEach(key => {
  //   console.log('scans[key] ', scans[key])
  //   queryClient.setQueryData(['scan', key], scans[key])
  // })

  // https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-788447705
  // I'm having this same issue. Using JSON.parse(JSON.stringify(dehydrate(queryClient))) works but feels a bit hacky.

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Home