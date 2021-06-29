import axios from "axios"
import { useQuery, useMutation, queryCache } from "react-query"

// I'm not actually using this hook right now. Somehow haven't been able to get it working.

const deleteScanByName = async (name) => {
  const { data } = axios.delete(`api/delete/pages/${name}}`)
  return data
}

const useDelete = (name) => {
  console.log(name)
  // return useMutation(deleteScanByName(name))    
}

export { useDelete, deleteScanByName }

// const deleteMutation = useMutation(page => fetch(`http://localhost:3050/api/delete/pages/${page.name}`, { 
//   method: 'DELETE', 
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   },
// }
// ), 
// {
// onMutate: () => {
//   queryClient.removeQueries(['scan', page.name], { exact: true})
//   queryClient.invalidateQueries(['scans'])
// }
// }
// )

// const deleteIt = async (e) => {
// e.preventDefault()
// deleteMutation.mutate(page, {
// onSettled: () => {
//   setPage(page => ({
//     message: 'Choose or Upload Image'
//   }))
//   queryClient.invalidateQueries(['scans'])
// }
// })
// }