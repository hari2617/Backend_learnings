export const InputValidationSchema ={
    name:{
        notEmpty:{
            errorMessage:"Name field must not be empty"
        }
    },

    age:{
        notEmpty:{
            errorMessage:"Age field must not be empty"
        }
    }
};


//Its a schema for validation
//Basically, validator is used to check the incoming input like length,type,non-empty like that
// Here we are defining the conditions which needs to be checked for each field of data sent through post
//there are many default conditions like notEmpty,isEmail,isLength,isInt,.....