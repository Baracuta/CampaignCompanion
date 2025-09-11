create table if not exists locations (
    entity uuid primary key not null references entities(id) on delete cascade,
    maps text[]
)