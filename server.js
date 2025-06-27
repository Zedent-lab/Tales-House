const express = require("express");
const app = express();
app.use(express.json());

let votes = [
  { id: 1, name: "Person A", count: 0 },
  { id: 2, name: "Person B", count: 0 },
  { id: 3, name: "Person C", count: 0 },
  { id: 4, name: "Person D", count: 0 },
];

app.get("/api/votes", (req, res) => {
  res.json({ votes });
});

app.post("/api/vote", (req, res) => {
  const { candidate } = req.body;
  const vote = votes.find((v) => v.name === candidate);
  if (vote) {
    vote.count += 1;
    res.json({ message: "Vote submitted successfully!" });
  } else {
    res.status(400).json({ message: "Invalid candidate." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
