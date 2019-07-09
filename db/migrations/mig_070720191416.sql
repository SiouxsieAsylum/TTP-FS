ALTER TABLE users
    ADD COLUMN sessionToken VARCHAR;
ALTER TABLE users
    ADD COLUMN sessionExpiry DATE;