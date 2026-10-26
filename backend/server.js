
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware: parse incoming JSON
app.use(express.json());

// First route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
