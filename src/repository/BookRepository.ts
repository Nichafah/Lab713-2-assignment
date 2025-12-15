import type Book from "../models/book";

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

export function getAllBooks(): Promise<Book[]> {
    return Promise.resolve(books);
}

export function getBookById(id: number): Promise<Book | undefined> {
    return Promise.resolve(books.find((b) => b.id === id));
}

export function addBook(newBook: Book): Promise<Book> {
    newBook.id = books.length + 1;
    books.push(newBook);
    return Promise.resolve(newBook);
}
