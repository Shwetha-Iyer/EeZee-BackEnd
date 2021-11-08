const express = require("express");
const router = express.Router();
const {COLLECTION_NAME} = require("../helpers/environment");
const {objectId} = require("../helpers/connection");
const find_doc = require("../controllers/find_doc");
const modifyfield = require("../controllers/modifyfield");
const uniqid = require("uniqid");
router.put("/createinvoice/:id",async(req,res)=>{
    try{
        let checkuser = await find_doc(COLLECTION_NAME,{_id:objectId(req.params.id)});
        if(checkuser){
            req.body.final_data.invoice_id=uniqid();
            await modifyfield(COLLECTION_NAME,"update","_id",objectId(req.params.id),{invoice:req.body.final_data});
            res.status(200).send("Invoice Added");
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