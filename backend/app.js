const express = require("express");
const path = require("path");
const movie_routes = require("./routes/movie.routes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend/public")));

app.use("/api", movie_routes.router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend/public/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
