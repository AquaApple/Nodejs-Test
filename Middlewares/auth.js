const JWT = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
           return  res.send("No Token Provided");
        }
        const token = authHeader.split(" ")[1];
        const decode = JWT.verify(token,"1");
        console.log(decode)
        req.user = decode;
        next();
    }catch(err){
      res.send(err.message);
    }
    
}

module.exports = { authMiddleware } 