import express from "express"
import { getAllBooks, getBookById, addBook } from "./services/bookservice"

const app = express()
const port = 3000

app.use(express.json())

app.get("/books", async (req, res) => {
    res.json(await getAllBooks())
})

app.get("/books/:id", async (req, res) => {
    const id = Number(req.params.id)
    const book = await getBookById(id)

    if (!book) {
        return res.status(404).send("Book not found")
    }

    res.json(book)
})

app.post("/books", async (req, res) => {
    const book = await addBook(req.body)
    res.status(201).json(book)
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})







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
