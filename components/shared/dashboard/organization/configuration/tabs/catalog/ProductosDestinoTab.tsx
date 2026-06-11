'use client'
import { Plus } from 'lucide-react'

// Datos extraídos con total fidelidad de la imagen image_d9e0ef.png
const PRODUCTOS_DESTINO = [
  {
    id: 1,
    producto: 'Leche Entera Cruda',
    unidad: 'Litros (L)',
    comprador: 'Danone Argentina',
    activo: true,
  },
  {
    id: 2,
    producto: 'Queso Pategrás',
    unidad: 'Kilos (Kg)',
    comprador: 'Quesería Local',
    activo: true,
  },
]

export default function ProductosDestinoTab() {
  const handleAddProduct = () => {
    console.log('Abriendo modal para agregar un nuevo producto destino...')
  }

  return (
    <div className="w-full pb-12">
      {/* Contenedor principal estilo Light Theme */}
      <div className="border border-[#E5E7EB] bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Encabezado con título y botón de acción */}
        <div className="p-5 flex items-center justify-between border-b border-[#E5E7EB] bg-white">
          <h3 className="text-base font-bold text-[#111827]">
            Productos de Destino
          </h3>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#374151] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors shadow-sm"
          >
            <Plus size={14} /> Nuevo Producto
          </button>
        </div>

        {/* Tabla de Productos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-3.5 px-6 text-xs font-bold text-[#6B7280]">
                  PRODUCTO
                </th>
                <th className="py-3.5 px-6 text-xs font-bold text-[#6B7280]">
                  UNIDAD
                </th>
                <th className="py-3.5 px-6 text-xs font-bold text-[#6B7280]">
                  COMPRADOR
                </th>
                <th className="py-3.5 px-6 text-xs font-bold text-[#6B7280] text-center w-24">
                  ACTIVO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {PRODUCTOS_DESTINO.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#F9FAFB] transition-colors"
                >
                  <td className="py-4 px-6 text-[#374151] font-medium">
                    {item.producto}
                  </td>
                  <td className="py-4 px-6 text-[#4B5563]">{item.unidad}</td>
                  <td className="py-4 px-6 text-[#374151] font-medium">
                    {item.comprador}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.activo ? (
                      <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-[#F0FDF4] text-[#16A34A] rounded-full">
                        Sí
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-[#FEF2F2] text-[#DC2626] rounded-full">
                        No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
