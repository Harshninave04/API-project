const express = require("express");
const users = require("./MOCK_DATA.json");
const port = 9000;
const app = express();

// Routes

app.get("/", (req, res) => res.send("Hello , You're on Homepage!"));

app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
  </ul>  
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
  return res.json({ status: "pending" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
