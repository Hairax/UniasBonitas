import { useState, useEffect } from 'react'
import { getInventario, putInventario, postCita } from '../../utils/Connections'

function Venta () {
  const [inventario, setInventario] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [nombre, setNombre] = useState('')
  const [detalles, setDetalles] = useState('')
  const [costo, setCosto] = useState('')

  useEffect(() => {
    const fetchInventario = async () => {
      const data = await getInventario()
      setInventario(data)
    }
    fetchInventario()
  }, [])

  const handleSelectItem = (itemId) => {
    if (!selectedItems.find(item => item.id === itemId)) {
      const item = inventario.find(i => i.id === itemId)
      setSelectedItems([...selectedItems, { ...item, cantidadSeleccionada: 1 }])
    }
  }

  const handleCantidadChange = (itemId, cantidad) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === itemId
        ? { ...item, cantidadSeleccionada: Math.min(Number(cantidad), Number(item.cantidad)) }
        : item
    ))
  }

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId))
  }

  const handleCreateVenta = async () => {
    try {
      // Validación básica
      if (!nombre || !costo || selectedItems.length === 0) {
        alert('Completa todos los campos y selecciona al menos un ítem del inventario.')
        return
      }

      // Crear venta
      const venta = {
        nombre,
        detalles,
        costo,
        productos: selectedItems.map(item => ({
          id: item.id,
          cantidad: item.cantidadSeleccionada
        }))
      }

      await postCita(venta)

      // Actualizar inventario
      for (const item of selectedItems) {
        const nuevaCantidad = Number(item.cantidad) - Number(item.cantidadSeleccionada)
        await putInventario(item.id, {
          ...item,
          cantidad: nuevaCantidad
        })
      }

      // Resetear formulario
      setNombre('')
      setDetalles('')
      setCosto('')
      setSelectedItems([])

      // Actualizar lista de inventario
      const newData = await getInventario()
      setInventario(newData)

      alert('Venta registrada exitosamente.')
    } catch (error) {
      console.error(error)
      alert('Error al registrar la venta.')
    }
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl mb-6">Crear Nueva Venta</h1>

      <div className="grid gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          className="bg-gray-800 p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Detalles"
          className="bg-gray-800 p-2 rounded"
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
        />
        <input
          type="number"
          placeholder="Costo total"
          className="bg-gray-800 p-2 rounded"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
        />
      </div>

      <h2 className="text-xl mb-4">Seleccionar productos</h2>
      <div className="grid grid-cols-3 gap-4">
        {inventario.map(item => (
          <div key={item.id} className="bg-gray-900 p-4 rounded">
            <p>{item.name}</p>
            <p>Disponible: {item.cantidad}</p>
            <button
              className="mt-2 bg-blue-600 px-2 py-1 rounded"
              onClick={() => handleSelectItem(item.id)}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl mt-6 mb-4">Ítems seleccionados</h2>
      {selectedItems.map(item => (
        <div key={item.id} className="flex items-center gap-4 mb-2 bg-gray-800 p-2 rounded">
          <p>{item.name}</p>
          <input
            type="number"
            min={1}
            max={item.cantidad}
            value={item.cantidadSeleccionada}
            onChange={(e) => handleCantidadChange(item.id, e.target.value)}
            className="bg-gray-900 p-1 rounded w-16"
          />
          <button onClick={() => handleRemoveItem(item.id)} className="text-red-400">Quitar</button>
        </div>
      ))}

      <button
        onClick={handleCreateVenta}
        className="mt-6 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Registrar Venta
      </button>
    </div>
  )
}

export default Venta