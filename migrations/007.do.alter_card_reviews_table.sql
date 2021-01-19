ALTER TABLE card_reviews
    DROP COLUMN rating
;

ALTER TABLE card_reviews
    ADD COLUMN rating TEXT
;