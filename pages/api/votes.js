let votes = [
  { id: 1, name: "Person A", count: 0 },
  { id: 2, name: "Person B", count: 0 },
  { id: 3, name: "Person C", count: 0 },
  { id: 4, name: "Person D", count: 0 },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return the current votes
    res.status(200).json({ votes });
  } else if (req.method === "POST") {
    // Handle voting
    const { candidate } = req.body;
    const vote = votes.find((v) => v.name === candidate);
    if (vote) {
      vote.count += 1;
      res.status(200).json({ message: "Vote submitted successfully!" });
    } else {
      res.status(400).json({ message: "Invalid candidate." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
