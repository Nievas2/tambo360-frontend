'use client'
import { useState } from 'react'

export default function ParametrosTamboTab() {
  const [tipoOrdeñe, setTipoOrdeñe] = useState('espina_pescado')
  const [frecuenciaOrdeñe, setFrecuenciaOrdeñe] = useState('2')
  const [produccionDiaria, setProduccionDiaria] = useState('0.00')
  const [cuencaVenta, setCuencaVenta] = useState('Cuenca Abasto Sur')

  const [costoAlta, setCostoAlta] = useState('450,50')
  const [costoBaja, setCostoBaja] = useState('320,75')
  const [costoSecas, setCostoSecas] = useState('185,00')
  const [delPromedio, setDelPromedio] = useState('0')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="w-full bg-white px-4 py-8">
      {/* Contenedor con el ancho máximo exacto visual del Figma */}
      <div className="max-w-[640px] mx-auto text-left">
        {/* Título idéntico en tipografía y margen */}
        <h3 className="text-sm font-bold text-[#111827] mb-9">
          Configuración de Parámetros de Tambo
        </h3>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Tipo de Ordeñe */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#374151]">
              Tipo de Ordeñe
            </label>
            <div className="relative">
              <select
                value={tipoOrdeñe}
                onChange={(e) => setTipoOrdeñe(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] appearance-none cursor-pointer shadow-sm"
              >
                <option value="espina_pescado">Espina de Pescado</option>
                <option value="manual">Manual</option>
                <option value="rotativo">Mecánico (Rotativo)</option>
                <option value="robotico">Robótico (AMS)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6B7280]">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Frecuencia de Ordeñe y Producción Diaria (Fila doble perfecta) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#374151]">
                Frecuencia de Ordeñe por Día
              </label>
              <input
                type="text"
                value={frecuenciaOrdeñe}
                onChange={(e) => setFrecuenciaOrdeñe(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#374151]">
                Producción Diaria Estimada
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={produccionDiaria}
                  onChange={(e) => setProduccionDiaria(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] pr-12 shadow-sm"
                />
                <span className="absolute right-4 text-[10px] font-bold text-[#9CA3AF] tracking-wider">
                  LTS
                </span>
              </div>
            </div>
          </div>

          {/* Cuenca de Venta */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#374151]">
              Cuenca de Venta
            </label>
            <input
              type="text"
              value={cuencaVenta}
              onChange={(e) => setCuencaVenta(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] shadow-sm"
            />
          </div>

          {/* Rodeo Alta Producción */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-end w-full">
              <label className="text-xs font-semibold text-[#374151]">
                Rodeo Alta Producción
              </label>
              <span className="text-[10px] font-bold text-[#4B5563] mb-0.5">
                $/cab/día
              </span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs text-[#374151] font-medium">
                $
              </span>
              <input
                type="text"
                value={costoAlta}
                onChange={(e) => setCostoAlta(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] shadow-sm"
              />
            </div>
          </div>

          {/* Rodeo Baja Producción */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-end w-full">
              <label className="text-xs font-semibold text-[#374151]">
                Rodeo Baja Producción
              </label>
              <span className="text-[10px] font-bold text-[#4B5563] mb-0.5">
                $/cab/día
              </span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs text-[#374151] font-medium">
                $
              </span>
              <input
                type="text"
                value={costoBaja}
                onChange={(e) => setCostoBaja(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] shadow-sm"
              />
            </div>
          </div>

          {/* Rodeo Vacas Secas */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-end w-full">
              <label className="text-xs font-semibold text-[#374151]">
                Rodeo Vacas Secas
              </label>
              <span className="text-[10px] font-bold text-[#4B5563] mb-0.5">
                $/cab/día
              </span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs text-[#374151] font-medium">
                $
              </span>
              <input
                type="text"
                value={costoSecas}
                onChange={(e) => setCostoSecas(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] shadow-sm"
              />
            </div>
          </div>

          {/* DEL Promedio Estimado */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#374151]">
              DEL Promedio Estimado (Días de Lactancia)
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={delPromedio}
                onChange={(e) => setDelPromedio(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-white border border-[#D1D5DB] text-[#374151] rounded-lg focus:outline-none focus:border-[#65A30D] pr-12 shadow-sm"
              />
              <span className="absolute right-4 text-[10px] font-bold text-[#9CA3AF] tracking-wider">
                DÍAS
              </span>
            </div>
          </div>

          {/* Botones de Acción exactamente igual a la paleta e interletrado del Figma */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              type="button"
              className="px-8 py-2.5 bg-[#8B9BB4] hover:bg-[#76869E] text-white text-xs font-extrabold rounded-md transition-colors tracking-wider uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-[#65A30D] hover:bg-[#52840A] text-white text-xs font-extrabold rounded-md transition-colors tracking-wider uppercase shadow-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
