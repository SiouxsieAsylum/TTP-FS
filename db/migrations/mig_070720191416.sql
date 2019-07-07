ALTER TABLE users
    ADD COLUMN sessionToken VARCHAR;
    ADD COLUMN sessionExpiry DATE;