import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs/promises';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const productsFile = 'database/products.json';
app.use(express.json());
app.use(cors());

app.get('/products', async (req, res) => {
  try {
    const products = await fs.readFile(productsFile, 'utf8'); 
    res.json(JSON.parse(products));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading products');
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const products = await fs.readFile(productsFile, 'utf8');
    console.log(products);
    const data = JSON.parse(products);
    const productId = req.params.id;
    const product = data[`${productId}`];
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading products');
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile(productsFile, 'utf8'));
    const productId = req.params.id;
    const updatedProduct = req.body;
    products[`product${productId}`] = updatedProduct;
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2)); 
    res.send('Product updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
});

//ventas

const ventasFile = 'database/ventas.json';

app.get('/ventas', async (req, res) => {
  try {
    const ventas = await fs.readFile(ventasFile, 'utf8'); 
    res.json(JSON.parse(ventas));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading ventas');
  }
});

app.get('/ventas/:id', async (req, res) => {
  try {
    const ventas = await fs.readFile(ventasFile, 'utf8');
    const data = JSON.parse(ventas);
    const ventaId = req.params.id;
    const venta = data.find(venta => venta.idVenta === parseInt(ventaId));
    if (venta) {
      res.json(venta);
    } else {
      res.status(404).send('Venta not found');
    }
  } catch (err) {
    res.status(500).send('Error reading ventas');
  }
});

app.post('/ventas', async (req, res) => {
  try {
    const ventas = JSON.parse(await fs.readFile(ventasFile, 'utf8'));
    const newVenta = req.body;
    const ventaId = ventas.length + 1;
    newVenta.idVenta = ventaId;
    ventas.push(newVenta);
    await fs.writeFile(ventasFile, JSON.stringify(ventas, null, 2));
    res.status(201).send('Venta creada correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating venta');
  }
});


app.put('/ventas/:id', async (req, res) => {
  try {
    const ventas = JSON.parse(await fs.readFile(ventasFile, 'utf8'));
    const ventaId = req.params.id;
    const updatedVenta = req.body;
    const index = ventas.findIndex(venta => venta.idVenta === parseInt(ventaId));
    if (index !== -1) {
      ventas[index] = updatedVenta;
      await fs.writeFile(ventasFile, JSON.stringify(ventas, null, 2));
      res.send('Venta actualizada correctamente');
    } else {
      res.status(404).send('Venta not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating venta');
  }
});

app.delete('/ventas/:id', async (req, res) => {
  try {
    const ventas = JSON.parse(await fs.readFile(ventasFile, 'utf8'));
    const ventaId = req.params.id;
    const index = ventas.findIndex(venta => venta.idVenta === parseInt(ventaId));
    if (index !== -1) {
      ventas.splice(index, 1);
      await fs.writeFile(ventasFile, JSON.stringify(ventas, null, 2));
      res.send('Venta eliminada correctamente');
    } else {
      res.status(404).send('Venta not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting venta');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Extracted material

const extractedMaterialsFile = 'database/extracted.json';

app.get('/extracted-materials', async (req, res) => {
  try {
    const extractedMaterials = await fs.readFile(extractedMaterialsFile, 'utf8'); 
    res.json(JSON.parse(extractedMaterials));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading extracted materials');
  }
});

app.post('/extracted-materials', async (req, res) => {
  try {
    const extractedMaterials = JSON.parse(await fs.readFile(extractedMaterialsFile, 'utf8'));
    const newExtractedMaterial = req.body;
    const extractedMaterialId = extractedMaterials.length + 1;
    newExtractedMaterial.id = extractedMaterialId;
    extractedMaterials.push(newExtractedMaterial);
    await fs.writeFile(extractedMaterialsFile, JSON.stringify(extractedMaterials, null, 2));
    res.status(201).send('Extracted material created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating extracted material');
  }
});
