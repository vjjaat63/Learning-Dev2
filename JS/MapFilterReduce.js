// map

const arr =  [1,2,3,4,5,6,7]

function circumference (x){
    return Math.PI*2*x;
}
const diameter = arr.map(circumference)
const area = arr.map( (x) => Math.PI*x*x)
const binary = arr.map( (x) => x.toString(2))
console.log(diameter)
console.log(area)
console.log(binary)

// filter

const num = [1,2,3,4,5,6,7,8,9,10]

function Odd(x){
    return x%2==1;
}
const odd = num.filter(Odd)
console.log(odd)
const even = num.filter( (x) => x%2==0)
console.log(even)

// reduce > return a single value out of the whole array i.e. sum,max,min,product

const coll = [1,2,3,4,5,6,7]

// acc is ininial / starting value or base case and curr is curr value of each iteration
// let total = coll.reduce( (acc,curr) => acc+=curr)
let total = coll.reduce((acc, curr) => {
  acc += curr;
  return acc;
},0);
console.log(total)

let maxi = coll.reduce((acc,curr)=>{
    if(curr>acc) 
        acc = curr
    return acc
},0)
console.log(maxi)
