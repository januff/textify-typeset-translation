import React, { useEffect } from "react"
import Predictions from "@aws-amplify/predictions"
import EasyEdit, {Types} from 'react-easy-edit';

export const Text = ({ page, setPage }) => {
  const save = (value) => {getTranslation(value)}

  const getTranslation = (value) => {
    // console.log(value)
    setPage(page => ({
      ...page,
      message: "Translating..."
    }))
    Predictions.convert({
      translateText: {
        source: {
          text: value,
          language : "es"
        },
        targetLanguage: "en"
      }
    })
    .then(result => {
      setPage(page => ({
          ...page,
          saved: false,
          message: "Save Edits?",
          text: {
            ...page.text,
            fullText: value,
            fullTranslation: result.text
          }
      }))
    })
    .catch(err => console.log({ err }));
  }

  useEffect(() => {
    if (page.text?.fullText && !page.text?.fullTranslation) {
      // console.log('Text useffect fired')
      getTranslation(page.text.fullText)
    }
  }, [page.text?.fullText])

  return (
    <div className="text p-4 flex bg-gray-400 gap-x-4 overflow-y-hidden overflow-y-scroll">
      <EasyEdit
        type={Types.TEXTAREA}
        value={page.text?.fullText ? page.text.fullText : 'Extracted Text Goes Here'}
        buttonsPosition="before"
        hideSaveButton={true}
        hideCancelButton={true}
        saveOnBlur={true}
        onSave={save} />
        <div>{page.text?.fullTranslation ? page.text.fullTranslation : 'Translated Text Goes Here'}</div>
    </div>
  )  
}