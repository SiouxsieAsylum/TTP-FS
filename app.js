const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();


const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const StockRouter = require('./routes/stockRoutes');
const PortfolioRouter = require('./routes/portfolioRoutes');
const UserRouter = require('./routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(PORT + ' is open');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.use('/api/user', UserRouter);
app.use('/api/portfolio', PortfolioRouter);
app.use('/api/stocks', StockRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    res.send('ay yo ma')
});

app.use('*', (req, res) => {
  res.status(400).send('nah')
});
