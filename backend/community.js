const { ObjectId } = require('mongodb')
const { getMongoCollection } = require("./db")

async function createComment(user, Text) {
    // if(ObjectId.isValid(id)) return null
    const collection = await getMongoCollection("pomodoro", "comments")
    const comment = await collection.insertOne({
        user: user.name,
        Date: new Date(),
        Text: Text
    })
    console.log(comment)
    return comment

}

async function readAllComments() {
    const collection = await getMongoCollection("pomodoro", "comments")
    const result = await collection.find().toArray()
    return result
}


module.exports = {
    createComment,
    readAllComments,
}