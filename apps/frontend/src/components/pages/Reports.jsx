import Header from '../layout/Header'

import { useEffect, useState } from 'react';
import { getSaldo } from '../../utils/Connections';


export default function Reports() {
  const [movimientos, setMovimientos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSaldo();
      setMovimientos(data);
    };
    fetchData();
  }, []);

  const movimientosFiltrados = movimientos.filter((mov) =>
    fechaFiltro ? mov.date.startsWith(fechaFiltro) : true
  );

  const saldoTotal = movimientosFiltrados.reduce((acc, mov) => {
    const valor = parseFloat(mov.saldo);
    return mov.tipo === 'Ingreso' ? acc + valor : acc - valor;
  }, 0);

  return (
    <div className="h-screen overflow-scroll bg-[#E6E6E6]">
        <div >
                <Header />
        </div>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-[90%] max-w-4xl m-auto mt-10">
        <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">Reporte de Movimientos</h1>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <label className="mb-2 md:mb-0 text-sm font-medium text-gray-700">
            Filtrar por fecha:
            <input
              type="date"
              className="ml-2 border border-gray-300 py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </label>
          <div className="text-lg font-semibold text-gray-800 mt-4 md:mt-0">
            Saldo Total: <span className="text-purple-700">{saldoTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="overflow-auto max-h-96">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-purple-100 text-sm text-gray-700">
                <th className="p-2">Fecha</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map((mov) => (
                <tr key={mov.id} className="hover:bg-purple-50 text-sm">
                  <td className="p-2">{new Date(mov.date).toLocaleString()}</td>
                  <td className="p-2">{mov.description}</td>
                  <td className={`p-2 font-medium ${mov.tipo === 'Ingreso' ? 'text-green-600' : 'text-red-500'}`}>
                    {mov.tipo}
                  </td>
                  <td className="p-2">{parseFloat(mov.saldo).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
