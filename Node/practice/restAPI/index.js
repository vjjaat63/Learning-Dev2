const users = require("./MOCK_DATA.json");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false })); // middleware

app.use((req, res, next)=>{
    fs.appendFile("log.txt", `${(new Date()).toLocaleString()} | ${req.method} | ${req.path}\n`, (err) => {
        if(err) console.log("Failed to log the request!");
    });
    next();
})

function searchIndex(users, x) {
    for (let i = 0; i < users.length; i++)
        if (users[i].id === x)
            return i;

    return -1;
}

// Homepage
app.get("/", (req, res) => {
    return res.send("Welcome to the homepage!")
})

// All Users
app.get("/api/users", (req, res) => {
    res.setHeader("X-Creater","Vishal Singh Jhajhria")
    return res.json(users);
})

// Adding New User
app.post("/api/users", (req, res) => {
    //  CREATE NEW USER
    const body = req.body;
if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.skill || !body.education)
    return res.status(400).send("All fields are required .");
    
users.push({ id: users.length + 1, ...body });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
        if (error) {
            response = `Unable to add the user: ${error}`;
            return res.send(response);
        }
        response = `User saved successfully! with id ${users.length}`;
        return res.status(201).send(response);
    });
})

app.route("/api/users/:x")
    .get((req, res) => {
        const x = Number(req.params.x);

        const index = searchIndex(users, x);
        if (index === -1)
            return res.status(404).send(`User not found`);
        else
            return res.send(users[index]);
    })
    .patch((req, res) => {
        const x = Number(req.params.x);
        const body = req.body;

        let index = searchIndex(users, x);
        if (index === -1)
            return res.status(404).send(`User not found`);

        const user = {...body , ...users[index]};
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
            if (error)
                return res.send(`Unable to udate the user's data: ${error}`);
            return res.send(`User with id ${x} updated successfully!`);
        });
    })
    .delete((req, res) => {
        //  DELETE USER
        let x = Number(req.params.x);

        let index = searchIndex(users, x);
        if (x === -1)
            return res.status(404).send(`User not found`);
        
        users.splice(index, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
            if (error)
                res.send(`Unable to add the user: ${error}`);
            res.send(`User  with id ${x} deleted successfully!`);
        });
    })


app.listen(PORT, console.log("Request initiated to fetch the user data"));