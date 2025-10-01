create table if not exists player_characters (
    entity uuid primary key not null references entities(id) on delete cascade,
    pc_class text,
    level text,
    player_name text
)