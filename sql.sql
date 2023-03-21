CREATE TABLE user_data (
    id SERIAL PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_data BYTEA NOT NULL,
    comments TEXT
);