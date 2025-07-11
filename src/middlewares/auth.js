const adminauth=(req,res,next)=>{
    let token="xyz"
    if(token==="xyz"){
        console.log("admin is verified here");
        
        next();
    }
    else{
        res.status(401).send("error 401 bad request");
    }
}
const userauth=(req,res,next)=>{
    let token=req.body?.token;
    if(token=="xyz"){
        next();
    }
    else{
        res.status(401).send("error 401 bad request");
    }
}

module.exports={
adminauth,
userauth,
}