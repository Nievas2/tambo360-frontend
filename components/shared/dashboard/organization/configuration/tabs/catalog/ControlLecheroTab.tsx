'use client'
import { useState } from 'react'
import { Plus, Download, Eye, Info, Droplet } from 'lucide-react'

// Datos de la tabla extraídos idénticos a los de image_da3f64.png
const REGISTROS_CONTROL = [
  {
    fecha: '28/05/2026',
    rodeo: 'Alta',
    prodTotal: '2.976 L',
    prodVaca: '24.8 L',
    grasa: '3.72%',
    proteina: '3.25%',
    ccs: 185,
    responsable: 'Sistema (Auto)',
  },
  {
    fecha: '28/05/2026',
    rodeo: 'Baja',
    prodTotal: '1.120 L',
    prodVaca: '14.0 L',
    grasa: '3.51%',
    proteina: '3.18%',
    ccs: 248, // Alerta (> 200)
    responsable: 'Juan (Dueño)',
  },
  {
    fecha: '30/04/2026',
    rodeo: 'Alta',
    prodTotal: '3.100 L',
    prodVaca: '25.8 L',
    grasa: '3.58%',
    proteina: '3.21%',
    ccs: 178,
    responsable: 'Sistema (Auto)',
  },
]

export default function ControlLecheroTab() {
  const [mesFiltro, setMesFiltro] = useState('2026-05')

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      {/* --- SECCIÓN 1: TARJETAS KPI (TOP RESUMEN) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Promedio Producción / Vaca */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#6B7280]">
              Promedio Producción / Vaca
            </span>
            <span className="text-2xl font-bold text-[#2563EB]">24.8 L</span>
            <span className="text-xs text-[#4B5563] mt-1">
              Mayo 2026 · 220 vacas en ordeñe
            </span>
          </div>
          <div className="p-2 bg-[#EFF6FF] text-[#2563EB] rounded-lg">
            <Droplet size={18} fill="currentColor" />
          </div>
        </div>

        {/* % Grasa Promedio */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#6B7280]">
              % Grasa Promedio
            </span>
            <span className="text-2xl font-bold text-[#D97706]">3.62%</span>
            <div className="flex items-center gap-1 text-xs text-[#16A34A] font-medium mt-1">
              <span>↑ +0.12%</span>
              <span className="text-[#6B7280] font-normal">
                vs mes anterior
              </span>
            </div>
          </div>
        </div>

        {/* CCS Promedio del Rodeo (Con Alerta de Umbral) */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm border-l-4 border-l-[#EF4444]">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#6B7280]">
              CCS Promedio del Rodeo
            </span>
            <span className="text-2xl font-bold text-[#DC2626]">
              210 mil/mL
            </span>
            <div className="flex items-center gap-1 text-xs text-[#D97706] font-semibold mt-1">
              <span className="bg-[#FEF3C7] px-1.5 py-0.5 rounded text-[#B45309]">
                ⚠️ Atención
              </span>
              <span className="text-[#6B7280] font-normal">
                — umbral: &lt;200
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 2: TABLA DE REGISTROS --- */}
      <div className="border border-[#E5E7EB] bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Encabezado con filtros y acciones combinadas de las capturas */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] bg-white">
          <div className="flex items-baseline gap-2">
            <h3 className="text-base font-bold text-[#111827]">
              Registros de Control Lechero
            </h3>
            <span className="text-xs text-[#6B7280]">Mayo 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Selector de Fecha - Basado en image_da3f43.png */}
            <select
              value={mesFiltro}
              onChange={(e) => setMesFiltro(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#22C55E]"
            >
              <option value="2026-05">Mayo 2026</option>
              <option value="2026-04">Abril 2026</option>
              <option value="2026-03">Marzo 2026</option>
            </select>

            {/* Botón Nuevo Registro */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#22C55E] hover:bg-[#16A34A] rounded-lg shadow-sm transition-colors">
              <Plus size={14} /> Nuevo Registro
            </button>

            {/* Botón Exportar */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#374151] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors shadow-sm">
              <Download size={14} /> Exportar
            </button>
          </div>
        </div>

        {/* Contenedor de la Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  FECHA
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  RODEO
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  PROD. TOTAL (L)
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  PROD. / VACA (L)
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  % GRASA
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  % PROTEÍNA
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  CCS (MIL/ML)
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  RESPONSABLE
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280] text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {REGISTROS_CONTROL.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#F9FAFB] transition-colors"
                >
                  <td className="py-3.5 px-5 text-[#374151] font-medium whitespace-nowrap">
                    {row.fecha}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        row.rodeo === 'Alta'
                          ? 'bg-[#F0FDF4] text-[#16A34A]'
                          : 'bg-[#FFFBEB] text-[#D97706]'
                      }`}
                    >
                      {row.rodeo}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-[#111827] font-bold">
                    {row.prodTotal}
                  </td>
                  <td className="py-3.5 px-5 text-[#374151] font-medium">
                    {row.prodVaca}
                  </td>
                  <td className="py-3.5 px-5 text-[#4B5563]">{row.grasa}</td>
                  <td className="py-3.5 px-5 text-[#4B5563]">{row.proteina}</td>
                  <td className="py-3.5 px-5 font-bold">
                    {/* Color dinámico condicional basado en el umbral crítico de 200 */}
                    <span
                      className={
                        row.ccs > 200 ? 'text-[#DC2626]' : 'text-[#16A34A]'
                      }
                    >
                      {row.ccs}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-[#4B5563] whitespace-nowrap">
                    {row.responsable}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <button className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SECCIÓN 3: BLOQUE INFORMATIVO INFERIOR (image_da3f64.png) --- */}
      <div className="flex gap-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4">
        <Info size={18} className="text-[#2563EB] shrink-0 mt-0.5" />
        <p className="text-xs text-[#1E40AF] leading-relaxed">
          El <strong className="font-bold">Control Lechero Mensual</strong>{' '}
          permite registrar y comparar la calidad de la leche producida (grasa,
          proteína, CCS) por rodeo y período. Los datos de CCS por encima de 200
          mil/mL disparan una alerta automática del TamboEngine para revisión
          sanitaria.
        </p>
      </div>
    </div>
  )
}
