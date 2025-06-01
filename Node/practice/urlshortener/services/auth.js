const jwt = require("jsonwebtoken");
const security = "16x2=8"


function setUser(user){
    const payload = {
        _id : user._id,
        email : user.email,
        role : user.role,
    }

    return jwt.sign(payload,security);
}

function getUser(token){
    if(!token)
        return null;
    try{
        return jwt.verify(token,security)
    }
    catch(error){
        return null;
    }
}

module.exports = {
    setUser,getUser
}