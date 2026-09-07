const express = require('express');
let users = require('./data/user.json');
const { error } = require('node:console');
const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')


const app = express();
//MIDDLEWARE FOR HANDLING JSON REQ
app.use(express.json())
//PORT NUMBER
const PORT = 3000;

/*
Route: /
Method: GET
Description: Homepage.
Access: Public
Parameters: None
*/
app.get('/', (req, res) => {

    res.status(200).send(`
        <html>
        <body>
        <h1>Welcome to Home Page!</h1>
        </body>
        </html>
        `)
})

//USER ROUTES
app.use('/users', userRouter)

//BOOK ROUTES 
app.use('/books', bookRouter)


//APP LISTENS
app.listen(3000, () => {
    console.log(`App listening on Port ${PORT}!`)
})


