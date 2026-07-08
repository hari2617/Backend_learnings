import { users } from "./data.js";


//Middleware to reduce code repitition
export const getUserIndexById =((req,res,next)=>{
    const idx=parseInt(req.params.id);

    if(isNaN(idx)){
        return res.send("Enter valid id!")
    }

    const userIndex=users.findIndex((user)=> user.id===idx);

    if(userIndex==-1){
        res.send("No user found!");
    }

    //storing the userindex in the reques itself to use later
    req.userIndex=userIndex;

    next();
})

