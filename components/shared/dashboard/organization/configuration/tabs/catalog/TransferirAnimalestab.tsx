'use client'
import { useState } from 'react'
import { Calendar, AlertTriangle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type TransferenciaStatus = 'EN CURSO' | 'PRÓXIMO VENCIMIENTO' | 'PLANIFICADO'

interface Transferencia {
  id: number
  desde: string
  hacia: string
  cantidadTexto: string
  motivo: string
  status: TransferenciaStatus
  infoRetornoTexto: string
  infoRetornoValor: string
  tipoIcono: 'animal' | 'medica' | 'calendario'
}

// DATOS QUEMADOS EXACTOS DE FIGMA (image_365167.png)
const TRANSFERENCIAS_ACTIVAS: Transferencia[] = [
  {
    id: 1,
    desde: 'Cría A',
    hacia: 'Recría',
    cantidadTexto: '12 Terneros Holando',
    motivo: 'Motivo: Engorde Estacional',
    status: 'EN CURSO',
    infoRetornoTexto: 'Fecha de Retorno',
    infoRetornoValor: 'En 5 días',
    tipoIcono: 'animal',
  },
  {
    id: 2,
    desde: 'Lote 2',
    hacia: 'Sanidad',
    cantidadTexto: '4 Vaquillonas',
    motivo: 'Motivo: Vacunación Aftosa',
    status: 'PRÓXIMO VENCIMIENTO',
    infoRetornoTexto: 'Fecha de Retorno',
    infoRetornoValor: 'Mañana',
    tipoIcono: 'medica',
  },
  {
    id: 3,
    desde: 'Pradera B',
    hacia: 'Cabaña',
    cantidadTexto: '25 Novillos',
    motivo: 'Motivo: Clasificación genética',
    status: 'PLANIFICADO',
    infoRetornoTexto: 'Inicio Programado',
    infoRetornoValor: '24 Jun,2026',
    tipoIcono: 'calendario',
  },
]

export default function TransferirAnimalesTab() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [plazo, setPlazo] = useState('')
  const [motivo, setMotivo] = useState('')

  return (
    <div className="w-full bg-white font-sans antialiased">
      {/* Contenedor principal en Grid sin cajas grises de fondo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-[1240px] mx-auto pt-4 pb-12 px-4">
        {/* COLUMNA IZQUIERDA: Formulario Limpio estilo Figma */}
        <div className="lg:col-span-5 flex flex-col">
          <h2 className="text-[16px] font-bold text-black mb-6 tracking-tight">
            Nueva Transferencia
          </h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Rodeo Origen */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-gray-700">
                Rodeo Origen
              </label>
              <div className="relative">
                <select
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-400 outline-none appearance-none focus:border-emerald-600 focus:text-black transition-colors"
                >
                  <option value="">Seleccionar</option>
                  <option value="cria_a">Cría A (120 cab)</option>
                  <option value="rodeo_alta">Rodeo Alta (120 cab)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Rodeo Destino */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-gray-700">
                Rodeo Destino
              </label>
              <div className="relative">
                <select
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-400 outline-none appearance-none focus:border-emerald-600 focus:text-black transition-colors"
                >
                  <option value="">Seleccionar</option>
                  <option value="recria">Recría</option>
                  <option value="rodeo_baja">Rodeo Baja (80 cab)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Cantidad de Animales */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-gray-700">
                Cantidad de Animales
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="00"
                  className="w-full h-10 pl-3 pr-20 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-emerald-600 transition-colors"
                />
                <span className="absolute right-4 text-sm font-medium text-gray-400 pointer-events-none">
                  Cabezas
                </span>
              </div>
            </div>

            {/* Plazos de Retorno */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-gray-700">
                Plazos de Retorno (Días)
              </label>
              <input
                type="text"
                value={plazo}
                onChange={(e) => setPlazo(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-emerald-600 transition-colors"
              />
            </div>

            {/* Motivo */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-gray-700">
                Motivo de transferencia
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={4}
                className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 outline-none resize-none focus:border-emerald-600 transition-colors"
              />
            </div>

            {/* Botón Ejecutar */}
            <button
              type="submit"
              className="w-full h-11 mt-4 bg-[#217B53] hover:bg-[#195F40] text-white font-bold rounded-lg transition-all text-sm flex items-center justify-center shadow-none"
            >
              Ejecutar Transferencia
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: Tarjetas de Transferencias Activas estilo Figma */}
        <div className="lg:col-span-7 flex flex-col">
          <h2 className="text-[16px] font-bold text-black mb-6 tracking-tight">
            Transferencias Activas
          </h2>

          <div className="flex flex-col gap-5">
            {TRANSFERENCIAS_ACTIVAS.map((item) => {
              const isEnCurso = item.status === 'EN CURSO'
              const isVencimiento = item.status === 'PRÓXIMO VENCIMIENTO'

              const borderLeftColor = isEnCurso
                ? 'bg-[#4B8A21]'
                : isVencimiento
                  ? 'bg-[#DE2100]'
                  : 'bg-[#949494]'

              const badgeColor = isEnCurso
                ? 'bg-[#1D7952] text-white'
                : isVencimiento
                  ? 'bg-[#DE2100] text-white'
                  : 'bg-[#929292] text-white'

              return (
                <div
                  key={item.id}
                  className="flex bg-white rounded-xl border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.05)] overflow-hidden min-h-[120px]"
                >
                  {/* Línea lateral de color */}
                  <div
                    className={cn('w-[6px] h-full shrink-0', borderLeftColor)}
                  />

                  {/* Contenido Interno de la Tarjeta */}
                  <div className="w-full p-5 flex flex-col justify-between">
                    {/* Fila Superior: Rutas y Estado */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 tracking-widest">
                        <div className="flex flex-col">
                          <span>DESDE</span>
                          <span className="text-xs font-semibold text-gray-800 mt-1">
                            {item.desde}
                          </span>
                        </div>
                        <ArrowRight
                          size={14}
                          className="text-gray-400 mt-4 mx-1"
                        />
                        <div className="flex flex-col">
                          <span>HASTA</span>
                          <span className="text-xs font-semibold text-gray-800 mt-1">
                            {item.hacia}
                          </span>
                        </div>
                      </div>

                      <span
                        className={cn(
                          'px-2.5 py-1 text-[9px] font-extrabold rounded-md tracking-wider',
                          badgeColor
                        )}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Fila Inferior: Icono, Cantidad y Tiempos */}
                    <div className="flex items-end justify-between pt-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {item.tipoIcono === 'animal' && (
                            <span className="text-xl text-emerald-800">🐾</span>
                          )}
                          {item.tipoIcono === 'medica' && (
                            <div className="w-[18px] h-[18px] rounded-full border-[2px] border-red-500 flex items-center justify-center text-red-500 font-extrabold text-[11px]">
                              +
                            </div>
                          )}
                          {item.tipoIcono === 'calendario' && (
                            <Calendar size={18} className="text-emerald-800" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-900">
                            {item.cantidadTexto}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {item.motivo}
                          </span>
                        </div>
                      </div>

                      {/* Tiempos / Alertas */}
                      <div className="flex flex-col items-end text-right">
                        <span className="text-[10px] font-bold text-gray-400 tracking-tight">
                          {item.infoRetornoTexto}
                        </span>
                        <span
                          className={cn(
                            'text-[13px] font-black mt-0.5 flex items-center gap-1',
                            isEnCurso && 'text-[#1D7952]',
                            isVencimiento && 'text-[#DE2100]',
                            item.status === 'PLANIFICADO' && 'text-gray-900'
                          )}
                        >
                          {isVencimiento && (
                            <AlertTriangle
                              size={12}
                              className="text-[#DE2100] stroke-[3]"
                            />
                          )}
                          {item.infoRetornoValor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
