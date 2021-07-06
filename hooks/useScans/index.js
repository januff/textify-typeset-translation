import axios from "axios"
import { useQuery, queryClient } from "react-query"

const getScans = async (lang) => {
  const { data } = await axios.get(`/api/read/pages?lang=${lang}`)
  const array = Object.values(data) 
  return array
}

const useScans = (lang = '') => {
  return useQuery(['scans', lang], () => getScans(lang))
}

export { useScans, getScans }

// Tanner Linsley's usePosts example
// https://github.com/tannerlinsley/react-query/blob/master/examples/custom-hooks/src/hooks/usePosts.js
