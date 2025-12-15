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

// ค้นหาหนังสือทั้งหมด
export async function getAllBooks(): Promise<Book[]> {
    return books;
}

// ค้นหาตาม id
export async function getBookById(id: number): Promise<Book | undefined> {
    return books.find((book) => book.id === id);
}

// ค้นหาชื่อขึ้นต้น
export async function getBookByTitlePrefix(
    title: string
): Promise<Book[]> {
    return books.filter((book) =>
        book.title.toLowerCase().startsWith(title.toLowerCase())
    );
}

// เพิ่ม / แก้ไขหนังสือ
export async function addOrUpdateBook(newBook: Book): Promise<Book> {
    if (!newBook.id) {
        newBook.id = books.length + 1;
        books.push(newBook);
        return newBook;
    }

    const index = books.findIndex((b) => b.id === newBook.id);

    if (index !== -1) {
        books[index] = { ...books[index], ...newBook };
        return books[index];
    }

    books.push(newBook);
    return newBook;
}
