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

const inventarioFile = 'database/inventario.json';

app.get('/inventario', async (req, res) => {
  try {
    const inventario = await fs.readFile(inventarioFile, 'utf8'); 
    res.json(JSON.parse(inventario));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al leer inventario');
  }
});

app.post('/inventario', async (req, res) => {
  try {
    const inventario = JSON.parse(await fs.readFile(inventarioFile, 'utf8'));
    const newInventario = req.body;
    const inventarioId = uuidv4();
    newInventario.id = inventarioId;
    inventario.push(newInventario);
    await fs.writeFile(inventarioFile, JSON.stringify(inventario, null, 2));
    res.status(201).send('Inventario creada correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating cita');
  }
});

app.put('/inventario/:id', async (req, res) => {
  try {
    const inventario = JSON.parse(await fs.readFile(inventarioFile, 'utf8'));
    const inventarioId = req.params.id;
    const index = inventario.findIndex(inventario => inventario.id === inventarioId);
    if (index !== -1) {
      inventario[index] = req.body;
      await fs.writeFile(inventarioFile, JSON.stringify(inventario, null, 2));
      res.send('Inventario actualizada correctamente');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating inventario');
  }
});


app.delete('/inventario/:id', async (req, res) => {
  try {
    const inventario = JSON.parse(await fs.readFile(inventarioFile, 'utf8'));
    const inventarioId = req.params.id;
    const index = inventario.findIndex(inventario => inventario.id === inventarioId);
    if (index !== -1) {
      inventario.splice(index, 1);
      await fs.writeFile(inventarioFile, JSON.stringify(inventario, null, 2));
      res.send('Inventario eliminada correctamente');
    } else {
      res.status(404).send('Inventario not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting inventario');
  }
});

const saldoFile = 'database/saldo.json';

app.get('/saldo', async (req, res) => {
  try {
    const saldo = await fs.readFile(saldoFile, 'utf8'); 
    res.json(JSON.parse(saldo));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al leer el saldo');
  }
});

app.post('/saldo', async (req, res) => {
  try {
    const saldo = JSON.parse(await fs.readFile(saldoFile, 'utf8'));
    const newSaldo = req.body;
    const saldoId = uuidv4();
    newSaldo.id = saldoId;
    saldo.push(newSaldo);
    await fs.writeFile(saldoFile, JSON.stringify(saldo, null, 2));
    res.status(201).send('Saldo creada correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating saldo');
  }
});

app.put('/saldo/:id', async (req, res) => {
  try {
    const saldo = JSON.parse(await fs.readFile(saldoFile, 'utf8'));
    const saldoId = req.params.id;
    const index = saldo.findIndex(saldo => saldo.id === saldoId);
    if (index !== -1) {
      saldo[index] = req.body;
      await fs.writeFile(saldoFile, JSON.stringify(saldo, null, 2));
      res.send('Saldo actualizada correctamente');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating saldo');
  }
});


app.delete('/saldo/:id', async (req, res) => {
  try {
    const saldo = JSON.parse(await fs.readFile(saldoFile, 'utf8'));
    const saldoId = req.params.id;
    const index = saldo.findIndex(saldo => saldo.id === saldoId);
    if (index !== -1) {
      saldo.splice(index, 1);
      await fs.writeFile(saldoFile, JSON.stringify(saldo, null, 2));
      res.send('Saldo eliminada correctamente');
    } else {
      res.status(404).send('Saldo no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error eliminando saldo');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

