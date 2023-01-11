const mongoose = require ('mongoose')

const db = () => mongoose.connect(process.env.MONGO_URI)
.then (() => {
    console.log('Connection Stablished')
})
.catch((error) => {
    console.log('Error connection to MongoDB', error)
})

module.exports = db