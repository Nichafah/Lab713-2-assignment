import type Book from "../models/book";
import * as repo from "../repository/BookRepositoryDb";

const books: Book[] = [

];


export function getAllBooks(): Promise<Book[]> {
    return repo.getAllBooks();
}

export function getBookById(id: number): Promise<Book | undefined> {
    return repo.getBookById(id);
}

export function addBook(newBook: Book): Promise<Book> {
    return repo.addBook(newBook);
}