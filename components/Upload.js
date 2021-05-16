import { Storage } from 'aws-amplify'
import Predictions from "@aws-amplify/predictions"

const Upload = ({ page, setPage }) => {
  const select = async (file) => {
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
        message: err
      }))
      console.log({ err })
    }
  }

  return (
    <div className="upload text-xs">
      { page.message ? 
        <h3>{ page.message }</h3> : 
          <input
            type="file" 
            accept='image/jpg'
            onChange={(e) => select(e.target.files[0])}
        /> }
    </div>
  )  
}

export default Upload
