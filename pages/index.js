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
  const [ lang, setLang ] = useState('')
  const { data: scans, isLoading, isFetching } = useScans(lang)

  return (
    <div className="home-container">
      <div className="home-grid">
        <Header 
          setPage={ setPage } />
        <Scan 
          page={ page } 
          setPage={ setPage } />
        <Buttons 
          page={ page }
          setPage={ setPage } />
        <Previous 
          scans={ scans } 
          page={ page }
          lang={ lang } 
          setPage={ setPage } />
        <Text 
          page={ page }
          lang={ lang }
          setPage={ setPage }
          setLang={ setLang } />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  // const scans = await getScans()
  // console.log('scans from getScans from getServerSideProps: ', scans)
  
  // await queryClient.setQueryData('scans', () => getScans())

  // Object.keys(scans).forEach(key => {
  //   console.log('scans[key] ', scans[key])
  //   queryClient.setQueryData(['scan', key], scans[key])
  // })

//  scans.map(scan => {
//     console.log('scan.name ', scan.name)
//     queryClient.setQueryData(['scan', scan.name], scan)
//   })

  
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

// https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-788447705
// I'm having this same issue. Using JSON.parse(JSON.stringify(dehydrate(queryClient))) works but feels a bit hacky.

export default Home