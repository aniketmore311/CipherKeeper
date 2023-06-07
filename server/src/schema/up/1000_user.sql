create table users (
    username varchar(255) primary key,
    password varchar(255) not null,
    created_at timestamp not null,
    updated_at timestamp not null
)