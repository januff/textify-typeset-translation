const { createClient } = require("@astrajs/collections");

export default async (req, res) => {
  const { collectionName, id } = req.query
  console.log({collectionName, id, req})
  res.status(200)
  
  // const astraClient = await createClient({
  //   astraDatabaseId: process.env.ASTRA_DB_ID,
  //   astraDatabaseRegion: process.env.ASTRA_DB_REGION,
  //   applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  // });

  // const postCollection = astraClient
  //   .namespace('serverless')
  //   .collection(collectionName)

  //   try {
  //     const post = await postCollection.create(data)
  //     res.status(200).json(post)
  //   } catch (e) {
  //     console.error(e);
  //     res.status(500).json(e)
  //   }
}