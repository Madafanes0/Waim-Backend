require('dotenv').config();
const cors= require('cors');

const express= require('express');
const app= express();
const tryRoutes= require('./try/routes');

app.use(express.json());
app.use(cors());
const PORT= process.env.PORT || 3050;

app.use('/api', tryRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});