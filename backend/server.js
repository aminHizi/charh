
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const extractPdf =require("./rag/extraction.js") ;
const fs = require("fs");
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
  res.status(201).json({
    id: req.file.name,
    name: req.file.originalname,
    size: req.file.size,
    status: "processing",
  });
  extractPdf(req.file.path).then(({ totalPages, pages }) => {
    console.log("pages:", totalPages);
    console.log("page 1:", pages[0].slice(0, 500));           // first 500 characters
  
  fs.writeFileSync(
  `texts/${req.file.name}.json`,
  JSON.stringify({ sourceId: req.file.name, name: req.file.originalname, totalPages, pages })
);
});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
