import express from 'express';



// innitialize express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));