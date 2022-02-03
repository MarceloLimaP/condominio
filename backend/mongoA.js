const { MongoClient } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"

const DATABASE_NAME = "Condominios"
const COLLECTION_NAME = "Testes"
const COLLECTION_SESSIONS = "Sessions"

async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(URL)
        }
        return client;
    } catch (err) {
        console.log(err)
    }
};

async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
};

async function createDocument(data) {
    const collection = await getMongoCollection("ex_4_3_3_1", "colecao")
    const result = await collection.insertOne(data)
    console.log(result)
    return result.insertedId
};

async function createAccByEmail(email) {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME)
    const result = await collection.insertOne(email)
    return result.insertedId
};
async function readUsers() {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME)
    const result = await collection.find().toArray()
    return result
};

async function createSessions({ userName, token }) {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_SESSIONS)
    const result = await collection.insertOne({ userName, token })
    return result.insertedId
};

async function findDocumentByUser(username) {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME)
    const document = await collection.findOne({ UserName: { $eq: username } })
    return document
};

module.exports = { createAccByEmail, readUsers, createSessions, findDocumentByUser };