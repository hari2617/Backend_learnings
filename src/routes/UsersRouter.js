import { Router } from "express";
import { users } from "../utils/data.js";
import { InputValidationSchema } from "../utils/InputValidationSchema.js";
import {checkSchema,validationResult,matchedData} from 'express-validator'
import { getUserIndexById } from "../utils/middlewares.js";
import { User } from "../schema/user.js";





const router = Router();

router.get('/api/users', async(req,res)=>{

        //Query Params(?query=val)

        //Here we are gonna use cookie to check if the user is Admin
        //users details are sent only if it is Admin

        //console.log(req.signedCookies) the value in cookie

        if(req.signedCookies.user && req.signedCookies.user==="Admin"){ // visit '/' to create a cookie
            const {query,val} = req.query;
            if(query && val){
                // const reqUser = users.filter((user)=>user[query].includes(val));
                // return res.send(reqUser);

                try{
                    const getUserFromDB = await User.find({
                        [query]:{$regex:val,$options:'i'}
                    })

                    return res.send(getUserFromDB)
                }
                catch(err){
                    console.log(err);
                    return res.status(401).send("Error occurs")
                }

                
            }

            try{
                const allUsers=await User.find()
                return res.send(allUsers)
            }
            catch(err){
                console.log(err)
                return res.status(401).send("Error occurs")
            }
            
        }else{
            res.send("user must be Admin !")
        }

        
})

//Route params (/:id)
router.get('/api/users/:id',async(req,res)=>{
    const id=req.params.id; //it contains NaN if it is other than number
    // if(isNaN(id)){
    //     return res.status(400).send("Id should be number, Enter valid Id")
    //     //return is optional, here it is used to prevent executing the upcoming stuffs
    // }
    // const reqUser=users.find((user)=> user.id===_id);

        try{
            const getUserFromDbByID =await User.findOne({
                _id:id
            })
            if(getUserFromDbByID){ // if the user i
                return res.send(getUserFromDbByID);
            }
        }
        catch(err){
            console.log(err)
            res.status(401).send("User with this Id is not found")
        }
        
        return res.status(404).send("User not found");
    
})

//POST

// This is a validator to check the input
// Input request >> validation schema >> checks each condition >> response Handler
router.post('/api/users',checkSchema(InputValidationSchema), async(req,res)=>{
    
    //Getting the result of validation, basically it contains error message and stuff
    const result = validationResult(req)  
    //if it contains any error then it is displayed  
    if(!result.isEmpty()){
        return res.status(400).send(result);
    }
    //matchedData contains only the fields which satisfies all conditions
    const body = matchedData(req);         

    // const postedUser = {id:users[users.length-1].id+1,...body};
    // users.push(postedUser);

    try{
        const newuser = new User(body);
        const savedUser = await newuser.save();
        res.status(201).send(savedUser);
    }
    catch(err){
        console.log(err)
        res.status(400).send("User not added")
    }

})

//PUT - COMPLETE UPDATE 

router.put('/api/users/:id',/*getUserIndexById,*/ async(req,res)=>{

    const {userIndex}=req;
    const {body}=req;
    const id=req.params.id; 
    

    // users[userIndex]={id:userIndex,...body};
    try{
        
        const updatedUser = await User.findByIdAndUpdate(
            id, //id to be found
            body, // data to be changed
            { new: true }  //return the updated data so new:true
            
        )
        res.send(updatedUser);
    }
    catch(err){
        console.log(err);
        res.status(400).send("Unable to Update")
    }


})

//PATCH - BOTH COMPLETE & SPECIFIC UPDATE CAN BE DONE

router.patch('/api/users/:id',/*getUserIndexById,*/ async(req,res)=>{ //we are using middleware(getUserIndexById)

    //const {userIndex}= req;

    const {body}= req;
    const id=req.params.id

    // users[userIndex]={...users[userIndex],...body};

    try{
       
        const updatedUser = await User.findByIdAndUpdate(
            id, //id to be found
            body, // data to be changed
            { new: true }  //return the updated data so new:true
            
        )
        return res.send(updatedUser);
    }
    catch(err){
        console.log(err);
        return res.status(400).send("Unable to Update")
    }


})


//DELETE 
router.delete('/api/users/:id',/*getUserIndexById,*/ async(req,res)=>{

   // const userIndex=req.userIndex;
    //sers.splice(userIndex,1);

    const id=req.params.id

    try{
        const updatedAfterDel = await User.findByIdAndDelete(
            id
        )
    }
    catch(err){
        console.log(err);
        res.status(400).send("Cannot delete the item")
    }
    res.sendStatus(200);
})

export default router;