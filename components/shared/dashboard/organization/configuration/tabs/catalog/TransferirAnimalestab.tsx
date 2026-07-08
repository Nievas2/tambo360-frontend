'use client'
import { useState } from 'react'
import {
  Calendar,
  AlertTriangle,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Footprints,
} from 'lucide-react'
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
    infoRetornoValor: '24 Jun, 2028',
    tipoIcono: 'calendario',
  },
]

export default function TransferirAnimalesTab() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [plazo, setPlazo] = useState('')
  const [motivo, setMotivo] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="w-full bg-[#FAFAFA] font-sans antialiased min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1280px] mx-auto pt-6 pb-12 px-6">
        {/* COLUMNA IZQUIERDA: Formulario Nueva Transferencia */}
        <div className="lg:col-span-5 flex flex-col bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
          <h2 className="text-[15px] font-bold text-gray-900 mb-6 tracking-tight">
            Nueva Transferencia
          </h2>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Rodeo Origen */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">
                Rodeo Origen
              </label>
              <div className="relative">
                <select
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-400 outline-none appearance-none focus:border-emerald-600 focus:text-black transition-colors"
                >
                  <option value="">Seleccionar</option>
                  <option value="cria_a">Cría A</option>
                  <option value="lote_2">Lote 2</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Rodeo Destino */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">
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
                  <option value="sanidad">Sanidad</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Cantidad de Animales */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">
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
                <span className="absolute right-4 text-xs font-semibold text-gray-400 pointer-events-none">
                  Cabezas
                </span>
              </div>
            </div>

            {/* Plazos de Retorno */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">
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
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">
                Motivo de transferencia
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={3}
                className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 outline-none resize-none focus:border-emerald-600 transition-colors"
              />
            </div>

            {/* Botón Ejecutar */}
            <button
              type="submit"
              className="w-full h-11 mt-2 bg-[#217B53] hover:bg-[#195F40] text-white font-bold rounded-lg transition-all text-sm flex items-center justify-center tracking-wide shadow-none"
            >
              Ejecutar Transferencia
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: Listado y Filtros Superiores */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Cabecera de control: Título, buscador y filtro */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">
              Transferencias Activas
            </h2>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="relative w-48 sm:w-56">
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-gray-200 rounded-md outline-none text-gray-700 focus:border-emerald-600"
                />
                <Search
                  size={12}
                  className="absolute left-2.5 inset-y-0 my-auto text-gray-400"
                />
              </div>
              <button className="h-8 w-8 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50">
                <SlidersHorizontal size={13} />
              </button>
            </div>
          </div>

          {/* Pastillas / Badges de conteo */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-[#1A3A2B] text-white text-[11px] font-bold rounded-md cursor-pointer">
              Todas
            </span>
            <span className="px-3 py-1 bg-[#DE2100] text-white text-[11px] font-bold rounded-md cursor-pointer flex items-center gap-1">
              Alertas{' '}
              <span className="bg-white/20 px-1 rounded text-[10px]">3</span>
            </span>
            <span className="px-3 py-1 bg-[#76BA1B] text-white text-[11px] font-bold rounded-md cursor-pointer flex items-center gap-1">
              En Curso{' '}
              <span className="bg-white/20 px-1 rounded text-[10px]">12</span>
            </span>
            <span className="px-3 py-1 bg-[#626262] text-white text-[11px] font-bold rounded-md cursor-pointer flex items-center gap-1">
              Planificadas{' '}
              <span className="bg-white/20 px-1 rounded text-[10px]">5</span>
            </span>
          </div>

          {/* Listado de Tarjetas */}
          <div className="flex flex-col gap-4">
            {TRANSFERENCIAS_ACTIVAS.map((item) => {
              const isEnCurso = item.status === 'EN CURSO'
              const isVencimiento = item.status === 'PRÓXIMO VENCIMIENTO'

              const borderLeftColor = isEnCurso
                ? 'bg-[#4B8A21]'
                : isVencimiento
                  ? 'bg-[#DE2100]'
                  : 'bg-[#949494]'

              const badgeColor = isEnCurso
                ? 'bg-[#E3F2ED] text-[#1D7952]'
                : isVencimiento
                  ? 'bg-[#DE2100] text-white'
                  : 'bg-[#EDEDED] text-[#626262]'

              return (
                <div
                  key={item.id}
                  className="flex bg-white rounded-xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden min-h-[115px]"
                >
                  {/* Línea lateral de color */}
                  <div
                    className={cn('w-[5px] h-full shrink-0', borderLeftColor)}
                  />

                  {/* Contenido Interno */}
                  <div className="w-full p-4 flex flex-col justify-between">
                    {/* Fila Superior: Rutas y Estado */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 tracking-wider">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-extrabold text-gray-400">
                            DESDE
                          </span>
                          <span className="text-xs font-bold text-gray-700 mt-0.5">
                            {item.desde}
                          </span>
                        </div>
                        <ArrowRight
                          size={12}
                          className="text-gray-400 mt-3 mx-0.5"
                        />
                        <div className="flex flex-col">
                          <span className="text-[9px] font-extrabold text-gray-400">
                            HASTA
                          </span>
                          <span className="text-xs font-bold text-gray-700 mt-0.5">
                            {item.hacia}
                          </span>
                        </div>
                      </div>

                      <span
                        className={cn(
                          'px-2 py-0.5 text-[9px] font-extrabold rounded-md tracking-wide',
                          badgeColor
                        )}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Fila Inferior: Icono, Info y Tiempos */}
                    <div className="flex items-end justify-between pt-3">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-emerald-800">
                          {item.tipoIcono === 'animal' && (
                            <Footprints size={18} className="text-[#217B53]" />
                          )}
                          {item.tipoIcono === 'medica' && (
                            <div className="w-[18px] h-[18px] rounded-full border-2 border-[#DE2100] flex items-center justify-center text-[#DE2100] font-black text-[10px]">
                              +
                            </div>
                          )}
                          {item.tipoIcono === 'calendario' && (
                            <Calendar size={18} className="text-gray-500" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-900">
                            {item.cantidadTexto}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium">
                            {item.motivo}
                          </span>
                        </div>
                      </div>

                      {/* Info de Retorno / Alerta */}
                      <div className="flex flex-col items-end text-right">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">
                          {item.infoRetornoTexto}
                        </span>
                        <span
                          className={cn(
                            'text-[12px] font-extrabold mt-0.5 flex items-center gap-1',
                            isEnCurso && 'text-[#4B8A21]',
                            isVencimiento && 'text-[#DE2100]',
                            item.status === 'PLANIFICADO' && 'text-gray-700'
                          )}
                        >
                          {isVencimiento && (
                            <AlertTriangle
                              size={11}
                              className="text-[#DE2100] fill-[#DE2100]/10"
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
