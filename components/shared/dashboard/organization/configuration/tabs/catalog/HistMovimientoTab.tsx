'use client'
import { Download } from 'lucide-react'

// Datos extraídos idénticos a los de la captura de pantalla image_726ce0.png
const HISTORIAL_MOVIMIENTOS = [
  {
    fecha: '01/06/2026',
    desde: 'Rodeo Alta',
    hacia: 'Secas',
    cant: '15 cab',
    motivo: 'Secado Masivo',
    usuario: 'Juan (Dueño)',
  },
  {
    fecha: '28/05/2026',
    desde: 'Secas',
    hacia: 'Rodeo Alta',
    cant: '8 cab',
    motivo: 'Post-parto',
    usuario: 'Sistema (Auto)',
  },
  {
    fecha: '20/05/2026',
    desde: 'Rodeo Alta',
    hacia: 'Rodeo Baja',
    cant: '12 cab',
    motivo: 'Baja prod. (250 DEL)',
    usuario: 'Juan (Dueño)',
  },
]

export default function HistMovimientosTab() {
  const handleExport = () => {
    console.log('Exportando historial a CSV...')
    // Aquí irá la descarga del archivo con los datos reales más adelante
  }

  return (
    <div className="w-full pb-12">
      {/* Contenedor principal estilo Light Theme de alta fidelidad */}
      <div className="border border-[#E5E7EB] bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Encabezado con título y botón de acción */}
        <div className="p-5 flex items-center justify-between border-b border-[#E5E7EB] bg-white">
          <h3 className="text-base font-bold text-[#111827]">
            Historial de Movimientos de Rodeo
          </h3>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#374151] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors shadow-sm"
          >
            <Download size={14} /> Exportar CSV
          </button>
        </div>

        {/* Estructura de la Tabla Adaptada */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-3.5 px-6 text-xs font-bold text-[#6B7280]">
                  FECHA
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-[#6B7280]">
                  DESDE
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-[#6B7280]">
                  HACIA
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-[#6B7280]">
                  CANT.
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-[#6B7280]">
                  MOTIVO
                </th>
                <th className="py-3.5 px-6 text-xs font-bold text-[#6B7280]">
                  USUARIO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {HISTORIAL_MOVIMIENTOS.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#F9FAFB] transition-colors"
                >
                  <td className="py-4 px-6 text-[#374151] font-medium whitespace-nowrap">
                    {row.fecha}
                  </td>
                  <td className="py-4 px-5 text-[#374151] font-medium">
                    {row.desde}
                  </td>
                  <td className="py-4 px-5 text-[#374151] font-medium">
                    {row.hacia}
                  </td>
                  <td className="py-4 px-5 text-[#111827] font-bold">
                    {row.cant}
                  </td>
                  <td className="py-4 px-5 text-[#4B5563] font-medium">
                    {row.motivo}
                  </td>
                  <td className="py-4 px-6 text-[#374151]">{row.usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
