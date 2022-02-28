const multer = require('multer')
const FormData = require('form-data')
const storage = multer.memoryStorage()
const axios = require('axios')
const fileFilter = (req,file,callback)=>{
 
    const ext = file.mimetype.split('/')[1]
    if(ext != 'jpg' && ext != 'jpeg' && ext != 'png'){
        callback(null,false)
    }
    else{
        callback(null,true)
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
})

const BgRemove = (req,res)=>{
    console.log("bg remove called")
    const formData = new FormData();
    formData.append('size', 'auto');

    formData.append('image_file',req.file.buffer);

    axios({
      method: 'post',
      url: process.env.BG_URL,
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': process.env.API_KEY,
      },
      encoding: null
    })
    .then((response) => {
      if(response.status != 200) 
      return console.error('Error:', response.status, response.statusText);
       res.send(response.data.toString('base64'));
       })
    .catch((error) => {
        return console.error('Request failed:', error);  
    });
}
exports.BgRemove = BgRemove
exports.upload = upload.single('photo')