
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 3000;
// Middleware: parse incoming JSON
app.use(express.json());
app.use(cors());
const upload = multer({ dest: "uploads/" });
// First route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});
app.post("/api/sources", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.status(201).json({
    id:"anything",
    //id: req.file.name,
    //name: req.file.originalname,
    //size: req.file.size,
    //status: "processing",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
