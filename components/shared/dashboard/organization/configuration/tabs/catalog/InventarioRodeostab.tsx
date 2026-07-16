'use client'

import { useState } from 'react'
import {
  Pencil,
  ArrowRight,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  ArrowLeft,
  Search,
  ChevronDown,
  MoreVertical,
} from 'lucide-react'

// ==========================================
// 1. ICONOS PERSONALIZADOS (SVG DE FIGMA)
// ==========================================
const IconRodeoAlto = () => (
  <svg
    className="w-5 h-5 text-[#2E7D32]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
)

const IconRodeoBajo = () => (
  <svg
    className="w-5 h-5 text-[#2E7D32]"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
)

const IconRodeoSecas = () => (
  <svg
    className="w-5 h-5 text-[#2E7D32]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <circle cx="12" cy="12" r="5" />
    <path
      strokeLinecap="round"
      d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
    />
  </svg>
)

// ==========================================
// 2. FUENTES DE DATOS (MOCKS)
// ==========================================
const RODEOS = [
  {
    id: 'alto',
    nombre: 'Rodeo Alto',
    subtitulo: 'Producción Intensiva',
    cabezas: 142,
    colorCabezas: 'text-[#5B8F22]',
    icon: <IconRodeoAlto />,
    hasAction: true,
  },
  {
    id: 'bajo',
    nombre: 'Rodeo Bajo',
    subtitulo: 'Recría y Mantenimiento',
    cabezas: 89,
    colorCabezas: 'text-[#5B8F22]',
    icon: <IconRodeoBajo />,
    hasAction: false,
  },
  {
    id: 'secas',
    nombre: 'Rodeo Secas',
    subtitulo: 'Período de Reposo',
    cabezas: 34,
    colorCabezas: 'text-[#5B8F22]',
    icon: <IconRodeoSecas />,
    hasAction: false,
  },
]

const MOVIMIENTOS = [
  {
    fecha: '12/05/2025',
    origen: 'Rodeo Bajo',
    destino: 'Rodeo Alto',
    cantidad: 12,
    motivo: 'Fin recría +- Criterio producción',
    usuario: 'R. Maidana',
  },
  {
    id: 2,
    fecha: '10/05/2025',
    origen: 'Rodeo Alto',
    destino: 'Rodeo Secas',
    cantidad: 5,
    motivo: 'Inicio período secado',
    usuario: 'M. Silvia',
  },
  {
    fecha: '08/05/2025',
    origen: 'Stock Gral.',
    destino: 'Rodeo Bajo',
    cantidad: 8,
    motivo: 'Cuarentena Finalizada',
    usuario: 'R. Maidana',
  },
]

const ANIMALES = [
  {
    rp: '0001',
    nombre: 'Mancha',
    categoria: 'Ordeñe',
    del: 85,
    prod: '11L',
    estado: 'Sana',
    obs: '——',
  },
  {
    rp: '0002',
    nombre: 'Pintas',
    categoria: 'Ordeñe',
    del: 102,
    prod: '9.5 L',
    estado: 'Sana',
    obs: '——',
  },
  {
    rp: '0003',
    nombre: 'Lucía',
    categoria: 'Ordeñe',
    del: 67,
    prod: '12 L',
    estado: 'Sana',
    obs: '——',
  },
  {
    rp: '0004',
    nombre: 'Colorado',
    categoria: 'Ordeñe',
    del: 145,
    prod: '—— (descarte)',
    estado: 'En tratamiento',
    obs: 'Antibiótico - 3dias',
  },
  {
    rp: '0005',
    nombre: 'Ñata',
    categoria: 'Ordeñe',
    del: 210,
    prod: '—— (descarte)',
    estado: 'En tratamiento',
    obs: 'Mastitis - 1 día',
  },
]

// ==========================================
// 3. COMPONENTE EXPORTADO PRINCIPAL
// ==========================================
export default function InventarioRodeosTab() {
  // Estado para controlar qué vista renderizar ('inventario' o 'plantel')
  const [vistaActiva, setVistaActiva] = useState<'inventario' | 'plantel'>(
    'inventario'
  )

  // Renderizado condicional basado en la navegación
  if (vistaActiva === 'plantel') {
    return (
      <PlantelIndividualView onVolver={() => setVistaActiva('inventario')} />
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-12 bg-[#F8FAFC] p-8 rounded-xl font-sans antialiased text-slate-800">
      {/* 1. Encabezado de la sección */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Inventario de Rodeos
        </h2>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#7CA122] hover:bg-[#6b8c1d] rounded-lg transition-colors shadow-sm">
          <UserPlus size={16} />
          Registrar Alta
        </button>
      </div>

      {/* 2. Tarjetas de Rodeos (3 Columnas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RODEOS.map((rodeo) => (
          <div
            key={rodeo.id}
            className="border border-slate-100 rounded-2xl p-6 bg-white flex flex-col justify-between shadow-sm relative min-h-[180px]"
          >
            {/* Icono de edición (esquina superior derecha) */}
            <button className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors">
              <Pencil
                size={15}
                strokeWidth={2.5}
                className="w-4 h-4 transform rotate-90"
              />
            </button>

            {/* Contenido Principal */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#2E7D32]">{rodeo.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {rodeo.nombre}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {rodeo.subtitulo}
                  </p>
                </div>
              </div>

              {/* Métrica Cabezas */}
              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className={`text-3xl font-extrabold tracking-tight ${rodeo.colorCabezas}`}
                >
                  {rodeo.cabezas}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  cabezas
                </span>
              </div>
            </div>

            {/* Botón de acción opcional - CONEXIÓN CON VISTA DETALLE */}
            {rodeo.hasAction && (
              <div className="mt-4">
                <button
                  onClick={() => setVistaActiva('plantel')} // <-- Cambia a la vista del plantel
                  className="px-3 py-1.5 text-xs font-extrabold text-[#1E4620] bg-[#90B8B3]/35 hover:bg-[#90B8B3]/50 rounded-lg transition-colors"
                >
                  Ver Animales
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Sección Accesos Directos (Altas y Bajas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
        {/* Registro de Altas */}
        <div className="bg-[#D3E4DB]/80 rounded-2xl p-5 flex flex-col gap-4 border border-[#C5D9CE]">
          <div className="flex items-center gap-2 text-[#0A5C36] font-bold text-sm">
            <div className="flex items-center justify-center border border-[#0A5C36] rounded p-0.5 bg-[#D3E4DB]">
              <Plus size={12} strokeWidth={3} />
            </div>
            <span>Registro de Altas</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Nacimientos */}
            <button className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm text-left">
              <span className="font-bold text-[#0A5C36] text-xs">
                Nacimientos
              </span>
              <ArrowRight size={14} className="text-[#0A5C36]" />
            </button>
            {/* Compras Externas */}
            <button className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm text-left">
              <span className="font-bold text-[#0A5C36] text-xs">
                Compras Externas
              </span>
              <ArrowRight size={14} className="text-[#0A5C36]" />
            </button>
          </div>
        </div>

        {/* Registro de Bajas */}
        <div className="bg-[#EAE6E6]/80 rounded-2xl p-5 flex flex-col gap-4 border border-[#DDD3D3]">
          <div className="flex items-center gap-2 text-[#C62828] font-bold text-sm">
            <div className="flex items-center justify-center border border-[#C62828] rounded p-0.5 bg-[#EAE6E6]">
              <Minus size={12} strokeWidth={3} />
            </div>
            <span>Registro de Bajas</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Venta de Animales */}
            <button className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm text-left">
              <span className="font-bold text-[#D32F2F] text-xs">
                Venta de Animales
              </span>
              <ArrowRight size={14} className="text-[#D32F2F]" />
            </button>
            {/* Otras Causas */}
            <button className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm text-left">
              <span className="font-bold text-[#D32F2F] text-xs">
                Otras Causas
              </span>
              <ArrowRight size={14} className="text-[#D32F2F]" />
            </button>
          </div>
        </div>

        {/* Espacio vacío para la simetría */}
        <div className="hidden md:block"></div>
      </div>

      {/* 4. Tabla de Historial de Movimientos */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Historial de Movimientos
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Fecha</th>
                  <th className="py-3.5 px-6">Origen</th>
                  <th className="py-3.5 px-6">Destino</th>
                  <th className="py-3.5 px-6 text-center">Cantidad</th>
                  <th className="py-3.5 px-6">Motivo</th>
                  <th className="py-3.5 px-6">Usuario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                {MOVIMIENTOS.map((mov, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      {mov.fecha}
                    </td>
                    <td className="py-3.5 px-6 text-slate-500 font-medium">
                      {mov.origen}
                    </td>
                    <td className="py-3.5 px-6 text-[#15803d] font-bold">
                      {mov.destino}
                    </td>
                    <td className="py-3.5 px-6 text-center font-extrabold text-slate-950">
                      {mov.cantidad}
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 font-medium">
                      {mov.motivo}
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 font-medium">
                      {mov.usuario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer de Paginación */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-white text-slate-400 text-[11px] font-bold">
            <div>Mostrando 3 de 15 registros</div>
            <div className="flex gap-1.5">
              <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-slate-400">
                <ChevronLeft size={14} />
              </button>
              <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-slate-400">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 4. SUB-COMPONENTE: VISTA PLANTEL INDIVIDUAL
// ==========================================
interface PlantelIndividualViewProps {
  onVolver: () => void
}

function PlantelIndividualView({ onVolver }: PlantelIndividualViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('Todos')

  return (
    <div className="flex flex-col gap-6 w-full pb-12 bg-[#F8FAFC] p-8 rounded-xl font-sans antialiased text-slate-800">
      {/* Botón para regresar al inventario principal */}
      <button
        onClick={onVolver}
        className="self-start flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-700 transition-colors mb-2"
      >
        <ArrowLeft size={14} strokeWidth={2.5} />
        <span>Volver a Inventario</span>
      </button>

      {/* 1. Encabezado de la sección */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Plantel Individual
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          Seguimiento por animal-RP, nombre, estado y producción individual
        </p>
      </div>

      {/* Subnavegador / Pestañas secundarias */}
      <div className="border-b border-slate-100 pb-2">
        <span className="text-xs font-bold text-[#0A5C36] border-b-2 border-[#0A5C36] pb-2.5 px-1">
          Inventario Activo
        </span>
      </div>

      {/* 2. Cabecera del Detalle de Plantel */}
      <div className="flex items-center justify-between mt-2">
        <h3 className="font-extrabold text-slate-900 text-sm">
          Detalle de Plantel: <span className="text-slate-500">Rodeo Alto</span>
        </h3>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#7CA122] hover:bg-[#6b8c1d] rounded-lg transition-colors shadow-sm">
            <UserPlus size={14} />
            Registrar Alta
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#D32F2F] hover:bg-[#b71c1c] rounded-lg transition-colors shadow-sm">
            <Minus size={14} strokeWidth={2.5} />
            Baja
          </button>
        </div>
      </div>

      {/* 3. Tarjetas de Resumen Métrico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Plantel */}
        <div className="border border-slate-100 rounded-2xl p-5 bg-white flex flex-col justify-between shadow-sm min-h-[110px]">
          <span className="text-xs font-extrabold text-slate-400">
            Total Plantel
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-900">44 cab</span>
            <span className="text-[11px] font-bold text-slate-400">
              38 ordeñe - 6 secas
            </span>
          </div>
        </div>

        {/* En Tratamiento */}
        <div className="border border-slate-100 rounded-2xl p-5 bg-[#EAE6E6]/30 flex flex-col justify-between shadow-sm min-h-[110px]">
          <span className="text-xs font-extrabold text-slate-500">
            En Tratamiento
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-[#D32F2F]">2 cab</span>
            <span className="text-[11px] font-bold text-[#D32F2F]">
              Leche descartada hoy
            </span>
          </div>
        </div>

        {/* Prod. Promedio/Vaca */}
        <div className="border border-slate-100 rounded-2xl p-5 bg-[#D3E4DB]/30 flex flex-col justify-between shadow-sm min-h-[110px]">
          <span className="text-xs font-extrabold text-[#0A5C36]">
            Prod. Promedio/Vaca
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-[#0A5C36]">10.0L</span>
            <span className="text-[11px] font-bold text-[#0A5C36]">
              Vacas en ordeñe
            </span>
          </div>
        </div>
      </div>

      {/* 4. Filtros de Búsqueda y Dropdown */}
      <div className="flex items-center gap-4 mt-2">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3.5 top-3.5 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar por RP o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-300 transition-colors placeholder-slate-400"
          />
        </div>

        <div className="relative">
          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="bg-white border border-slate-100 rounded-xl pl-4 pr-10 py-2.5 text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:border-slate-300 transition-colors"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Sana">Sana</option>
            <option value="Tratamiento">En tratamiento</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* 5. Tabla de Listado de Animales */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">RP/N°</th>
                <th className="py-3.5 px-6">Nombre</th>
                <th className="py-3.5 px-6">Categoría</th>
                <th className="py-3.5 px-6">DEL (Días de Leche)</th>
                <th className="py-3.5 px-6">Prod. Hoy</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6">OBS.</th>
                <th className="py-3.5 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
              {ANIMALES.map((animal) => (
                <tr
                  key={animal.rp}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    {animal.rp}
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-slate-700">
                    {animal.nombre}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="bg-[#D3E4DB]/50 text-[#0A5C36] px-2.5 py-1 rounded-lg text-[10px] font-black uppercase">
                      {animal.categoria}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-slate-800">
                    {animal.del}
                  </td>
                  <td className="py-3.5 px-6">
                    {animal.prod.includes('descarte') ? (
                      <span className="text-[#D32F2F] font-bold">
                        {animal.prod}
                      </span>
                    ) : (
                      <span className="text-slate-900 font-extrabold">
                        {animal.prod}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${animal.estado === 'Sana' ? 'bg-[#7CA122]' : 'bg-[#D32F2F]'}`}
                      />
                      <span
                        className={
                          animal.estado === 'Sana'
                            ? 'text-slate-700 font-bold'
                            : 'text-[#D32F2F] font-bold'
                        }
                      >
                        {animal.estado}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-3.5 px-6 text-[11px] ${animal.obs !== '——' ? 'text-[#D32F2F] font-bold' : 'text-slate-400 font-medium'}`}
                  >
                    {animal.obs}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de Paginación */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-white text-slate-400 text-[11px] font-bold">
          <div>Mostrando 5 de 15 registros</div>
          <div className="flex gap-1.5">
            <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-slate-400">
              <ChevronLeft size={14} />
            </button>
            <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-slate-400">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
