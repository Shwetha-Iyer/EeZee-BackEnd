const express = require("express");
const router = express.Router();
const {COLLECTION_NAME} = require("../helpers/environment");
const {objectId} = require("../helpers/connection");
const find_doc = require("../controllers/find_doc");
const modifyfield = require("../controllers/modifyfield");
router.put("/deleteinvoice/:id",async(req,res)=>{
    try{
        let checkuser = await find_doc(COLLECTION_NAME,{_id:objectId(req.params.id)});
        if(checkuser){
            await modifyfield(COLLECTION_NAME,"pull","_id",objectId(req.params.id),{invoice:{invoice_id:req.body.invoice_id}});
            res.status(200).send("Invoice Deleted");
        }
        else{
            res.status(404).send("User not found");
        }
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;