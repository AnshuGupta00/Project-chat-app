const jwt =require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization ?  split(' Bearer')[1] : null;
    if(!token) {
        return res.status(403).json({message:"Access denied, no token provided"});
    }

    try{
        const decoded=jwt.vrify(token,process.env.JWT_SECRET);
        req.user=decoded;

        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid token"});
    }
};

module.ecports=verifyToken;