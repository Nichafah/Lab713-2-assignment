import type Book from "../models/book"
import * as db from "../db"

export async function getAllBooks(): Promise<Book[]> {
    const result = await db.query("SELECT * FROM books")
    return result.rows
}

export async function getBookById(id: number): Promise<Book | undefined> {
    const result = await db.query(
        "SELECT * FROM books WHERE id = $1",
        [id]
    )
    return result.rows[0]
}

export async function addBook(book: Book): Promise<Book> {
    const result = await db.query(
        `INSERT INTO books (title, author_name, description, "group")
         VALUES ($1, $2, $3, $4)
             RETURNING *`,
        [
            book.title,
            book.author_name,
            book.description,
            book.group
        ]
    )

    return result.rows[0]
}
