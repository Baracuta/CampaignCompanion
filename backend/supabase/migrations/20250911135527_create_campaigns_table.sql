create table if not exists campaigns (
    id uuid primary key,
    name text not null,
    players int not null,
    game text,
    userid VARCHAR(21) references users(id) on delete cascade
)