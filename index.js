const express = require("express");
const port = 9000;
const app = express();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
