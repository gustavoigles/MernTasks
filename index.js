const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')

const app = express();

//Cosr
app.use(cors())

conectarDB();
//Puerto de la app//
app.use(express.json({ extended: true}));

const port = process.env.PORT || 4000;

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tarea'))

//Definir pagina principal

app.get('/', (req, res) => {
    res.send('Hola mundo')
});


app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el piuerto ${PORT}`)
});

