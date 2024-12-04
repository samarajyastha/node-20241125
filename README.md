# Node with Express.js API

# Pre-requisites for mongoDB
1. Download and install mongoDB community version in your pc. (local)
2. Download and install mongoDB shell, for using mongoDB in terminal (local)
3. Download and install mongoDB compass for GUI (local)
4. Use mongoDB atlas for cloud version (recommended for students).

## Routes directory
1. URL
2. HTTP METHOD

For example `router.get('/users', userController)`

## Controllers directory
1. Handle requests and send response

For example `const userController = (req, res)=> {res.send(users)}`

## Services directory
1. Working with database queries

For example `const userService = () => { return Users.find(); }`
