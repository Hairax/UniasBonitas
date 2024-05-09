import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const citasFile = 'database/citas.json';

app.get('/citas', async (req, res) => {
  try {
    const citas = await fs.readFile(citasFile, 'utf8'); 
    res.json(JSON.parse(citas));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading citas');
  }
});

app.post('/citas', async (req, res) => {
  try {
    const citas = JSON.parse(await fs.readFile(citasFile, 'utf8'));
    const newCita = req.body;
    const citaId = uuidv4();
    newCita.id = citaId;
    citas.push(newCita);
    await fs.writeFile(citasFile, JSON.stringify(citas, null, 2));
    res.status(201).send('Cita creada correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating cita');
  }
});

app.put('/citas/:id', async (req, res) => {
  try {
    const citas = JSON.parse(await fs.readFile(citasFile, 'utf8'));
    const citaId = req.params.id;
    const index = citas.findIndex(cita => cita.id === citaId);
    if (index !== -1) {
      citas[index] = req.body;
      await fs.writeFile(citasFile, JSON.stringify(citas, null, 2));
      res.send('Cita actualizada correctamente');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating cita');
  }
});


app.delete('/citas/:id', async (req, res) => {
  try {
    const citas = JSON.parse(await fs.readFile(citasFile, 'utf8'));
    const citaId = req.params.id;
    const index = citas.findIndex(cita => cita.id === citaId);
    if (index !== -1) {
      citas.splice(index, 1);
      await fs.writeFile(citasFile, JSON.stringify(citas, null, 2));
      res.send('Cita eliminada correctamente');
    } else {
      res.status(404).send('Cita not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting cita');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});