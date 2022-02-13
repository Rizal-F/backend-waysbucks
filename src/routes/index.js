const express = require('express')

const router = express.Router()

//Import Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { login, register } = require('../controllers/auth')
const { getProducts, addProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getToppings ,addTopping, getTopping, updateTopping, deleteTopping } = require('../controllers/topping')

// import Middleware 
const { auth } = require('../middlewares/auth')
// import fileUpload
const {uploadFile} = require('../middlewares/uploadFiles')

//Routes user
router.post('/user', addUsers)
router.get('/users', auth, getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

//routes products
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.patch('/product/:id', auth, updateProduct)
router.delete('/product/:id', auth, deleteProduct)
router.post('/product', auth, uploadFile ("image"), addProduct)

//routes topping
router.get('/toppings', getToppings)
router.get('/topping/:id', getTopping)
router.patch('/topping/:id', auth, updateTopping)
router.delete('/topping/:id', auth, deleteTopping)
router.post('/topping', auth, uploadFile ("image"), addTopping)

//routes auth
router.post('/register', register)
router.post('/login', login)


module.exports = router