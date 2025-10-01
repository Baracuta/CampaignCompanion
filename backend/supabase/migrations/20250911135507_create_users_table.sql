create table if not exists users (
    id VARCHAR(21) primary key,
    email VARCHAR(100) unique not null,
    name VARCHAR(100)
)