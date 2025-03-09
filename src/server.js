require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRoutes = require("../src/routes/contactRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.get("/api/test", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "backend test api working perfectly!!!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
