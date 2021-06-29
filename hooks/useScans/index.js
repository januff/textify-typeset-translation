import axios from "axios"
import { useQuery, queryClient } from "react-query"

const getScans = async () => {
  const { data } = await axios.get('/api/read/pages')
  const array = Object.values(data) 
  return array
}

const useScans = () => {
  return useQuery(['scans'], getScans)
}

export { useScans, getScans }

// Tanner Linsley's usePosts example
// https://github.com/tannerlinsley/react-query/blob/master/examples/custom-hooks/src/hooks/usePosts.js
