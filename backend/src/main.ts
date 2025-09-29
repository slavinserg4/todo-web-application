import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/hello", (req, res) => {
    res.json({ message: "Привіт, світе! 🇺🇦" });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Сервер запущено на порту ${port}`);
});
