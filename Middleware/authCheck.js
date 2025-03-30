const jwt = require('jsonwebtoken');

//authCheck is used to check if the user is authenticated to access the route
const authCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ 
                message: 'Unauthorized',
                error: 'No token provided'
            });
        }
        //bearer token
        //split is used to remove the bearer from the token
        //(' ') is used to split the token into an array
        //[1] is used to get the token from the array
        //if i put [0] it will return the bearer
        // const token1 = token.split(' ')[1];
        // console.log(token1);


        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ 
                message: 'Unauthorized',
                error: 'Invalid token'
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: 'Unauthorized',
            error: error.message
        });
    }
}

module.exports = authCheck;