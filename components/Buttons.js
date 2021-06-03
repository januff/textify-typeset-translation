// Icons from https://iconsvg.xyz/

import { Storage } from 'aws-amplify'
import Predictions from "@aws-amplify/predictions"

const Buttons = ({ page, setPage }) => {
  const upload = async (file) => {
    try {
      setPage({ 
        name: file.name, 
        type: file.type,
        size: file.size,
        width: 0,
        height: 0,
        message: 'Uploading...' 
      })
      await Storage.put(file.name, file)
      let url = await Storage.get(file.name)
      setPage(page => ({ 
        ...page,
        url, 
        message: 'Translating...'
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
          message: null
        }))
      })
    } catch(err) {
      setPage(page => ({ 
        ...page, 
        message: null
      }))
      console.log({ err })
    }
  }

  return (
    <div className="buttons text-xs">
      <button>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21"/><path d="M16 16l-4-4-4 4"/></svg>
        <span className="ml-2">Upload Image</span>
        <input onChange={(e) => upload(e.target.files[0])} className="cursor-pointer absolute opacity-0 w-full" type="file" />
      </button>
      <button>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
        <span className="ml-2">Translate</span>
      </button>
      <button>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span className="ml-2">Save Text</span>
      </button>
    </div>
  )  
}

export default Buttons
