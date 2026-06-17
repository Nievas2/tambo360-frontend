'use client'
import { useState } from 'react'
import { Pencil, ArrowUpRight, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const RODEOS = [
  {
    id: 'alto',
    nombre: 'Rodeo Alto',
    subtitulo: 'Producción Intensiva',
    cabezas: 142,
    metricaEtiqueta: 'Eficiencia',
    metricaValor: '94%',
    icon: <ArrowUpRight className="w-4 h-4 text-[#00A36C]" />,
  },
  {
    id: 'bajo',
    nombre: 'Rodeo Bajo',
    subtitulo: 'Recría y Mantenimiento',
    cabezas: 89,
    metricaEtiqueta: 'Salud',
    metricaValor: 'Óptima',
    icon: <span className="w-3 h-3 rounded-full bg-[#00A36C] inline-block" />,
  },
  {
    id: 'secas',
    nombre: 'Rodeo Secas',
    subtitulo: 'Periodo de Reposo',
    cabezas: 34,
    metricaEtiqueta: 'Prox. Partos',
    metricaValor: '12',
    icon: (
      <span className="text-amber-500 font-bold text-base leading-none">
        ☀️
      </span>
    ),
  },
]

const MOVIMIENTOS = [
  {
    fecha: '12/05/2026',
    origen: 'Rodeo Bajo',
    destino: 'Rodeo Alto',
    cantidad: 12,
    motivo: 'Fin recría — Criterio producción',
    usuario: 'R. Maidana',
  },
  {
    fecha: '10/05/2026',
    origen: 'Rodeo Alto',
    destino: 'Rodeo Secas',
    cantidad: 5,
    motivo: 'Inicio periodo secado',
    usuario: 'M. Silvia',
  },
  {
    fecha: '08/05/2026',
    origen: 'Stock Gral.',
    destino: 'Rodeo Bajo',
    cantidad: 8,
    motivo: 'Cuarentena Finalizada',
    usuario: 'R. Maidana',
  },
]

export default function InventarioRodeosTab() {
  return (
    <div className="flex flex-col gap-6 w-full pb-12 bg-gray-50/50 p-6 rounded-xl font-sans antialiased">
      {/* Encabezado de la sección con botón de acción principal */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Inventario de Rodeos
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#65A30D] hover:bg-[#4D7C0F] rounded-xl transition-all shadow-sm">
          Nueva Alta
        </button>
      </div>

      {/* 1. Tarjetas de rodeos MEJORADAS (Estructura y estilos del segundo diseño) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RODEOS.map((rodeo) => (
          <div
            key={rodeo.id}
            className="border border-gray-200/80 rounded-2xl p-5 bg-white flex flex-col justify-between shadow-sm relative h-[175px]"
          >
            {/* Icono lápiz arriba a la derecha */}
            <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors">
              <Pencil size={16} strokeWidth={1.5} />
            </button>

            {/* Bloque Superior: Icono + Títulos */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-4 h-4 shrink-0">
                  {rodeo.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-[15px] leading-tight">
                    {rodeo.nombre}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {rodeo.subtitulo}
                  </p>
                </div>
              </div>

              {/* Número de cabezas grande */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-[#00A36C]">
                  {rodeo.cabezas}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  cabezas
                </span>
              </div>
            </div>

            {/* Métrica inferior: Todo junto a la izquierda sin espacios vacíos */}
            <div className="border-t border-gray-100 pt-3 flex items-center gap-1 text-[13px]">
              <span className="text-gray-400 font-medium">
                {rodeo.metricaEtiqueta}:
              </span>
              <span className="font-bold text-[#0F172A]">
                {rodeo.metricaValor}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Sección Accesos Directos de Registro de Altas y Bajas INTACETA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4 border-t border-b border-gray-100 py-6">
        {/* Registro de Altas */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <Plus
              size={18}
              className="border border-emerald-600 rounded p-0.5"
            />
            <span>Registro de Altas</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pl-7">
            <div>
              <p className="font-bold text-gray-800 text-sm">Nacimientos</p>
              <p className="text-xs text-gray-400">Registrar nuevos terneros</p>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">
                Compras Externas
              </p>
              <p className="text-xs text-gray-400">
                Ingreso de nuevos animales
              </p>
            </div>
          </div>
        </div>

        {/* Registro de Bajas */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
            <Minus size={18} className="border border-rose-500 rounded p-0.5" />
            <span>Registro de Bajas</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pl-7">
            <div>
              <p className="font-bold text-gray-800 text-sm">Ventas</p>
              <p className="text-xs text-gray-400">
                Egresos por comercialización
              </p>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Otras causas</p>
              <p className="text-xs text-gray-400">
                Decesos o descartes técnicos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tabla de Historial de Movimientos INTACTA */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-gray-700 tracking-tight">
          Historial de Movimientos
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-6">Fecha</th>
                  <th className="py-3 px-6">Origen</th>
                  <th className="py-3 px-6">Destino</th>
                  <th className="py-3 px-6 text-center">Cantidad</th>
                  <th className="py-3 px-6">Motivo</th>
                  <th className="py-3 px-6">Usuario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {MOVIMIENTOS.map((mov, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-semibold text-gray-900">
                      {mov.fecha}
                    </td>
                    <td className="py-3.5 px-6 text-gray-500">{mov.origen}</td>
                    <td className="py-3.5 px-6 text-emerald-600 font-semibold">
                      {mov.destino}
                    </td>
                    <td className="py-3.5 px-6 text-center font-bold text-gray-900">
                      {mov.cantidad}
                    </td>
                    <td className="py-3.5 px-6 text-gray-500 font-normal text-xs">
                      {mov.motivo}
                    </td>
                    <td className="py-3.5 px-6 text-gray-400 text-xs">
                      {mov.usuario}
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
