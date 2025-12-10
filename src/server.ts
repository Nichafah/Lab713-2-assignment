import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json());

interface Book {
    id: number;
    title: string;
    author_name: string;
    description: string;
    group: string;
}

const books: Book[] = [
    {
        id: 1,
        title: "Clean Code",
        author_name: "Robert C. Martin",
        description: "A handbook of agile software craftsmanship",
        group: "Programming",
    },
    {
        id: 2,
        title: "Atomic Habits",
        author_name: "James Clear",
        description: "How to build good habits",
        group: "Self-Improvement",
    },
];

// GET /books (search by title prefix)
// app.get("/books", (req: Request, res: Response) => {
//     const titleQuery = req.query.title as string;
//
//     if (titleQuery) {
//         // ค้นหาชื่อที่ขึ้นต้นด้วยคำค้นแบบไม่สนตัวพิมพ์เล็กใหญ่
//         const filteredBooks = books.filter(book =>
//             book.title.toLowerCase().startsWith(titleQuery.toLowerCase())
//         );
//         res.json(filteredBooks);
//     } else {
//         // ถ้าไม่ส่ง query parameter ให้คืนทั้งหมด
//         res.json(books);
//     }
// });


app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find((b) => b.id === id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});
app.post("/books", (req, res) => {
    const newBook = req.body;

    // เช็คว่ามี id ส่งเข้ามาไหม
    if (!newBook.id) {
        // ถ้าไม่มี id ให้สร้างใหม่เป็น running number
        newBook.id = books.length + 1;
        books.push(newBook);
        return res.json({ message: "Book added", book: newBook });
    }

    // ถ้ามี id ให้เช็คว่ามีในระบบไหม
    const index = books.findIndex((b) => b.id === newBook.id);

    if (index !== -1) {
        // update ข้อมูล
        books[index] = { ...books[index], ...newBook };
        return res.json({ message: "Book updated", book: books[index] });
    } else {
        // ถ้า id ไม่มี → เพิ่มใหม่
        books.push(newBook);
        return res.json({ message: "Book added with provided id", book: newBook });
    }
});



// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
