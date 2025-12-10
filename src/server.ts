import express, { Request, Response } from "express";
const app = express();
const port = 3000;

interface Book {
    title: string;
    author_name: string;
    description: string;
    group: string;
}

const books: Book[] = [
    {
        title: "Clean Code",
        author_name: "Robert C. Martin",
        description: "A handbook of agile software craftsmanship",
        group: "Programming",
    },
    {
        title: "Atomic Habits",
        author_name: "James Clear",
        description: "How to build good habits",
        group: "Self-Improvement",
    },
];

// GET /books
app.get("/books", (req: Request, res: Response) => {
    res.json(books);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
