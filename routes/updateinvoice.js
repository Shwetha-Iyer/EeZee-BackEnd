const express = require("express");
const router = express.Router();
const {COLLECTION_NAME} = require("../helpers/environment");
const {objectId} = require("../helpers/connection");
const find_doc = require("../controllers/find_doc");
const modifyfield = require("../controllers/modifyfield");
router.put("/updateinvoice/:id",async(req,res)=>{
    try{
        let checkuser = await find_doc(COLLECTION_NAME,{_id:objectId(req.params.id)});
        if(checkuser){
            await modifyfield(COLLECTION_NAME,"invoice",objectId(req.params.id),req.body.final_data.invoice_id,req.body.final_data);
            res.status(200).send("Invoice Updated");
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