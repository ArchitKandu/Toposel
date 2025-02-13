const { MongoClient, ServerApiVersion } = require("mongodb");

// Getting URI from environmental variables
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDatabase = async () => {
  try {
    // Connect to the database
    await client.connect();

    // Send ping to verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Deployment is pinged. Connected to MongoDB successfully !!");
  } finally {
    await client.close();
  }
};

module.exports = { connectDatabase };
