const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend/public/index.html"));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});
