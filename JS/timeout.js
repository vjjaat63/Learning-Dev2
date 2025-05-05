console.log("starts")

setTimeout(()=>{
    console.log("set Timeout")
},5000)

console.log("passed set timeout")

let start = new Date().getTime();
let end = start;

while(end < start + 10000){
    end = new Date().getTime();
    console.log("Time Left " , start + 10000 - end)
}

console.log("last line of code")


let arr = [7,14,21,28]
