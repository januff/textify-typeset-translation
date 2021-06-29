const { createClient } = require("@astrajs/collections");

export default async (req, res) => {
  const { collectionName } = req.query
  const data = req.body

  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  const collection = astraClient
    .namespace('serverless')
    .collection(collection)

  try {
    const post = await collection.create(data.name, data)
    res.status(200).json(post)
  } catch (e) {
    console.error(e);
    res.status(500).json(e)
  }

}