CREATE TABLE reviews (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER references users(id) NOT NULL,
    set_id INTEGER references sets(id) NOT NULL
);