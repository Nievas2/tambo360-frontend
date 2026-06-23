'use client'
import { useState } from 'react'
import { Plus, Eye, Droplet, TrendingUp, Activity, Filter } from 'lucide-react'

const REGISTROS_CONTROL = [
  {
    fecha: '12 OCT 2025',
    rodeo: 'Rodeo Alta',
    prodTotal: '4,280 Lts',
    prodVaca: '31.2 Lts',
    grasa: '3.85%',
    proteina: '3.22%',
    ccs: 128,
    responsable: 'M. Arrieta',
  },
  {
    fecha: '11 OCT 2025',
    rodeo: 'Rodeo Baja',
    prodTotal: '2,840 Lts',
    prodVaca: '22.4 Lts',
    grasa: '3.91%',
    proteina: '3.31%',
    ccs: 215,
    responsable: 'J. Castro',
  },
  {
    fecha: '10 OCT 2025',
    rodeo: 'Rodeo Alta',
    prodTotal: '4,150 Lts',
    prodVaca: '30.8 Lts',
    grasa: '3.78%',
    proteina: '3.18%',
    ccs: 154,
    responsable: 'L. Mendez',
  },
]

export default function ControlLecheroTab() {
  return (
    <div className="w-full flex flex-col gap-6 text-left bg-[#F8FAFC] p-6 rounded-2xl">
      {/* --- ENCABEZADO DE SECCIÓN --- */}
      <div className="flex justify-between items-center w-full">
        <h3 className="text-base font-bold text-[#111827]">
          Control Lechero Mensual
        </h3>
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#257F57] hover:bg-[#1E6645] rounded-lg shadow-xs transition-colors">
          <Plus size={14} strokeWidth={3} /> Agregar Registro
        </button>
      </div>

      {/* --- SECCIÓN 1: TARJETAS KPI CON UN MEJOR SHADOW (Fiel a image_454ac1.png) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tarjeta 1: Promedio Producción/Vaca */}
        <div className="bg-white border border-[#E5E7EB]/70 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow flex justify-between items-start h-32">
          <div className="flex flex-col justify-between h-full">
            <span className="text-xs font-bold text-[#111827] max-w-[150px] leading-tight">
              Promedio Producción/Vaca
            </span>
            <span className="text-sm font-bold text-[#111827]">
              26.4 Lts/día
            </span>
            <span className="text-[11px] text-[#257F57] font-semibold flex items-center gap-1">
              <TrendingUp size={12} strokeWidth={2.5} /> + 1.2% este mes
            </span>
          </div>
          <Droplet size={16} className="text-[#257F57] fill-[#257F57]/20" />
        </div>

        {/* Tarjeta 2: % Grasa Promedio */}
        <div className="bg-white border border-[#E5E7EB]/70 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow flex justify-between items-start h-32">
          <div className="flex flex-col justify-between h-full">
            <span className="text-xs font-bold text-[#111827]">
              % Grasa Promedio
            </span>
            <span className="text-sm font-bold text-[#111827]">3.82 %</span>
            <span className="text-[11px] text-[#257F57] font-semibold flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#257F57]"></span>
              Estable: Meta (3.80)
            </span>
          </div>
          <Droplet size={16} className="text-[#257F57]" />
        </div>

        {/* Tarjeta 3: CCS Promedio */}
        <div className="bg-white border border-[#E5E7EB]/70 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow flex justify-between items-start h-32">
          <div className="flex flex-col justify-between h-full">
            <span className="text-xs font-bold text-[#111827]">
              CCS Promedio
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold text-[#111827]">142 x 10</span>
              <span className="text-[10px] font-bold text-[#111827] align-super -mt-1">
                3
              </span>
              <span className="text-sm font-bold text-[#111827]">/ml</span>
            </div>
            <span className="text-[11px] text-[#257F57] font-semibold flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#257F57]"></span>
              Status: Óptimo
            </span>
          </div>
          <Activity size={16} className="text-[#257F57]" />
        </div>
      </div>

      {/* --- SECCIÓN 2: TABLA DE REGISTROS --- */}
      <div className="border border-[#E5E7EB] bg-white rounded-xl shadow-xs overflow-hidden">
        {/* Sub-encabezado de la Tabla con Botón de Filtro */}
        <div className="px-5 py-4 flex justify-between items-center bg-white border-b border-[#E5E7EB]">
          <h4 className="text-xs font-bold text-[#111827]">
            Registro Control Lechero
          </h4>
          <button className="p-1.5 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 text-[#6B7280] transition-colors">
            <Filter size={14} />
          </button>
        </div>

        {/* Contenedor de la Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  Fecha
                </th>
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  Rodeo
                </th>
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  Producción Total
                </th>
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  Prod /Vaca
                </th>
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  % Grasa
                </th>
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  %Proteína
                </th>
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  CCS
                </th>
                <th className="py-3 px-5 text-[11px] font-bold text-[#4B5563]">
                  Responsable
                </th>
                <th className="py-3 px-5 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {REGISTROS_CONTROL.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3.5 px-5 text-xs text-[#4B5563] font-medium whitespace-nowrap">
                    {row.fecha}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold rounded-md text-white tracking-wide ${
                        row.rodeo === 'Rodeo Alta'
                          ? 'bg-[#1E7F53]'
                          : 'bg-[#6E8A3D]'
                      }`}
                    >
                      {row.rodeo}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-[#111827] font-medium">
                    {row.prodTotal}
                  </td>
                  <td className="py-3.5 px-5 text-xs text-[#257F57] font-semibold">
                    {row.prodVaca}
                  </td>
                  <td className="py-3.5 px-5 text-xs text-[#4B5563]">
                    {row.grasa}
                  </td>
                  <td className="py-3.5 px-5 text-xs text-[#4B5563]">
                    {row.proteina}
                  </td>
                  <td className="py-3.5 px-5 text-xs font-bold">
                    <span
                      className={
                        row.ccs > 200 ? 'text-[#DC2626]' : 'text-[#257F57]'
                      }
                    >
                      {row.ccs}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-[#4B5563] whitespace-nowrap">
                    {row.responsable}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <button className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors p-1">
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginador Inferior */}
        <div className="px-5 py-3.5 bg-white border-t border-[#E5E7EB] flex justify-between items-center text-xs text-[#6B7280]">
          <span className="font-medium text-gray-500">
            Mostrando 3 de 15 registros
          </span>
          <div className="flex gap-1.5">
            <button
              className="px-2 py-1 border border-[#E5E7EB] rounded bg-white text-[#9CA3AF] cursor-not-allowed text-[11px]"
              disabled
            >
              &lt;
            </button>
            <button className="px-2 py-1 border border-[#E5E7EB] rounded bg-white text-gray-600 hover:bg-gray-50 text-[11px] font-medium">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
