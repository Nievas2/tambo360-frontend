'use client'
import { useState } from 'react'
import { ArrowRightLeft, Info, CheckCircle2 } from 'lucide-react'

// Datos quemados para las transferencias activas con los textos exactos de la imagen
const TRANSFERENCIAS_ACTIVAS = [
  {
    id: 1,
    desde: 'Alta',
    hacia: 'Secas',
    cant: '15 cab',
    retorno: '25/06',
    isAlert: true,
  },
  {
    id: 2,
    desde: 'Baja',
    hacia: 'Alta',
    cant: '5 cab',
    retorno: 'Manual',
    isAlert: false,
  },
]

export default function TransferirAnimalesTab() {
  // Estados para controlar el formulario
  const [origen, setOrigen] = useState('alta')
  const [destino, setDestino] = useState('baja')
  const [cantidad, setCantidad] = useState('10')
  const [motivo, setMotivo] = useState('baja_produccion')
  const [plazo, setPlazo] = useState('30')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ origen, destino, cantidad, motivo, plazo })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 w-full">
      {/* Formulario Izquierdo: Nueva Transferencia */}
      <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm flex flex-col h-fit">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-[#F0FDF4] text-[#29845A] rounded-lg">
            <ArrowRightLeft size={18} />
          </div>
          <h3 className="text-base font-bold text-[#111827]">
            Nueva Transferencia
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Rodeo Origen */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4B5563]">
              Rodeo Origen
            </label>
            <select
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
            >
              <option value="alta">Rodeo Alta (120 cab)</option>
              <option value="baja">Rodeo Baja (80 cab)</option>
              <option value="secas">Secas (20 cab)</option>
            </select>
          </div>

          {/* Rodeo Destino */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4B5563]">
              Rodeo Destino
            </label>
            <select
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
            >
              <option value="baja">Rodeo Baja (80 cab)</option>
              <option value="secas">Secas (20 cab)</option>
              <option value="alta">Rodeo Alta (120 cab)</option>
            </select>
          </div>

          {/* Cantidad de Animales */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4B5563]">
              Cantidad de Animales
            </label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="10"
              className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
            />
          </div>

          {/* Motivo - CORREGIDO EXACTO CON LAS OPCIONES DE LA IMAGEN (image_72711a.png) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4B5563]">
              Motivo
            </label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
            >
              <option value="baja_produccion">
                Baja producción (DEL avanzado)
              </option>
              <option value="preparto_secado">Preparto / Secado</option>
              <option value="parto_ordeñe">Parto / Incorporar a ordeñe</option>
              <option value="enfermedad">Enfermedad</option>
            </select>
          </div>

          {/* Plazo de retorno */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#4B5563]">
              Plazo de retorno (días)
            </label>
            <input
              type="number"
              value={plazo}
              onChange={(e) => setPlazo(e.target.value)}
              placeholder="30"
              className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
            />
          </div>

          {/* Bloque Informativo */}
          <div className="flex gap-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3.5 mt-2">
            <Info size={16} className="text-[#16A34A] shrink-0 mt-0.5" />
            <p className="text-xs text-[#166534] leading-relaxed">
              Los días comienzan a contar desde el momento del registro. El
              sistema generará una alerta automática al vencimiento.
            </p>
          </div>

          {/* Botón de Confirmación */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            Confirmar Transferencia
          </button>
        </form>
      </div>

      {/* Tabla Derecha: Transferencias Activas */}
      <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden h-fit">
        <div className="p-5 border-b border-[#E5E7EB]">
          <h3 className="text-base font-bold text-[#111827]">
            Transferencias Activas
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  DESDE
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  HACIA
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  CANT.
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280] text-right">
                  RETORNO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {TRANSFERENCIAS_ACTIVAS.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#F9FAFB] transition-colors"
                >
                  <td className="py-4 px-5 text-[#374151] font-medium">
                    {item.desde}
                  </td>
                  <td className="py-4 px-5 text-[#374151] font-medium">
                    {item.hacia}
                  </td>
                  <td className="py-4 px-5 text-[#111827] font-bold">
                    {item.cant}
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    {item.isAlert ? (
                      <span className="px-3 py-1 text-xs font-bold bg-[#FEF3C7] text-[#D97706] rounded-full">
                        {item.retorno}
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium bg-[#E5E7EB] text-[#4B5563] rounded-full">
                        {item.retorno}
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
