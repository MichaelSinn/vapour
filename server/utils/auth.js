const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
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
        const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWxAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ1c2VybmFtZSIsIl9pZCI6IjYzN2Y5YjBiZDU2Njk4NzM4ZTA4MTgzNSJ9LCJpYXQiOjE2NjkzMDcxNDcsImV4cCI6MTY2OTMxNDM0N30.P_FE2-llmGgvXBcc3hhU5J5p7oZKKPBegKYvChCj2iE';
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
