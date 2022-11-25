const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;
const expiration = '2h';

module.exports = {
    authMiddleware: function ({req}) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }
        const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWxAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ1c2VybmFtZSIsIl9pZCI6IjYzN2ZjNDA1Y2JmMjMxZTE5NGUyOWVlZSJ9LCJpYXQiOjE2NjkzODkxNTcsImV4cCI6MTY2OTM5NjM1N30.kFt-P5YxNwvfsG8kqXcqVJ3i8TIYpuRlUF8L3lOlgrs';
        try {
            const {data} = jwt.verify(testToken, secret, {maxAge: expiration});
            req.user = data;
        } catch (e) {
            console.log(e);
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({email, username, _id}) {
        const payload = {email, username, _id};
        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
};
