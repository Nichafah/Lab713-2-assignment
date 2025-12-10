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

// GET /books (search by title prefix)
app.get("/books", (req: Request, res: Response) => {
    const titleQuery = req.query.title as string;

    if (titleQuery) {
        // ค้นหาชื่อที่ขึ้นต้นด้วยคำค้นแบบไม่สนตัวพิมพ์เล็กใหญ่
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().startsWith(titleQuery.toLowerCase())
        );
        res.json(filteredBooks);
    } else {
        // ถ้าไม่ส่ง query parameter ให้คืนทั้งหมด
        res.json(books);
    }
});




// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
