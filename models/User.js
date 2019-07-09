const db = require('../db/dbConfig');
const User = {};

User.findByEmail = email => {
    return db.oneOrNone(`SELECT * FROM users WHERE email=$1`,[email]);
}

User.findBySession = sessionToken => {
    return db.one(`SELECT * from users WHERE sessionToken=$1`, [sessionToken]);
}

User.create = user => {
    return db.one(`INSERT INTO users (name,email,password,balance,sessionToken,sessionExpiry) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[user.name, user.email, user.password, user.balance, user.sessionToken, user.sessionExpiry])
}

User.setNewSessionToken = session => {
    return db.one(`UPDATE users SET sessionToken=$1, sessionExpiry=$2 WHERE userId=$3 RETURNING *`, [session.sessionToken, session.sessionExpiry, session.userId]);
}

User.removeSessionToken = userid => {
    return db.none(`UPDATE users SET sessionToken=NULL, sessionExpiry=NULL where userId=$1`, [userid]);
}

User.updateBalance = update => {
    return db.one(`UPDATE users SET balance=$1 where userId=$2 returning *`, [update.balance, update.userId])
}

module.exports = User;