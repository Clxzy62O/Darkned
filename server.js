const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public")); // serve HTML, CSS, JS

const FLAGS_FILE = path.join(__dirname, "public", "flags.json");

// Helper to read flags
function readFlags() {
  try {
    const data = fs.readFileSync(FLAGS_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
}

// Helper to write flags
function writeFlags(flags) {
  fs.writeFileSync(FLAGS_FILE, JSON.stringify(flags, null, 2));
}

// Get all flags
app.get("/flags", (req, res) => {
  const flags = readFlags();
  res.json(flags);
});

// Add a new flag (Owner only)
app.post("/flags", (req, res) => {
  const { code, title, description } = req.body;
  if (code !== "OwnerCodeHere")
    return res.status(403).json({ error: "Not authorized" });
  if (!title || !description)
    return res.status(400).json({ error: "Missing title or description" });

  const flags = readFlags();
  flags.push({ title, description });
  writeFlags(flags);
  res.json({ success: true });
});

// Delete a flag by index (Owner only)
app.delete("/flags/:index", (req, res) => {
  const { code } = req.body;
  const idx = parseInt(req.params.index);
  const flags = readFlags();

  if (code !== "OwnerCodeHere")
    return res.status(403).json({ error: "Not authorized" });
  if (isNaN(idx) || idx < 0 || idx >= flags.length)
    return res.status(400).json({ error: "Invalid index" });

  flags.splice(idx, 1);
  writeFlags(flags);
  res.json({ success: true });
});

// ✅ Important change for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
