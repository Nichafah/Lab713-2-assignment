CREATE TABLE books (
                       id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                       title VARCHAR(255),
                       author_name VARCHAR(255),
                       description TEXT,
                       "group" VARCHAR(100)
);
