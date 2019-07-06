ALTER TABLE portfolios 
    ADD COLUMN isDefault BOOLEAN;

ALTER TABLE users
    ADD CONSTRAINT uniq UNIQUE (email)