import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }
  return uri;
}

function getMongoClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(getMongoUri()).connect();
  }
  return global._mongoClientPromise;
}

export async function getMongoDb() {
  const dbName = process.env.MONGODB_DB ?? "portfolio";
  const client = await getMongoClientPromise();
  return client.db(dbName);
}
