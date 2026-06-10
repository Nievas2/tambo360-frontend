'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import InventarioRodeosTab from '@/components/shared/dashboard/organization/configuration/tabs/catalog/InventarioRodeostab'

const CATALOG_SUBTABS = [
  { id: 'inventario', label: 'Inventario de Rodeos' },
  { id: 'transferir', label: 'Transferir Animales' },
  { id: 'movimientos', label: 'Hist. Movimientos' },
  { id: 'parametros', label: 'Parámetros de Tambo' },
  { id: 'control', label: 'Control Lechero Mensual' },
  { id: 'productos', label: 'Productos Destino' },
]

export default function CatalogTab() {
  const [activeSubTab, setActiveSubTab] = useState('inventario')

  return (
    <div className="flex flex-col gap-4">
      {/* Subtabs navegación */}
      <nav className="flex gap-1 border-b border-[#E5E7EB] overflow-x-auto scrollbar-none">
        {CATALOG_SUBTABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap -mb-px',
              activeSubTab === tab.id
                ? 'border-[#29845A] text-[#29845A]'
                : 'border-transparent text-[#6B7280] hover:text-[#374151]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Contenido */}
      <div className="w-full">
        {activeSubTab === 'inventario' && <InventarioRodeosTab />}
        {activeSubTab === 'transferir' && (
          <p className="text-sm text-[#6B7280]">
            Transferir Animales — próximamente
          </p>
        )}
        {activeSubTab === 'movimientos' && (
          <p className="text-sm text-[#6B7280]">
            Hist. Movimientos — próximamente
          </p>
        )}
        {activeSubTab === 'parametros' && (
          <p className="text-sm text-[#6B7280]">
            Parámetros de Tambo — próximamente
          </p>
        )}
        {activeSubTab === 'control' && (
          <p className="text-sm text-[#6B7280]">
            Control Lechero Mensual — próximamente
          </p>
        )}
        {activeSubTab === 'productos' && (
          <p className="text-sm text-[#6B7280]">
            Productos Destino — próximamente
          </p>
        )}
      </div>
    </div>
  )
}
