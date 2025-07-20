const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const apiRoutes = require('./routes/api');

app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRoutes);

// Servidor
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
