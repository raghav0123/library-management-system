const express = require('express');
let users = require('../data/user.json');

const router = express.Router();

module.exports = router;

// routes...


/*
Route: /users
Method: GET
Description: Get all users list.
Access: Public
Parameters: None
*/
router.get('/', (req, res) => {
    res.status(200).json({
        Success: true,
        Message: users
    })
})

/*
Route: /users
Method: POST
Description: Create new user.
Access: Public
Parameters: {user}
*/
router.post('/', (req, res) => {
    //id,name,email,issuedbook,subType,subDate

    try {
        if (!req.body) throw new Error('Invalid Json Data.')
        const { id, name, email, issuedBook, subType, subDate } = req.body;
        //MISSING FIELDS
        if (!id || !name || !email || !issuedBook || !subDate || !subType) {

            return res.status(400).json({
                success: false,
                data: req.body,
                message: "All fields required!"
            })

        }
        //USER ALREADY EXISTS
        const user = users.find((each) => each.id == id)
        if (user) return res.status(409).json({ success: false, message: `user with id:${id} already exists!` })
        //CREATING NEW USER
        users.push({ id, name, email, issuedBook, subType, subDate })
        res.status(201).json({
            success: true,
            data: users,
            message: `User with id:${id} created successfully!`
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }


})


/*
Route: /users/:id
Method: GET
Description: Get user with specific id .
Access: Public
Parameters: None
*/
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((each) => each.id === id)
    //USER DOESN'T EXISTS!
    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User with id:${id} does not exists!`
        })
    }
    //SEND USER DETAILS
    return res.status(200).json({
        success: true,
        message: user
    })

})


/*
Route: /users/:
Method: PUT
Description: Get all users list.
Access: Public
Parameters: id  
*/
router.put('/:id', (req, res) => {
    try {

        const id = Number(req.params.id)
        const data = req.body
        const user = users.find((each) => each.id === id)
        //USER DOESN'T EXISTS!
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User with id:${id} does not exists!`
            })
        }



        const newUsers = users.map((each) => {
            if (each.id == id) {
                return { ...each, ...data }
            }
            return each
        })
        users = newUsers;
        return res.status(200).json({
            success: true,
            data: users,
            message: `User with id:${id} updated!`
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


})


/*
Route: /users/:id
Method: DELETE
Description: Get all users list.
Access: Public
Parameters: id  
*/
router.delete('/:id', (req, res) => {
    try {

        const id = Number(req.params.id)
       
        const index = users.findIndex((each) => each.id === id)
        
        //USER DOESN'T EXISTS!
        if (index == -1) {
            return res.status(400).json({
                success: false,
                message: `User with id:${id} does not exists!`
            })
        }



        users.splice(index,1)
       
        return res.status(200).json({
            success: true,
            data: users,
            index: index,
            message: `User with id:${id} deleted!`
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


})

/*
Route: /users/subcription-details/:id
Method: GET
Description: Get user subscription details.
Access: Public
Parameters: id
*/

router.get('/subscritption-details/:id', (req,res) => {
    const id = Number(req.params.id)
    const user = users.find((each) => each.id === id)
    //USER DOESN'T EXISTS!
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User with id:${id} does not exists!`
            })
        }
    const getDateInDays = (val = '') => {
        
        const date = val ? new Date(val) : new Date();
        if (isNaN(date)){
            throw new Error("Invalid date provided!")
        }
        let days = Math.floor((date) / (1000 * 3600 * 24))
        return days
    }
    const SubType = (sub,days) => {
        if (sub == 'Basic'){
            return days + 30
        }
        else if (sub == 'Standard'){
            return days + 90
        }
        else if (sub == 'Premium'){
            return days + 365
        }
   
    }
    const subDate = getDateInDays(user.subDate)
    const currDate = getDateInDays()
    const expSub = SubType(user.subType, subDate)
    const fine =  currDate>expSub ? '$100' : `${expSub - currDate} days left!`
    res.status(200).json({...user, subDate,expSub,fine,user, currDate})

})

