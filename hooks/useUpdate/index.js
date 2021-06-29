import axios from "axios"
import { useMutation, queryClient } from "react-query"

// I'm not actually using this hook right now. Somehow haven't been able to get it working.

const updateScan = async (values) => {
  const { data } = await axios.patch(`/api/update/pages/${values.name}`, values)
  console.log ('{ data } from updateScan: ', data)
  return data
}

const useUpdate = () => {
  return useMutation(values => updateScan(values), {
    onMutate: () => {
      console.log('useUpdate onMutate triggered')
      // queryCache.setQueryData(['scans', values.name], values) },
    },
    onSettled: (values) => {
      console.log('useUpdate onSettle triggered')
      // queryClient.invalidateQueries(['scan', values.name])
      // queryClient.invalidateQueries(['scans'])
    }
  })
}

export { useUpdate, updateScan }
