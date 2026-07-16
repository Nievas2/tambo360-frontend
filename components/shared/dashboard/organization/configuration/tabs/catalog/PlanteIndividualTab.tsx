'use client'

import React, { useState } from 'react'
import {
  Search,
  ChevronDown,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ArrowLeft,
} from 'lucide-react'

interface PlantelIndividualTabProps {
  onBack: () => void
}

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

export default function PlantelIndividualTab({
  onBack,
}: PlantelIndividualTabProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('Todos')

  return (
    <div className="flex flex-col gap-6 w-full pb-12 bg-[#F8FAFC] p-8 rounded-xl font-sans antialiased text-slate-800">
      {/* Botón de Regresar */}
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Volver a Inventario</span>
      </button>

      {/* 1. Encabezado de la sección */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Plantel Individual
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          Seguimiento por animal-RP, nombre, estado y producción individual
        </p>
      </div>

      {/* Sub-navegador / Breadcrumb */}
      <div className="border-b border-slate-100 pb-2">
        <span className="text-xs font-bold text-[#0A5C36] border-b-2 border-[#0A5C36] pb-2.5 px-1 cursor-pointer">
          Inventario Activo
        </span>
      </div>

      {/* 2. Detalle de Plantel & Acciones de Altas/Bajas */}
      <div className="flex items-center justify-between mt-2">
        <h3 className="font-extrabold text-slate-900 text-sm">
          Detalle de Plantel: <span className="text-slate-500">Rodeo Alto</span>
        </h3>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold text-white bg-[#7CA122] hover:bg-[#6b8c1d] rounded-xl transition-colors shadow-sm">
            <Plus size={14} strokeWidth={3} />
            Registrar Alta
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold text-white bg-[#D32F2F] hover:bg-[#b71c1c] rounded-xl transition-colors shadow-sm">
            <Minus size={14} strokeWidth={3} />
            Baja
          </button>
        </div>
      </div>

      {/* 3. Tarjetas Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Plantel */}
        <div className="border border-slate-100 rounded-2xl p-5 bg-white flex flex-col justify-between shadow-sm min-h-[110px]">
          <span className="text-xs font-extrabold text-slate-900">
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
          <span className="text-xs font-extrabold text-slate-900">
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
          <span className="text-xs font-extrabold text-slate-900">
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

      {/* 4. Filtros de Búsqueda */}
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

      {/* 5. Tabla de Animales */}
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

                  {/* Celda de Categoría Rediseñada al Estilo Figma exacto */}
                  <td className="py-3.5 px-6">
                    <span className="bg-[#6E9E85]/20 text-[#224231] px-2 py-0.5 rounded-md text-[10px] font-extrabold leading-normal inline-block tracking-wide">
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
  )
}
