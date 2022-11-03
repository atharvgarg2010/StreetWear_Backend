var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Atharvisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    else if (token ==="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MTVkMDA0MDNlZjRmYmNjNDNiMDY4In0sImlhdCI6MTY2NTIyODY1NH0.t8BhokE7VAuj7MoGXwW20mnmdzDpJI96ICfk_UfByMM") {
        try {
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ error: "Please authenticate using a valid token" })
        }
    }else{
        res.status(401).send({ error: "Chalaja Be" })

    }
    

}


module.exports = fetchuser;