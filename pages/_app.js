import React from "react";
import Head from 'next/head'
import '../styles/globals.css'
import Amplify from 'aws-amplify'
import Predictions, { AmazonAIPredictionsProvider } from "@aws-amplify/predictions"
import config from '../aws-exports'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

Amplify.configure({
  ...config,
  ssr: true
})
Amplify.register(Predictions)

// Predictions.addPluggable(new AmazonAIPredictionsProvider())

function MyApp({ Component, pageProps }) {
  
const [queryClient] = React.useState(() => new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV === 'production',
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
  },
}))

return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Textify // Typeset Translation</title>
        <meta property="og:title" content="TEXTIFY" key="ogtitle" />
+       <meta property="og:description" content="Comic translation using Next.js, AWS, and Apache Cassandra." key="ogdesc" />
        <meta name="theme-color" content="#404040" />
      </Head>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp

