const multer = require('multer')
const path = require('path')
const imageModel = require('../Models/imageModel')

const storage = multer.diskStorage({
    destination:path.join(__dirname,'../public/','uploads'),
    filename:(req,file,callback)=>{
        callback(null,Date.now()+'-'+file.originalname)
    }
})

const uploadImage = async(req,res)=>{
    try {
        let upload = multer({storage:storage}).single('profile')
        upload(req,res,(error)=>{
            if(!req.file){
                res.json({message:"Select an image"})
            }
            else if(error)
            {
                res.json({error:error})
            }
        })
        const data  = {
            image:req.file.filename
        }

        const response = await(imageModel.create(data))
        if(response)
        {
            res.json({message:"successful"})
        }
        else{
            res.json({message:"not uploaded"})
        }
    } catch (error) {
        console.log(error)
    }
}

exports .uploadImage=uploadImage;