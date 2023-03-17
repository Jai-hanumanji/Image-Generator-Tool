const express=require("express");
const {generateImage} =require('../controllers/openaiController');
const router=express.Router();

router.post('/generateimage',generateImage); //middleware

module.exports=router;