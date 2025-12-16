import { query } from "../db"
import type Book from "../models/book"

export async function getAllBooks(): Promise<Book[]> {
    const result = await query("SELECT * FROM books ORDER BY id")
    return result.rows
}

export async function getBookById(id: number): Promise<Book | null> {
    const result = await query(
        "SELECT * FROM books WHERE id = $1",
        [id]
    )
    return result.rows[0] ?? null
}

export async function addBook(book: Omit<Book, "id">): Promise<Book> {
    const result = await query(
        `INSERT INTO books (title, author_name, description, "group")
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [book.title, book.author_name, book.description, book.group]
    )
    return result.rows[0]
}


