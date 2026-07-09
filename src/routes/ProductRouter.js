import { Router } from "express";
import { products } from "../utils/data.js";


const router = Router();


router.get('/api/products',(req,res)=>{

        req.session.visited=true;  //setting a value in session to create session 
        //Query Params(?query=val)
        const {query,val} = req.query;
        if(query && val){
            const reqProd = products.filter((product)=>product[query].includes(val));
            return res.send(reqProd);
        }

        res.send(products)
})


router.get('/api/products/:id',(req,res)=>{
    const _id=parseInt(req.params.id); //it contains NaN if it is other than number
    if(isNaN(_id)){
        return res.status(400).send("Id should be number, Enter valid Id")
        //return is optional, here it is used to prevent executing the upcoming stuffs
    }
    const reqProd=products.find((product)=> product.id===_id);
    
    if(reqProd){ // if the user i
        res.send(reqProd);
    }

    res.status(404).send("User not found");
    
})

export default router