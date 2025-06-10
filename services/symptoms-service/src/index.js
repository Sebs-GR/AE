import express from 'express';
import 'dotenv/config';
import cors from 'cors'; // <-- ¡Añade esta línea!
import connectDB from './config/database.js';
import symptomLogRoutes from './routes/symptomLogRoutes.js';

connectDB(); // Conectar a MongoDB

const app = express();
const PORT = process.env.PORT || 3002;

// Configuración de CORS
app.use(cors({
    origin: '*', // Permite cualquier origen para desarrollo. ¡Cambia para producción!
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Middleware para parsear cuerpos JSON
app.use('/api', symptomLogRoutes);

app.get('/', (req, res) => {
    res.send('Symptom Logging Service is running!');
});

app.listen(PORT, () => {
    console.log(`Symptom service running on port ${PORT}`);
});