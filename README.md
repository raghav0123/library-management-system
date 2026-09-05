# library-management-system

This is library management api backend for management of books and users.

# Routes and End Points.

## /users
    GET: get all the list of users.
    POST: create/register new user.

## /users/{id}
    GET: Get a user by their ID.
    PUT: Update a user by their ID.
    Delete: Delete a user by their ID. ( (checks if user has issued books) && (checks if user has fine to be imposed.))

## /users/subscription-details/{id}
    get: get susbcription details
        >> type
        >> end date
        >> fine

## /books 
    GET: Get list of all books.
    POST: Create new book.

## /books/{id}
    GET: Get book by their ID.
    PUT: Update book by their ID.
    DELETE: Delete book by their ID.

### Subscription Types 
    >> Basic (3 months)
    >> Standard (6 months)
    >> Premium (12 months)

> > If a user missed the renewal date, then user should be colleted with $100 fine.
> > If a user missed the subscription, then user should be colleted with $100 fine.
> > If both, then user should be colleted with $200 fine.

# Commands
    npm init
    npm i express
    npm i nodemon --save-dev
    npm run dev -> (nodemon index.js)
    To restore node modules and package-lock.json --> npm i