const multer = require('multer')
const imageModel = require('../Models/imageModel')
const storage = multer.memoryStorage();
const asyncHandler = require('express-async-handler')
const fileFilter = (req,file,callback)=>{
    const ext = file.mimetype.split('/')[1]   
    if(ext !== "jpeg" && ext !== "jpg" && ext !== "png")
    {
        callback(new Error("not an image"))   
    }
    else{
        console.log("ext : "+ext)
        callback(null,true)
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
})

const uploadImage = asyncHandler (async (req,res)=>{

        const filename = req.file.originalname.split('.')[0]+Date.now()+"."+req.file.mimetype.split('/')[1];
    
        const data  = await (imageModel.create({
            image:filename,
            file:req.file.buffer
        }))
        if(data){
            //req.file.buffer.toString('base64')
            res.send(req.file)
        }
        else{
            res.send("Error")
        }   
})

const fetchImage = asyncHandler( async(req,res)=>{
    const data = await imageModel.findOne({})
    const newdata = {
        name:data.image,
        buffer:data.file.toString('base64')
    }
    if(data){
        res.send(newdata)
    }
    else{
        res.send("Error")
    }
})




exports.upload = upload.single('photo');
exports.uploadImage = uploadImage;
exports.fetchImage = fetchImage;