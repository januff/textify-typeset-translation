const { createClient } = require("@astrajs/collections");

export default async (req, res) => {
  const { collectionName, lang } = req.query
  
  if (lang) { console.log ("lang: ", lang)}

  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  const collection = astraClient
    .namespace('serverless')
    .collection(collectionName)

    try {
      // const all = await collection.find({})
      // const all = await collection.find({ name: { $eq: 'doom-sq-c.jpg' } })

      if (lang) {
        const all = await collection.find({ language: { $eq: lang } })
        res.status(200).json(all)
      } else {
        const all = await collection.find({})
        res.status(200).json(all)
      }
      // const all = await collection.find({ language: { $eq: 'it' } })
      // const all = await collection.find([{},{ 'page-size': { $eq: 2 } }]) NOPE

      // console.log('results from get all: ', all)      

    } catch (e) {
      console.error(e);
      res.status(500).json(e)
    }
}