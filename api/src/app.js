import express from 'express';
import apiRoutes from './routes/api.routes.js'; 
const app = express();  

//middlewares
app.use(express.json()); // ->entiende los jsons

app.use('/api',apiRoutes)

export default app;