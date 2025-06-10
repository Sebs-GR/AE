import express from 'express';
import 'dotenv/config';
import cors from 'cors'; // <-- ¡Añade esta línea!
import connectDB from './config/database.js';
import patientRoutes from './routes/patientRoutes.js';

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS
app.use(cors({
    origin: '*', // Permite cualquier origen para desarrollo. ¡Cambia para producción!
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/api', patientRoutes);

app.get('/', (req, res) => {
    res.send('Patient Service is running!');
});

app.listen(PORT, () => {
    console.log(`Patient service running on port ${PORT}`);
});