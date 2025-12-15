import express, { Request, Response } from "express";
import type Book from "./models/book";
import {
    getAllBooks,
    getBookById,
    getBookByTitlePrefix,
    addOrUpdateBook,
} from "./services/bookservice";

const app = express();
const port = 3000;

app.use(express.json());

// ---------- Routes ----------

app.get("/", (req: Request, res: Response) => {
    res.send("Book API");
});

// GET /books?title=Clean
app.get("/books", async (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title as string;
        const books = await getBookByTitlePrefix(title);
        res.json(books);
    } else {
        res.json(await getAllBooks());
    }
});

// GET /books/:id
app.get("/books/:id", async (req: Request, res: Response) => {
    // @ts-ignore
    const id = parseInt(req.params.id);
    const book = await getBookById(id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// POST /books (add หรือ update)
app.post("/books", async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    const savedBook = await addOrUpdateBook(newBook);
    res.json(savedBook);
});

// ---------- Start Server ----------

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});





// app.get("/books/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//
//     const book = books.find((b) => b.id === id);
//
//     if (book) {
//         res.json(book);
//     } else {
//         res.status(404).send("Book not found");
//     }
// });
// app.post("/books", (req, res) => {
//     const newBook = req.body;
//
//     // เช็คว่ามี id ส่งเข้ามาไหม
//     if (!newBook.id) {
//         // ถ้าไม่มี id ให้สร้างใหม่เป็น running number
//         newBook.id = books.length + 1;
//         books.push(newBook);
//         return res.json({ message: "Book added", book: newBook });
//     }
//
//     // ถ้ามี id ให้เช็คว่ามีในระบบไหม
//     const index = books.findIndex((b) => b.id === newBook.id);
//
//     if (index !== -1) {
//         // update ข้อมูล
//         books[index] = { ...books[index], ...newBook };
//         return res.json({ message: "Book updated", book: books[index] });
//     } else {
//         // ถ้า id ไม่มี → เพิ่มใหม่
//         books.push(newBook);
//         return res.json({ message: "Book added with provided id", book: newBook });
//     }
// });
//
//
//
// // Start server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
