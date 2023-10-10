const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const port = 9000;
const app = express();

//middleware plugin
app.use(express.urlencoded({ extended: false }));

// Routes

app.get("/", (req, res) => res.send("Hello , You're on Homepage!"));

app.get("/users", (req, res) => {
  const html = `
  <ol>
    ${users.map((users) => `<li>${users.first_name}</li>`).join("")}    
  </ol>  
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

//Here we want the data of particular ID we enter :
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// app route -> here route is same for get, patch and delete. That's why we used .route
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // Edit user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // Delete user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 }); // In the body we are pushing the id with the continuous number
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
