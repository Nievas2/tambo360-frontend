'use client'
import { Download, Calendar } from 'lucide-react'

// Datos extraídos idénticos a los de la captura de pantalla de Figma
const HISTORIAL_MOVIMIENTOS = [
  {
    fecha: '01/06/2026',
    desde: 'Rodeo Alta',
    hacia: 'Secas',
    cant: '15 cab',
    motivo: { texto: 'Secado Masivo', estilo: 'bg-[#1E7E52] text-white' },
    usuario: 'Juan (Dueño)',
  },
  {
    fecha: '28/05/2026',
    desde: 'Secas',
    hacia: 'Rodeo Alta',
    cant: '8 cab',
    motivo: { texto: 'Post-Parto', estilo: 'bg-[#84CC16] text-white' },
    usuario: 'Sistema (Auto)',
  },
  {
    fecha: '20/05/2026',
    desde: 'Rodeo Alta',
    hacia: 'Rodeo Baja',
    cant: '12 cab',
    motivo: { texto: 'Baja Prod', estilo: 'bg-[#DC2626] text-white' },
    usuario: 'Juan (Dueño)',
  },
  {
    fecha: '15/05/2026',
    desde: 'Hospital',
    hacia: 'Secas',
    cant: '3 cab',
    motivo: { texto: 'Alta Médica', estilo: 'bg-[#374151] text-white' },
    usuario: 'Marta (Vet)',
  },
]

export default function HistMovimientosTab() {
  const handleExport = () => {
    console.log('Exportando historial a CSV...')
  }

  return (
    <div className="w-full pb-12 bg-[#F9FAFB] p-6">
      {/* Contenedor de la sección */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado con Título y Acciones */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-bold text-[#111827]">
            Historial de Movimientos de Rodeo
          </h3>

          <div className="flex items-center gap-3">
            {/* Selector de Rango de Fechas */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#E5E7EB] hover:bg-gray-200 text-[#374151] rounded-lg text-xs font-semibold cursor-pointer transition-colors">
              <Calendar size={14} className="text-[#4B5563]" />
              <span>Jun 01-Jun 30,2026</span>
            </div>

            {/* Botón Exportar CSV */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1E7E52] hover:bg-[#166534] rounded-lg transition-colors shadow-sm tracking-wide uppercase"
            >
              <Download size={14} /> EXPORTAR CSV
            </button>
          </div>
        </div>

        {/* Estructura de la Tabla */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#EDF2F7] border-b border-[#E5E7EB]">
                  <th className="py-4 px-6 font-bold text-[#4B5563]">Fecha</th>
                  <th className="py-4 px-6 font-bold text-[#4B5563]">Desde</th>
                  <th className="py-4 px-6 font-bold text-[#4B5563]">Hacia</th>
                  <th className="py-4 px-6 font-bold text-[#4B5563]">
                    Cantidad
                  </th>
                  <th className="py-4 px-6 font-bold text-[#4B5563]">Motivo</th>
                  <th className="py-4 px-6 font-bold text-[#4B5563]">
                    Usuarios
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {HISTORIAL_MOVIMIENTOS.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#F9FAFB] transition-colors"
                  >
                    {/* Fecha */}
                    <td className="py-4 px-6 text-[#4B5563] whitespace-nowrap">
                      {row.fecha}
                    </td>
                    {/* Desde */}
                    <td className="py-4 px-6 text-[#111827] font-bold">
                      {row.desde}
                    </td>
                    {/* Hacia */}
                    <td className="py-4 px-6 text-[#111827] font-bold">
                      {row.hacia}
                    </td>
                    {/* Cantidad */}
                    <td className="py-4 px-6 text-[#4B5563]">{row.cant}</td>
                    {/* Motivo (Badge) */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 text-[10px] font-semibold rounded-md ${row.motivo.estilo}`}
                      >
                        {row.motivo.texto}
                      </span>
                    </td>
                    {/* Usuario */}
                    <td className="py-4 px-6 text-[#4B5563] whitespace-nowrap">
                      {row.usuario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
