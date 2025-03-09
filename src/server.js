require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRoutes = require("../src/routes/contactRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
