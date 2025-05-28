const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routers/userRouter.js');
const productsRouter = require('./routers/productsRouter.js')

app.use(express.json());
app.use(cors());
app.use('/auth',userRouter);
app.use('/market', productsRouter);


app.get('/',(req,res)=>{
    res.status(201).send("Hey man!")
})

app.listen(process.env.PORT, ()=>{
    console.log('Server has been started');
})