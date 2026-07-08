import { Router } from "express";
import { users } from "../utils/data.js";
import { InputValidationSchema } from "../utils/InputValidationSchema.js";
import {checkSchema,validationResult,matchedData} from 'express-validator'
import { getUserIndexById } from "../utils/middlewares.js";




const router = Router();

router.get('/api/users',(req,res)=>{

        //Query Params(?query=val)

        //Here we are gonna use cookie to check if the user is Admin
        //users details are sent only if it is Admin

        //console.log(req.signedCookies) the value in cookie

        if(req.signedCookies.user && req.signedCookies.user==="Admin"){
            const {query,val} = req.query;
            if(query && val){
                const reqUser = users.filter((user)=>user[query].includes(val));
                return res.send(reqUser);
            }

            return res.send(users)
        }else{
            res.send("user must be Admin !")
        }

        
})

//Route params (/:id)
router.get('/api/users/:id',(req,res)=>{
    const _id=parseInt(req.params.id); //it contains NaN if it is other than number
    if(isNaN(_id)){
        return res.status(400).send("Id should be number, Enter valid Id")
        //return is optional, here it is used to prevent executing the upcoming stuffs
    }
    const reqUser=users.find((user)=> user.id===_id);
    
    if(reqUser){ // if the user i
        return res.send(reqUser);
    }

    return res.status(404).send("User not found");
    
})

//POST

// This is a validator to check the input
// Input request >> validation schema >> checks each condition >> response Handler
router.post('/api/users',checkSchema(InputValidationSchema),(req,res)=>{
    
    //Getting the result of validation, basically it contains error message and stuff
    const result = validationResult(req)  
    //if it contains any error then it is displayed  
    if(!result.isEmpty()){
        return res.status(400).send(result);
    }
    //matchedData contains only the fields which satisfies all conditions
    const body = matchedData(req);         

    const postedUser = {id:users[users.length-1].id+1,...body};
    users.push(postedUser);

    
    res.status(201).send(req.body);
})

//PUT - COMPLETE UPDATE 

router.put('/api/users/:id',getUserIndexById,(req,res)=>{

    const {userIndex}=req;
    const {body}=req;
    

    users[userIndex]={id:userIndex,...body};

    res.send(users);

})

//PATCH - BOTH COMPLETE & SPECIFIC UPDATE CAN BE DONE

router.patch('/api/users/:id',getUserIndexById,(req,res)=>{ //we are using middleware(getUserIndexById)

    const {userIndex}= req;

    const {body}= req;

    users[userIndex]={...users[userIndex],...body};

    res.send(users);

})


//DELETE 
router.delete('/api/users/:id',getUserIndexById,(req,res)=>{

    const userIndex=req.userIndex;
    users.splice(userIndex,1);
    res.sendStatus(200);
})

export default router;