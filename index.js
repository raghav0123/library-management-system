const express = require('express')
const app = express()

//Middleware to parse incoming json req.
app.use(express.json())

app.get('/', (req,res) => {
    res.status(200).send(`
        <html>
        <body>
        <h1>Welcome to Home Page!</h1>
        </body>
        </html>`)
})

const PORT = 3000;

app.listen(3000, () => {
    console.log(`App listening on Port ${PORT} successfully!`)
})
