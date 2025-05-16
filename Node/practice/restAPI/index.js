const users = require("./MOCK_DATA.json");
const fs = require("fs");
const express = require("express");
const { json, arrayBuffer } = require("stream/consumers");
const app = express();
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));

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
    return res.json(users);
})

// Adding New User
app.post("/api/users", (req, res) => {
    //  CREATE NEW USER
    users.push({ id: users.length + 1, ...req.body });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
        if (error) {
            response = `Unable to add the user: ${error}`;
            return res.send(response);
        }
        response = `User saved successfully! with id ${users.length}`;
        return res.send(response);
    });
})

app.route("/api/users/:x")
    .get((req, res) => {
        const x = Number(req.params.x);

        const index = searchIndex(users, x);
        if (index === -1)
            return res.send(`There is no any user with id ${x}`);
        else
            return res.send(users[index]);
    })
    .patch((req, res) => {
        const x = Number(req.params.x);
        const user = { "id": x, ...req.body };
        let index = searchIndex(users, x);
        if (index === -1)
            return res.send(`User not found ! Invalid Id ${x}`);

        users[index] = user;
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
            return res.send("User not found !");

        users.splice(index, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
            if (error)
                res.send(`Unable to add the user: ${error}`);
            res.send(`User  with id ${x} deleted successfully!`);
        });
    })


app.listen(PORT, console.log("Request initiated to fetch the user data"));