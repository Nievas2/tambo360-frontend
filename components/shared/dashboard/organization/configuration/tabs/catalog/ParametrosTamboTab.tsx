'use client'
import { useState } from 'react'
import { Save } from 'lucide-react'

export default function ParametrosTamboTab() {
  // Estados alineados con las opciones exactas de las nuevas capturas
  const [tipoOrdeñe, setTipoOrdeñe] = useState('mecanico_herringbone')
  const [frecuenciaOrdeñe, setFrecuenciaOrdeñe] = useState('2_veces')
  const [produccionDiaria, setProduccionDiaria] = useState('3500')
  const [cuencaVenta, setCuencaVenta] = useState('Cuenca Oeste')

  const [costoAlta, setCostoAlta] = useState('4,50')
  const [costoCaja, setCostoCaja] = useState('2,80') // Rodeo Baja
  const [costoSecas, setCostoSecas] = useState('1,50')
  const [delPromedio, setDelPromedio] = useState('150')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Guardando parámetros actualizados...', {
      tipoOrdeñe,
      frecuenciaOrdeñe,
      produccionDiaria,
      cuencaVenta,
      costoAlta,
      costoCaja,
      costoSecas,
      delPromedio,
    })
  }

  return (
    <div className="w-full pb-12">
      <div className="border border-[#E5E7EB] bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Encabezado de la Sección */}
        <div className="p-5 border-b border-[#E5E7EB] bg-white">
          <h3 className="text-base font-bold text-[#111827]">
            Parámetros del Tambo
          </h3>
        </div>

        {/* Formulario en dos columnas */}
        <form onSubmit={handleSave} className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* --- COLUMNA IZQUIERDA --- */}
            <div className="flex flex-col gap-5">
              {/* Tipo de Ordeñe - CORREGIDO CON TEXTOS EXACTOS (image_da475f.png) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  Tipo de Ordeñe
                </label>
                <select
                  value={tipoOrdeñe}
                  onChange={(e) => setTipoOrdeñe(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                >
                  <option value="manual">Manual</option>
                  <option value="mecanico_herringbone">
                    Mecánico (Herringbone)
                  </option>
                  <option value="mecanico_rotativo">Mecánico (Rotativo)</option>
                  <option value="robotico_ams">Robótico (AMS)</option>
                </select>
              </div>

              {/* Frecuencia de Ordeñe por Día - ORDEN CORREGIDO (image_da473d.png) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  Frecuencia de Ordeñe por Día
                </label>
                <select
                  value={frecuenciaOrdeñe}
                  onChange={(e) => setFrecuenciaOrdeñe(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                >
                  <option value="1_vez">1 vez al día</option>
                  <option value="2_veces">2 veces al día</option>
                  <option value="3_veces">3 veces al día</option>
                </select>
              </div>

              {/* Producción Diaria Estimada (Lts) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  Producción Diaria Estimada (Lts)
                </label>
                <input
                  type="number"
                  value={produccionDiaria}
                  onChange={(e) => setProduccionDiaria(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                />
              </div>

              {/* Cuenca de Venta */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  Cuenca de Venta
                </label>
                <input
                  type="text"
                  value={cuencaVenta}
                  onChange={(e) => setCuencaVenta(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                />
              </div>
            </div>

            {/* --- COLUMNA DERECHA --- */}
            <div className="flex flex-col gap-5">
              {/* Costo Ración — Rodeo Alta */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  Costo Ración — Rodeo Alta ($/cab/día)
                </label>
                <input
                  type="text"
                  value={costoAlta}
                  onChange={(e) => setCostoAlta(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                />
              </div>

              {/* Costo Ración — Rodeo Baja */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  Costo Ración — Rodeo Baja ($/cab/día)
                </label>
                <input
                  type="text"
                  value={costoCaja}
                  onChange={(e) => setCostoCaja(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                />
              </div>

              {/* Costo Ración — Secas */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  Costo Ración — Secas ($/cab/día)
                </label>
                <input
                  type="text"
                  value={costoSecas}
                  onChange={(e) => setCostoSecas(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                />
              </div>

              {/* DEL Promedio Estimado (días) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4B5563]">
                  DEL Promedio Estimado (días)
                </label>
                <input
                  type="number"
                  value={delPromedio}
                  onChange={(e) => setDelPromedio(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] text-[#111827] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors"
                />
                <span className="text-[11px] text-[#6B7280] leading-normal mt-0.5">
                  Días en Leche promedio del rodeo. Default: 150. Afecta la
                  curva de lactancia esperada por la IA.
                </span>
              </div>
            </div>
          </div>

          {/* Botón de Guardado */}
          <div className="pt-4 border-t border-[#E5E7EB] mt-2">
            <button
              type="submit"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-2 px-5 rounded-xl shadow-sm transition-colors text-sm flex items-center gap-2"
            >
              <Save size={16} />
              Guardar Parámetros
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
