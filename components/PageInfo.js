import Predictions from "@aws-amplify/predictions"
import { photoPlaceholder } from "@aws-amplify/ui"
import { useEffect } from "react"

const PageInfo = ({ page, setPage }) => {

  const getTranslation = (text) => {
    console.log(text)
    Predictions.convert({
      translateText: {
        source: {
          text: text
        },
      }
    })
    .then(result => {
      setPage(page => ({
          ...page,
          text: {
            ...page.text,
            fullTranslation: result.text
          }
      }))
    })
    .catch(err => console.log({ err }));
  }

  // https://stackoverflow.com/a/62748378

  const editTask = (edit) => {
    setPage(page => ({
      ...page,
      text: {
        ...page.text,
        fullText: edit
      }
    }))
  }

  useEffect(() => {
    if (page.text?.fullText) {
      getTranslation(page.text.fullText)
    }
  }, [page.text?.fullText, page.text?.fullTranslation])

  return (
    <div className="page-info leading-tight p-4 flex bg-gray-400 text-base tracking-tight gap-x-4 overflow-y-hidden overflow-y-scroll">
      <small 
        contentEditable="true"
        onInput={e => editTask(e.currentTarget.textContent)}
        className="w-1/2 p-4 rounded-xl bg-gray-100">
        {page.text?.fullText ? 
          page.text.fullText :
            'Extracted Text Goes Here'}
      </small> 
      <small
        className="w-1/2 p-4 rounded-xl bg-gray-100">
        {page.text?.fullTranslation ? 
          page.text.fullTranslation :
            'Translated Text Goes Here'}
      </small> 
    </div>
  )  
}
  
export default PageInfo