'use client'
import { Pencil, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

// Datos hardcodeados hasta que el backend tenga el endpoint de rodeos
const RODEOS = [
  {
    id: 'alta',
    nombre: 'Rodeo Alta Producción',
    cabezas: 120,
    racion: 4.5,
    gastoDiario: 540,
    del: 165,
    color: 'bg-[#22C55E]',
    textColor: 'text-[#16A34A]',
  },
  {
    id: 'baja',
    nombre: 'Rodeo Baja Producción',
    cabezas: 80,
    racion: 2.8,
    gastoDiario: 224,
    del: 240,
    color: 'bg-[#F59E0B]',
    textColor: 'text-[#D97706]',
  },
  {
    id: 'secas',
    nombre: 'Vacas Secas (Preparto)',
    cabezas: 20,
    racion: 1.5,
    gastoDiario: 30,
    partoEstimado: '25/06',
    color: 'bg-[#C084FC]',
    textColor: 'text-[#374151]',
  },
]

const ALTAS_MES = {
  total: '+8',
  detalles: [
    { cant: '5 cab', destino: 'Rodeo Alta', motivo: 'Compra' },
    { cant: '3 cab', destino: 'Rodeo Alta', motivo: 'Parto / Reingreso' },
  ],
}

const BAJAS_MES = {
  total: '-3',
  detalles: [
    { cant: '2 cab', destino: 'Rodeo Alta', motivo: 'Muerte' },
    { cant: '1 cab', destino: 'Rodeo Baja', motivo: 'Descarte (improductiva)' },
  ],
}

const MOVIMIENTOS = [
  {
    fecha: '03/06/2026',
    tipo: 'ALTA',
    rodeo: 'Rodeo Alta',
    cant: '+3 cab',
    motivo: 'Parto / Reingreso',
    observacion: 'Post-parto exitoso. Secas 28/05.',
    usuario: 'Sistema (Auto)',
    isAlta: true,
  },
  {
    fecha: '01/06/2026',
    tipo: 'ALTA',
    rodeo: 'Rodeo Alta',
    cant: '+5 cab',
    motivo: 'Compra',
    observacion: 'Holando Argentino, remate Cañuelas.',
    usuario: 'Juan (Dueño)',
    isAlta: true,
  },
  {
    fecha: '28/05/2026',
    tipo: 'BAJA',
    rodeo: 'Rodeo Alta',
    cant: '-2 cab',
    motivo: 'Muerte',
    observacion: 'Metritis aguda. Notificado a veterinario.',
    usuario: 'Juan (Dueño)',
    isAlta: false,
  },
  {
    fecha: '20/05/2026',
    tipo: 'BAJA',
    rodeo: 'Rodeo Baja',
    cant: '-1 cab',
    motivo: 'Descarte',
    observacion: 'Producción <5L/día por 30 días. Vendida.',
    usuario: 'Juan (Dueño)',
    isAlta: false,
  },
]

const TOTAL_CABEZAS = RODEOS.reduce((acc, r) => acc + r.cabezas, 0)
const TOTAL_GASTO_DIARIO = RODEOS.reduce((acc, r) => acc + r.gastoDiario, 0)
const TOTAL_GASTO_MENSUAL = TOTAL_GASTO_DIARIO * 30

export default function InventarioRodeosTab() {
  return (
    // pb-12 asegura que no se pegue abajo y dejes espacio para scroll seguro
    <div className="flex flex-col gap-8 w-full pb-12 overflow-y-visible">
      {/* 1. Tarjetas de rodeos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RODEOS.map((rodeo) => (
          <div
            key={rodeo.id}
            className="border border-[#E5E7EB] rounded-xl p-5 bg-white flex flex-col gap-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn('w-2.5 h-2.5 rounded-full shrink-0', rodeo.color)}
              />
              <p className="text-sm font-medium text-[#4B5563]">
                {rodeo.nombre}
              </p>
            </div>
            <p
              className={cn(
                'text-3xl font-bold tracking-tight',
                rodeo.textColor
              )}
            >
              {rodeo.cabezas}{' '}
              <span className="text-2xl font-bold">Cabezas</span>
            </p>
            <div className="flex flex-col gap-1 text-sm text-[#6B7280]">
              <p>
                Ración:{' '}
                <span className="text-[#374151]">
                  ${rodeo.racion.toFixed(2)}/cab/día
                </span>
              </p>
              <p>
                Gasto diario:{' '}
                <span className="font-semibold text-[#374151]">
                  ${rodeo.gastoDiario}
                </span>
              </p>
              {rodeo.del ? (
                <p>
                  DEL prom:{' '}
                  <span className="text-[#374151]">{rodeo.del} días</span>
                </p>
              ) : (
                <p>
                  Parto estimado:{' '}
                  <span className="text-[#374151]">{rodeo.partoEstimado}</span>
                </p>
              )}
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-2 mt-1 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              <Pencil size={14} /> Editar Rodeo
            </button>
          </div>
        ))}
      </div>

      {/* 2. Resumen total */}
      <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-5 py-3.5 shadow-sm">
        <span className="w-5 h-5 rounded-full bg-[#29845A] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
          i
        </span>
        <p className="text-sm text-[#166534]">
          Total inventario:{' '}
          <span className="font-bold text-[#111827]">
            {TOTAL_CABEZAS} cabezas
          </span>{' '}
          · Gasto total diario (raciones):{' '}
          <span className="font-bold text-[#111827]">
            ${TOTAL_GASTO_DIARIO}
          </span>{' '}
          · Gasto mensual estimado:{' '}
          <span className="font-bold text-[#111827]">
            ${TOTAL_GASTO_MENSUAL.toLocaleString()}
          </span>
        </p>
      </div>

      {/* 3. Sección Altas y Bajas */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#111827]">
            Altas y Bajas de Animales
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#22C55E] hover:bg-[#16A34A] rounded-lg transition-colors shadow-sm">
              + Registrar Alta
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-lg transition-colors shadow-sm">
              - Registrar Baja
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-[#E5E7EB] bg-white rounded-xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex gap-2.5 items-center">
                  <div className="p-2 bg-[#F0FDF4] text-[#22C55E] rounded-lg">
                    <ArrowUpRight size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#22C55E]">
                      Altas del Mes
                    </h4>
                    <p className="text-xs text-[#6B7280]">
                      Animales incorporados al tambo
                    </p>
                  </div>
                </div>
                <span className="text-3xl font-extrabold text-[#22C55E]">
                  {ALTAS_MES.total}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-1.5 border-t border-[#F3F4F6] pt-3">
                {ALTAS_MES.detalles.map((det, idx) => (
                  <p key={idx} className="text-sm text-[#4B5563]">
                    {det.motivo}:{' '}
                    <span className="font-semibold text-[#111827]">
                      {det.cant}
                    </span>{' '}
                    <span className="text-[#6B7280]">&rarr; {det.destino}</span>
                  </p>
                ))}
              </div>
            </div>
            <button className="mt-5 text-xs font-bold text-[#22C55E] hover:underline w-fit">
              + Nueva Alta
            </button>
          </div>

          <div className="border border-[#E5E7EB] bg-white rounded-xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex gap-2.5 items-center">
                  <div className="p-2 bg-[#FEF2F2] text-[#EF4444] rounded-lg">
                    <ArrowDownRight size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#EF4444]">
                      Bajas del Mes
                    </h4>
                    <p className="text-xs text-[#6B7280]">
                      Animales retirados o muertos
                    </p>
                  </div>
                </div>
                <span className="text-3xl font-extrabold text-[#EF4444]">
                  {BAJAS_MES.total}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-1.5 border-t border-[#F3F4F6] pt-3">
                {BAJAS_MES.detalles.map((det, idx) => (
                  <p key={idx} className="text-sm text-[#4B5563]">
                    {det.motivo}:{' '}
                    <span className="font-semibold text-[#111827]">
                      {det.cant}
                    </span>{' '}
                    <span className="text-[#6B7280]">({det.destino})</span>
                  </p>
                ))}
              </div>
            </div>
            <button className="mt-5 text-xs font-bold text-[#EF4444] hover:underline w-fit">
              — Nueva Baja
            </button>
          </div>
        </div>
      </div>

      {/* 4. Tabla de Últimos Movimientos */}
      <div className="border border-[#E5E7EB] bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-[#E5E7EB]">
          <h3 className="text-base font-bold text-[#111827]">
            Últimos Movimientos de Plantel
          </h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#374151] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors shadow-sm">
            <Download size={14} /> Exportar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  FECHA
                </th>
                <th className="py-3 px-4 text-xs font-bold text-[#6B7280]">
                  TIPO
                </th>
                <th className="py-3 px-4 text-xs font-bold text-[#6B7280]">
                  RODEO
                </th>
                <th className="py-3 px-4 text-xs font-bold text-[#6B7280]">
                  CANT.
                </th>
                <th className="py-3 px-4 text-xs font-bold text-[#6B7280]">
                  MOTIVO
                </th>
                <th className="py-3 px-4 text-xs font-bold text-[#6B7280]">
                  OBSERVACIÓN
                </th>
                <th className="py-3 px-5 text-xs font-bold text-[#6B7280]">
                  USUARIO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {MOVIMIENTOS.map((mov, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#F9FAFB] transition-colors"
                >
                  <td className="py-3.5 px-5 text-[#374151] whitespace-nowrap font-medium">
                    {mov.fecha}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-bold"
                      style={{
                        backgroundColor: mov.isAlta ? '#DCFCE7' : '#FEE2E2',
                        color: mov.isAlta ? '#166534' : '#991B1B',
                      }}
                    >
                      {mov.tipo}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#374151] whitespace-nowrap">
                    {mov.rodeo}
                  </td>
                  <td
                    className="py-3.5 px-4 font-bold whitespace-nowrap"
                    style={{ color: mov.isAlta ? '#166534' : '#991B1B' }}
                  >
                    {mov.cant}
                  </td>
                  <td className="py-3.5 px-4 text-[#374151] font-medium whitespace-nowrap">
                    {mov.motivo}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B7280] max-w-xs truncate">
                    {mov.observacion}
                  </td>
                  <td className="py-3.5 px-5 text-[#374151] whitespace-nowrap">
                    {mov.usuario}
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
