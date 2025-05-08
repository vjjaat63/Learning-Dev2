console.log("first line")

async function calling() {
    console.log("in async funtion")
}

setTimeout(calling,1000)

console.log("last line")