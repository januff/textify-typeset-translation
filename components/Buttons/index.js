// Icons from https://iconsvg.xyz/
// Serverless code adapted from Ania Kubow 
// https://github.com/kubowania/stargate-tik-tok/blob/main/src/pages/Upload.js

import React, { useEffect } from 'react'
import { Storage } from 'aws-amplify'
import Predictions from '@aws-amplify/predictions'
import axios from 'axios'
import { useMutation, useQueryClient } from "react-query"

export const Buttons = ({ page, setPage }) => {
  const queryClient = useQueryClient()

  const uploadScan = async (file) => {
    try {
      setPage({ 
        name: file.name, 
        type: file.type,
        size: file.size,
        width: 0,
        height: 0,
        saved: false,
        message: 'Uploading...' 
      })
      await Storage.put(file.name, file, { 
        contentType: 'image/jpeg', })
      let src = `https://trans-next-tail-v2-bucket112805-dev.s3.amazonaws.com/public/${file.name}`
      setPage(page => ({ 
        ...page,
        src,
        message: 'Scanning...'
      }))
      Predictions.identify({
        text: {
          source: {
            key: file.name
          }
        }
      })
      .then(response => {
        let text = response.text
        setPage(page => ({ 
          ...page,
          text, 
          message: 'Ready For Edits'
        }))
      })
    } catch(err) {
      setPage(page => ({ 
        ...page, 
        message: 'Error! Try Again.'
      }))
      console.log({ err })
    }
  }

  const updateScan = async (e) => {
    e && e.preventDefault()
    updateMutation.mutate({ 
      ...page, 
      saved: true, 
      message: 'Ready to Edit' 
    })
  }

  const updateMutation = useMutation(
    page => axios.patch(`/api/update/pages/${page.name}`, page),
    {
      onMutate: async page => {
        await queryClient.cancelQueries('scans')
      },
      onSettled: () => {
        setPage(page => ({
          ...page,
          saved: true,
          message: 'Ready to Edit'
        }))
        queryClient.invalidateQueries(['scan', page.name])
        queryClient.invalidateQueries(['scans'])
      },
    }
  )

  const deleteScan = async (e) => {
    e.preventDefault()
    // console.log('delete it clicked. page = ', page)
    deleteMutation.mutate(page, {
      onSettled: () => {
        // console.log('settle delete mutation')
        setPage(page => ({
          saved: false,
          message: 'Choose or Upload Image'
        }))
        queryClient.invalidateQueries(['scans'])
      }
    })
  }
 
  const deleteMutation = useMutation(page => axios.delete(`/api/delete/pages/${page.name}`), 
    {
      onMutate: () => {
        // console.log('start delete mutation')
        setPage(page => ({
          saved: false,
          message: 'Choose or Upload Image'
        }))
        queryClient.removeQueries(['scan', page.name], { exact: true})
      }
    }
  )

  return (
    <div className="buttons text-xs">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21"/><path d="M16 16l-4-4-4 4"/></svg>
        <span className="hidden sm:contents ml-0 sm:ml-2">Scan Image</span>
        <input onChange={(e) => uploadScan(e.target.files[0])} className="cursor-pointer absolute opacity-0 w-full" type="file" />
      </button>
      <button onClick={updateScan}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span className="hidden sm:contents ml-0 sm:ml-2">Save Edits</span>
      </button>
      <button onClick={deleteScan}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        <span className="hidden sm:contents ml-0 sm:ml-2">Delete Scan</span>
      </button>
    </div>
  )  
}
