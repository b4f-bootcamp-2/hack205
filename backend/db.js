const { MongoClient, ObjectId } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://127.0.0.1:27017"
const DATABASE_NAME = "pomodoro"
const USER_COLLECTION = "users"
const SESSION_COLLECTION = "sessions"
const COMMENT_COLLECTION = "comments"


let client
async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(URL)
        }
        return client;
    } catch (err) {
        console.log(err)
    }
}


async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
}

async function insertUser(user) {
    const collection = await getMongoCollection(DATABASE_NAME, USER_COLLECTION)
    const res = await collection.insertOne(user)
    return res.insertedId
}

async function findUserByEmail(email) {
    const collection = await getMongoCollection(DATABASE_NAME, USER_COLLECTION)
    const user = await collection.findOne({ email })
    return user
}

async function findUserById(id) {
    const collection = await getMongoCollection(DATABASE_NAME, USER_COLLECTION)
    const user = await collection.findOne({ _id: ObjectId(id) })
    console.log(user)
    return user
}

// async function readAllUsers() {
//     const collection = await getMongoCollection(DATABASE_NAME, USER_COLLECTION)
//     const result = await collection.find().toArray()
//     return result
// }

///////  SESSIONS ///////

async function insertSession(id) {
    const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)
    const res = await collection.insertOne({
        userId: id,
        expiresAt: new Date(new Date().valueOf() + (60 * 60 * 1000))
    })
    return res.insertedId
}

async function findSessionByToken(token) {
    if (!ObjectId.isValid(token)) return undefined
    const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)
    const session = await collection.findOne({ _id: new ObjectId(token) })
    return session
}


async function updateSession(id) {
    const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)

    const newSession = await collection.updateOne(
        { _id: ObjectId(id) }, // .find()
        {
            $set: {
                expiresAt: new Date(new Date().valueOf() + (60 * 60 * 1000))
            }
        }

    )
    return newSession
}




// async function insertScore(datascore) {
//     const collection = await getMongoCollection(DATABASE_NAME, SCORE_COLLECTION)
//     const res = await collection.insertOne(datascore)
//     return res.insertedId
// }



// async function insertSession(session) {
//     const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)
//     const res = await collection.insertOne(session)
//     return res.insertedId
// }

// async function findSessionByToken(token) {
//     if (!ObjectId.isValid(token)) return undefined
//     const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)
//     const session = await collection.findOne({ _id: new ObjectId(token) })
//     return session
// }

module.exports = { connectToMongo, getMongoCollection, insertUser, findUserByEmail, findUserById, insertSession, findSessionByToken, updateSession }