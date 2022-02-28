const express = require("express");
const NewApiModel = require("../Models/NewApiModel");
const asyncHandler = require("express-async-handler");
const { findOne } = require("../Models/loginModel");
const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req,file,callback)=>{
  const ext = file.mimetype.split('/')[1]   
  if(ext !== "jpeg" && ext !== "jpg" && ext !== "png")
  { 
      console.log("########################")
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


// const storage = multer.diskStorage({
//   destination:path.join(__dirname,'../public/','uploads'),
//   filename:(req,file,callback)=>{
//       callback(null,Date.now()+'-'+file.originalname)
//   }
// })


//Add api
const addApi = asyncHandler(async (req, res) => {
  console.log("Add API called")
  const { apiName, apiEndPoint, description, public, author } = req.body;
  const api = await NewApiModel.findOne({ apiName: apiName });
  if (api) {
    res.status(201).json({
      message: "API already Exists",
    });
  } else {
    //const filename = req.file.originalname.split('.')[0]+Date.now()+"."+req.file.mimetype.split('/')[1];
    const createApi = await NewApiModel.create({
      apiName: apiName,
      apiEndPoint: apiEndPoint,
      description: description,
      public: public,
      author: author,
      image:"hvh",
      file:req.file.buffer
    });
    if (createApi) {
      res.status(200).json({
        _id: createApi._id,
        apiName: createApi.apiName,
        apiEndPoint: createApi.apiEndPoint,
        description: createApi.description,
        public: createApi.public,
        author: createApi.author,
        filename:createApi.image,
        // file:
      });
    } else {
      res.status(500);
      throw new error("Server error or database error");
    }
  }
});

//Fetch all APIs of the given user
const fetchAPI = asyncHandler(async (req, res) => {
  console.log("My APIs called")
  const { author } = req.body;
  const data = await NewApiModel.find({ author: author });
  if (data) {
    

    let z = []
    data.map((xx)=>{
      const newdata=xx.file.toString('base64')
      const y = {
        _id: xx._id,
      apiName:xx.apiName,
      apiEndPoint: xx.apiEndPoint,
      description: xx.description,
      public: xx.public,
      author:xx.author,
      filename:xx.image,
      file:newdata
      }
      z=[...z,y]

    })

    res.status(200).json(z);
  } else {
    res.status(201).json({ message: "No records Found" });
  }
});

//Fetch all APIs for dashboard

const fetchAll = asyncHandler (async(req,res) => {
  console.log("fetch all called")
  const data = await NewApiModel.find();
  if(data){  
    let z = []
    data.map((xx)=>{
      const newdata=xx.file.toString('base64')
      const y = {
        _id: xx._id,
      apiName:xx.apiName,
      apiEndPoint: xx.apiEndPoint,
      description: xx.description,
      public: xx.public,
      author:xx.author,
      filename:xx.image,
      file:newdata
      }
      z=[...z,y]

    })
    res.send(z)
  }
  else{
    res.status(201).json({message:"No records found"})
  }
})
 
//Fetch specified API
const fetchSpedifiedApi = asyncHandler(async(req,res)=>{
  console.log("specified API called")
  const {id} = req.body
  const data = await NewApiModel.find({_id:id})
  if(data)
  {
    let z = []
    data.map((xx)=>{
      const newdata=xx.file.toString('base64')
      const y = {
        _id: xx._id,
      apiName:xx.apiName,
      apiEndPoint: xx.apiEndPoint,
      description: xx.description,
      public: xx.public,
      author:xx.author,
      filename:xx.image,
      file:newdata
      }
      z=[...z,y]
        })    
        res.status(200).json(z)
  }

  else{
    res.status(400)
  }
})

//delete API
const deleteAPI = asyncHandler(async (req, res) => {
  console.log("Delete API called")
  const { apiName } = req.body;
  const data = await NewApiModel.findOne({ apiName: apiName });
  if (data) {
    const isDeleted = await NewApiModel.deleteOne({ apiName: apiName });
    if (isDeleted) {
      res.status(200).json({
        message: "Deleted successfully",
      });
    } else {
      res.status(400);
      throw new Error("Error with database");
    }
  } else {
    res.status(400);
    throw new Error("Record not found "+apiName);
  }
});

//Update API

const updateAPI = asyncHandler(async (req, res) => {
 console.log("Update API called")
  const { prevName, NewName, apiEndPoint, description,public } = req.body;
  const data = await NewApiModel.findOne({ apiName: NewName });
  if (data && prevName !== NewName) {
    res.status(200).json({
      message: "API name already exist , try other one",
    });
  } 
  else {

    const updated = await NewApiModel.updateOne({ apiName: prevName },{
        apiName:NewName,
        apiEndPoint:apiEndPoint,
        description:description,
        public:public
      })
    if(updated){
        // res.status(200).json({
        //     _id:updated._id,
        //     apiName:updated.apiName,
        //     apiEndPoint:updated.apiEndPoint,
        //     description:updated.description

        // })
         res.status(200).json(updated)
    }
    else{
        res.status(400)
        throw new Error("Error with server")
    }
  }
});

exports.upload = upload.single('photo');
exports.addApi = addApi;
exports.fetchAPI = fetchAPI;
exports.deleteAPI = deleteAPI;
exports.updateAPI=updateAPI;
exports.fetchAll=fetchAll;
exports.fetchSpedifiedApi=fetchSpedifiedApi;