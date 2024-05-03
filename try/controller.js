const { get } = require("./routes");
const pool = require('../db');
const queries = require("./queries");
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');


const getAI = async (req, res) => {
    
    pool.query(queries.getAI, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
});
}

const getAIByContentType = (req, res)=>{
    console.log(req.params);
    console.log("uwu");
    const contentTypeName= req.params.contentTypeName;
    pool.query(queries.getAIByContent, [contentTypeName], (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const postAI = async (req, res)=>{

    const { tool_id, toolName, contentTypeId, ecosystem, freeVersion, licenseType, paidVersion, referenceURL, toolDescription } = req.body;

    const values = [tool_id, toolName, contentTypeId, ecosystem, freeVersion, licenseType, paidVersion, referenceURL, toolDescription];

    pool.query(queries.postAI, values, (error, results)=>{
        if(error) {
            return res.status(400).json({error: error.message});
        }
        res.status(201).json(results.rows[0]);
    });
}

const deleteAI =(req,res)=>{
    console.log(req.params);
    const {tool_id}=req.params;
    pool.query(queries.deleteAI, [tool_id],(error, results)=>{
        if(error) throw error;
        res.status(200).json({message: "AI tool deleted sucesfully or doesn't exist", data:results.rows[0]});
    })
}

const postUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const result = await pool.query(queries.postUser, [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Define token payload based on user role
                const tokenPayload = {
                    userId: user.id,
                    email: user.email,
                    role: user.role
                };

                console.log(`User ${email} authenticated successfully, role: ${user.role}`);
                // Special logic for administrators
                if (user.role === 'Administrator') {
                    tokenPayload.adminAccess = true;  // Special admin claim
                }

                // Generate JWT token using the secret from .env
                const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({
                    message: "Login successful",
                    token: token  // Send the token to the client
                });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            // No user found
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Database error during login:', error);
        return res.status(500).json({ message: 'Database error' });
    }
}


module.exports = 
    {getAI, 
     postAI,
     getAIByContentType,
     deleteAI, 
     postUser
    };