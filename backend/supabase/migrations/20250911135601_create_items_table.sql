create table if not exists items (
    entity uuid primary key not null references entities(id) on delete cascade,
    effect text,
    category text
)