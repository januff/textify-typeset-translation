import React, { useEffect } from "react"
import Predictions from "@aws-amplify/predictions"
import EasyEdit, {Types} from 'react-easy-edit';

export const Text = ({ page, lang, setPage, setLang }) => {

  const langToggler = () => {
    lang ? setLang('') : setLang(page.language)
  }

  const save = (value) => {
    if (value === page.text?.fullText || value === 'Extracted Text Goes Here' ) { return null }
    getTranslation(value)
  }

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
          language: page.language
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

  // If text is untranslated and language is ID'd, translate text.

  useEffect(() => {
    if (page.text?.fullText && page.language &&!page.text?.fullTranslation) {
      getTranslation(page.text.fullText)
    }
  }, [page.text?.fullText, page.language])

  // If language is ID'd, expand language code to full language name.

  useEffect(() => {
    if (page.language &&!page.fullLanguage) {
      let full = new Intl.DisplayNames(['en'], {type: 'language', style: 'long'}).of(page.language)
      setPage(page => ({
        ...page,
        fullLanguage: full,
        message: "Save Edits?"
      }))
    }
  }, [page.language, page.fullLanguage])

  return (
    <div className="text p-3 sm:p-4 flex bg-gray-400 gap-x-3 sm:gap-x-5 overflow-y-scroll">
      <EasyEdit
        type={Types.TEXTAREA}
        value={page.text?.fullText ? page.text?.fullText : 'Extracted Text Goes Here'}
        buttonsPosition="before"
        hideSaveButton={true}
        hideCancelButton={true}
        saveOnBlur={true}
        onSave={save} />
      <div>{page.text?.fullTranslation ? page.text?.fullTranslation : 'Translated Text Goes Here'}</div>
      {page.fullLanguage && 
        <div className="language fixed text-white bottom-0 left-0 w-full flex items-center justify-between">
          <span className="text-xs sm:text-sm bg-gray-700 p-3 self-end">Detected: {page.fullLanguage}</span>
          <span className="cursor-pointer text-xs bg-gray-700 p-2 m-2 border-2 border-dashed rounded-xl" onClick={langToggler}>{lang ? 'View All Languages' : `${page.fullLanguage} Scans Only`}</span>
        </div>}
    </div>
  )
}