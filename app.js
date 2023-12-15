const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const uuid = require('uuid')
const bodyParser = require('body-parser')

const app = express()

const PORT = 3000

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())


app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true
}))

app.get('/getComments', (req, res) => {
    const data = {
        id: '2urdhfjf',
        name: 'Daniel',
        comment: 'I come late to class'
    }
    res.status(200).json(data)
})

app.post('/postComment', (req, res) => {
    const { name, comment } = req.body
    const id = uuid.v4()

    try {
        if (!name) throw Error('Name is required')
        if (!comment) throw Error('Comment is required')

        let response = {
            data: {
                id,
                name,
                comment,
            },
            statusCode: 200,
            message: "comment posted successfully",
        }

        res.status(200).json(response)
    } catch (error) {
        const response = {
            message: error.message,
            statusCode: 400
        }
        res.status(400).json(response)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})