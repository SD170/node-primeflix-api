const jwt = require('jsonwebtoken');

//these are the middleware func...we can add it to routes To be protected.
//when the user logges in...a token is generated...and in each private route its gets checked

const authenticate = function(req,res,next) {
    const token = req.header('auth-token');
    if(!token)
        res.status(401).send({'message':'Access Denied'});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);   //verified is a payload with _id and lat
        req.user = verified;    //normally value of req.user is undefined...now 
        next(); //do the next things
        
    } catch (err) {
        res.status(400).send({'message':'Invalid Token'})
    }
}

module.exports = {authenticate:authenticate};