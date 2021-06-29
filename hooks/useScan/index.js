import axios from "axios"
import { useQuery } from "react-query"

const getScanByName = async (name) => {
  // console.log('refetching?')
  if (name === 'undefined') {
    console.log('name undefined! name: ', name)
    return null;
  }
  const { data } = await axios.get(`/api/read/pages/${name}`)
  // console.log('refetched Scan data: ', data)
  return data
}

const useScan = (page) => {
  return useQuery(['scan', page.name], () => getScanByName(page.name), {
    enabled: page.saved,
    staleTime: Infinity
  })
}

export { useScan }

// Tanner Linsley's usePost example
// https://github.com/tannerlinsley/react-query/blob/master/examples/custom-hooks/src/hooks/usePost.js
