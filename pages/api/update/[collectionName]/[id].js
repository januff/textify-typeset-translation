const { createClient } = require("@astrajs/collections");

export default async (req, res) => {
  const { collectionName, id } = req.query
  const data = req.body

  // console.log({collectionName, id, data})
  
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  const collection = astraClient
    .namespace('serverless')
    .collection(collectionName)

  try {
    const item = await collection.update(id, data)
    res.status(200).json(item)
  } catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
}