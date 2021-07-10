import React from "react";
import Head from 'next/head'
import '../styles/globals.css'
import Amplify from 'aws-amplify'
import Predictions, { AmazonAIPredictionsProvider } from "@aws-amplify/predictions"
import config from '../aws-exports'

// The Hydration code below is taken from the nextjs example in the react-query repo. No idea what it's doing.

import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

Amplify.configure({
  ...config,
  ssr: true
})
Amplify.register(Predictions)

// "Error: Pluggable with name AmazonAIPredictionsProvider has already been added."
// Comment out the following line if refreshing the browser yields error above. Hot-reloading by Next makes full browser refreshes mostly unnecessary; for development tasks that require it, I found it easier to just leave this commented out.

Predictions.addPluggable(new AmazonAIPredictionsProvider())

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
+       <meta property="og:description" content="Comic translation demo using Next.js, AWS, and Apache Cassandra." key="ogdesc" />
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

