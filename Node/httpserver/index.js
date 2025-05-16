const http = require("http");
const fs = require("fs");
const me = require("../Biodata/bio");
const url = require("url");


const myserver = http.createServer((request, response) => {
    if(request.url === '/favicon.ico')
        return response.end();

    const data = `${Date.now()} : ${request.method} ${request.url} new request received \n`;
    const myURL = url.parse(request.url,true);
    console.log(myURL);
        fs.appendFile('./logs.txt', data, (err) => {
            if (err) console.log("Failed to append data ", err.name);
            else console.log("Log added successfully");
        })

    switch (myURL.pathname) {
        case '/':
            response.end("Homepage");
            break;
        case '/about':
            const qp = myURL.query;
            if("user" in qp)
                response.end(qp.user);
            response.end(me.bio.full_name());
            break;
        case '/contact':
            response.end(`${me.phone_no}`);
            break;
        case '/search':
            const search = myURL.query.search_query
            response.end(search);
            break;
        default:
            response.end("Error 404 page not found");
    }

});

try {
    myserver.listen(8000, () => console.log("Server Started on port 8000"));
} catch (error) {
    console.log("Failed to reach server ", error)
}