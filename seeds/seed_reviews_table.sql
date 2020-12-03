BEGIN;

TRUNCATE
  users,
  reviews,
  card_reviews  
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, password)
VALUES
  ('dunder', '$2a$12$z0u7H3yrQTbfxhv55C0JleoQFXK5uvZ2wqKUqqV3NsOBcfZ9B5NOW'),
  ('b.deboop', '$2a$12$U6TplukfN6js3rmm90DwFuKzayxbQ/wKckLCqkFZoiqloPW/1UwWa'),
  ('c.bloggs', '$2a$12$Aa7x/0x3XDU5XiqF7byj3eiFDD63jy5mmLWbh5tINvF/zWMktVPBW'),
  ('s.smith', '$2a$12$dahEoDZZ21FV4Z3xBjw5Xeki1fVfWZIFmvdipXlS5/o5pRa2kbdtO'),
  ('lexlor', '$2a$12$JSCRiCJexxcp/a.R9.432OBiKMSTfthP27APem/cW3iXIota0GapC'),
  ('wippy', '$2a$12$mWXM5jGoOla3qf0O/D4UL..swbYT3S/pK9hVOtJsu8e7j72rhMGuK');

INSERT INTO reviews (user_id, set_id)
VALUES
  (1, 1);


COMMIT;
