const express = require('express');
let books = require('../data/books.json');
let users = require('../data/user.json')
const router = express.Router();

module.exports = router;

// routes...


/*
Route: /books
Method: GET
Description: Get all books list.
Access: Public
Parameters: None
*/
router.get('/', (req, res) => {
    res.status(200).json({
        Success: true,
        Message: books
    })
})

/*
Route: /books
Method: POST
Description: Create new book.
Access: Public
Parameters: {book}
*/
router.post('/', (req, res) => {
    //id,name,author,issuedbook,available

    try {
        if (!req.body) throw new Error('Invalid Json Data.')
        const { id, name, author, quantity, available } = req.body;
        //MISSING FIELDS
        if (!id || !name || !author || !quantity || !available) {

            return res.status(400).json({
                success: false,
                data: req.body,
                message: "All fields required!"
            })

        }
        //book ALREADY EXISTS
        const book = books.find((each) => each.id == id)
        if (book) return res.status(409).json({ success: false, message: `book with id:${id} already exists!` })
        //CREATING NEW book
        books.push({ id, name, author, quantity, available })
        res.status(201).json({
            success: true,
            data: books,
            message: `book with id:${id} created successfully!`
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }


})

/*
Route: /books/issuedBooks/books
Method: GET
Description: Get all books issued.
Access: Public
Parameters: None 
*/
router.get('/issuedBooks', (req, res) => {
    try {
        const userWithIssuedBooks = users.filter((each) => each.issuedBook > 0)
        const issuedBooksWithUser = users.flatMap((each) => {
            const book = books.find((item) => item.id == each.issuedBook)
            if (!book){
                return []
            }
            return { ...book, userDetails: each }
        })
        res.status(200).json(issuedBooksWithUser)
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }

})


/*
Route: /books/:id
Method: GET
Description: Get book with specific id .
Access: Public
Parameters: None
*/
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find((each) => each.id === id)
    //book DOESN'T EXISTS!
    if (!book) {
        return res.status(400).json({
            success: false,
            message: `book with id:${id} does not exists!`
        })
    }
    //SEND book DETAILS
    return res.status(200).json({
        success: true,
        message: book
    })

})


/*
Route: /books/:
Method: PUT
Description: Get all books list.
Access: Public
Parameters: id  
*/
router.put('/:id', (req, res) => {
    try {

        const id = Number(req.params.id)
        const data = req.body
        const book = books.find((each) => each.id === id)
        //book DOESN'T EXISTS!
        if (!book) {
            return res.status(400).json({
                success: false,
                message: `book with id:${id} does not exists!`
            })
        }



        const newbooks = books.map((each) => {
            if (each.id == id) {
                return { ...each, ...data }
            }
            return each
        })
        books = newbooks;
        return res.status(200).json({
            success: true,
            data: books,
            message: `book with id:${id} updated!`
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


})


/*
Route: /books/:id
Method: DELETE
Description: Get all books list.
Access: Public
Parameters: id  
*/
router.delete('/:id', (req, res) => {
    try {

        const id = Number(req.params.id)

        const index = books.findIndex((each) => each.id === id)

        //book DOESN'T EXISTS!
        if (index == -1) {
            return res.status(400).json({
                success: false,
                message: `book with id:${id} does not exists!`
            })
        }



        books.splice(index, 1)

        return res.status(200).json({
            success: true,
            data: books,
            index: index,
            message: `book with id:${id} deleted!`
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


})

