create table if not exists entities (
    id uuid primary key not null,
    type entity_type,
    name text not null,
    description text,
    notes text,
    image text,
    isfavourite boolean default false,
    modifieddate bigint,
    incampaign uuid not null references campaigns(id) on delete cascade
)