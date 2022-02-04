const { ObjectId } = require('mongodb')
const { getMongoCollection } = require("./db")

async function updatePomodoro(id, pomodoro) {
    const collection = await getMongoCollection("pomodoro", "users")
    console.log(pomodoro)
    const timesAdded = await collection.updateOne(
        { _id: ObjectId(id) }, // isto é um .find() e encontra o user
        {
            $push: { pomodoro: pomodoro }
        }
    )
    console.log(timesAdded)
    return timesAdded

}

module.exports = {
    updatePomodoro
}

// pomodoro = [{
//     name: ,
//     hours: ,
    
// }]

