const express = require('express')
const router = express.Router()
const users = require('../controllers/users')
const ApiController = require('../controllers/ApiController')
const imageController = require('../controllers/imageController')
const BgRemove = require('../controllers/BgRemoveController')
//const signUpTemplateCopy = require('../Models/signUpModel')
//const loginModel = require('../Models/loginModel')

// router.post('/signup',(req,res) => {
  
//     const signedUser=new signUpTemplateCopy({
//         fullname:req.body.fullname,
//         username:req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//     })
//     signedUser.save()
//     .then(data=>{
//         res.json(data)
//         console.log(data)
//     })
//     .catch(error =>{
//         res.json(error)
//         console.log(error)
//     })

// })

// router.post('/login',(req,res) => {
  
//     const signedUser=new loginModel({
//         username:req.body.username,
//         password:req.body.password,
//     })
//     signedUser.save()
//     .then(data=>{
//         res.json(data)
//         console.log(data)
//     })
//     .catch(error =>{
//         res.json(error)
//         console.log(error)
//     })

// })

//router.get('/users',users.getUsers);
router.route('/users').get(users.getUsers)
//router.get('/:username',users.getSpecifiedUser);
router.route('/specified-user/:username').get(users.getSpecifiedUser);

//router.route('/signup').post(users.signup)
router.route('/delete-login').delete(users.deleteLogin)
router.route('/register').post(users.registerUser)
router.route('/login').post(users.login)
router.get('/account',(req,res) => {
    res.send("<h1>Account</h1>")
})

//api addition
router.route('/addAPI').post(ApiController.upload,ApiController.addApi)
//fetch api records
router.route('/myAPIs').post(ApiController.fetchAPI)
//fetch all APIs
router.route('/fetchAll').get(ApiController.fetchAll)
//fetch specified API
router.route('/fetch-spedified-api').get(ApiController.fetchSpedifiedApi)
//delete an API
router.route('/deleteAPI').post(ApiController.deleteAPI)
//update api
router.route('/updateAPI').patch(ApiController.updateAPI)


//BG remove
router.route('/bg-remove').post(BgRemove.upload,BgRemove.BgRemove)


//const { upload,uploadImage,backupImage} = require('../Controllers/udayController')
//uploadImage,
// router.post('/uday',uploadImage,upload)
//  router.route('/backup').post(uploadImage,backupImage)
// //image upload
const fileController = require('../controllers/fileController')
router.route('/file-upload').post(fileController.upload,fileController.uploadImage)
router.route('/fetch-img').get(fileController.fetchImage)

// router.route('/upload').post(imageController.uploadImage)
module.exports=router