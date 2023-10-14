const validation = (schema)=>{
    let joiValidation=(req,res,next)=>{
        let (error) = schema.vadate(req.body,{abortEarly:false});
        console.log(error);
        if(error){
            let{details}=error;
            res.status(422).json({error:details});
        }else{
            next();
        }
    }
    return joiValidation;
};
module.exports = validation;