function lesser(x){
    console.log(x)
}

function greater(x){
    console.log(x)
}

let randNum;
let prom = new Promise(function(resolve,reject){
    setTimeout(()=>{
        randNum = Math.floor(Math.random()*100 + 1)
        if(randNum<=50)
            resolve(randNum);
        else
            reject(randNum);
    },1000);
})



prom.then(function(value){
    console.log("The number is less than or equal to 50");
    lesser(value); 
})
.catch(function(value){
    console.log("The number is more than 50");
    greater(value);
})


console.log(prom)