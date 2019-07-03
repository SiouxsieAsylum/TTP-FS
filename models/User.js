const db = require('../db/dbConfig');
const User = {};

User.findByEmail = email => {
    return db.oneOrNone(`SELECT * FROM users WHERE email=$1`,[email])
}

User.create = user => {
    return db.one(`INSERT INTO users (name,email,password,balance) VALUES ($1,$2,$3,$4) RETURNING *`,[user.name, user.email, user.password, user.balance])
}

// balance calculation will be performed client-side
User.updateBalance = balance => {
    return db.one(`UPDATE users SET balance=$1 where userId=$2 returning *`, [user.balance, user.id])
}



export default User;