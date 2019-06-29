DROP TABLE IF EXISTS Stocks;
DROP TABLE IF EXISTS Portfolios;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    userId SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR NOT NULL,
    password VARCHAR, 
    balance INT NOT NULL
);

CREATE TABLE Portfolios (
    portfolioId SERIAL PRIMARY KEY,
    userId INT, 
    FOREIGN KEY (userId) REFERENCES Users(userId),
    name VARCHAR
);

CREATE TABLE Stocks (
    stockId SERIAL PRIMARY KEY,
    tickerSymbol VARCHAR NOT NULL,
    portfolioId INT, 
    FOREIGN KEY (portfolioId) REFERENCES Portfolios(portfolioId),
    buyingPrice INT NOT NULL,
    datePurchased DATE NOT NULL DEFAULT CURRENT_DATE
);