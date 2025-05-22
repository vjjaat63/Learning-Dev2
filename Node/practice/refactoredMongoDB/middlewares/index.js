const fs = require("fs");

function logReqRes(filename){
    return ((req, res, next)=>{
        fs.appendFile("log.txt", `${(new Date()).toLocaleString()} | ${req.method} | ${req.path}\n`, (err) => {
            if(err) console.log("Failed to log the request!");
        });
        next();
    })

}

module.exports = {
    logReqRes
}