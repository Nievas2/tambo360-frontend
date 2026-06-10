'use client'
import { Plus, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCatalog, getBreedVisual } from '@/hooks/catalog/useCatalogo'
import { Breed } from '@/types/establishment/breed'
import { Product } from '@/types/product'
import NewProductModal from '@/components/shared/dashboard/organization/configuration/modals/NewProductoModal'
import NewBreedModal from '@/components/shared/dashboard/organization/configuration/modals/NewBreedModal'

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        'relative h-6 w-11 rounded-full transition-all shrink-0',
        enabled ? 'bg-[#22C55E]' : 'bg-[#D1D5DB]'
      )}
    >
      <span
        className={cn(
          'absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all',
          enabled ? 'left-6' : 'left-1'
        )}
      />
    </button>
  )
}

export default function CatalogTab() {
  const {
    breeds,
    products,
    isLoadingBreeds,
    isLoadingProducts,
    isEnabled,
    toggleBreed,
    isProductModalOpen,
    openProductModal,
    closeProductModal,
    isBreedModalOpen,
    openBreedModal,
    closeBreedModal,
  } = useCatalog()

  return (
    <>
      <div className="max-w-[1050px] mx-auto px-6 py-6 flex flex-col gap-6 min-h-screen">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#0B1001]">
            Catálogo Operativo
          </h1>
          <p className="text-sm text-[#6B7280] mt-3">
            Gestione las razas bovinas y los insumos productivos de tu tambo.
          </p>
          <p className="text-sm text-[#6B7280]">
            Define parámetros base para el seguimiento de rendimiento.
          </p>
        </div>

        {/* Cabecera Razas */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-[#374151]">
            Gestión de Razas
          </p>
          <button
            type="button"
            onClick={openBreedModal}
            className="flex items-center gap-2 bg-[#6B8E23] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            <Plus size={14} />
            Agregar raza personalizada
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Razas */}
          <div className="flex-1 flex flex-col gap-8">
            {isLoadingBreeds ? (
              <div className="flex justify-center py-10">
                <div className="w-5 h-5 border-2 border-[#29845A] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : breeds.length === 0 ? (
              <p className="text-sm text-[#6B7280]">
                No hay razas registradas.
              </p>
            ) : (
              breeds.map((breed: Breed) => {
                const enabled = isEnabled(breed.idRaza)
                const visual = getBreedVisual(breed.nombre)
                return (
                  <div
                    key={breed.idRaza}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p
                        className={cn(
                          'text-xl font-semibold',
                          enabled ? 'text-[#111827]' : 'text-[#9CA3AF]'
                        )}
                      >
                        {breed.nombre}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={cn(
                            'text-xs px-3 py-1 rounded-lg font-medium',
                            enabled
                              ? visual.badgeClass
                              : 'bg-[#4B5563] text-white'
                          )}
                        >
                          {enabled ? visual.categoria : 'Desactivado'}
                        </span>
                        <span
                          className={cn(
                            'text-sm',
                            enabled ? 'text-[#374151]' : 'text-[#9CA3AF]'
                          )}
                        >
                          Promedio: {visual.promedio}
                        </span>
                      </div>
                    </div>
                    <Toggle
                      enabled={enabled}
                      onChange={() => toggleBreed(breed.idRaza)}
                    />
                  </div>
                )
              })
            )}
          </div>

          {/* Productos */}
          <div className="w-full lg:w-[420px] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#29845A] text-lg">≡</span>
                <h2 className="text-2xl font-bold text-[#111827]">Productos</h2>
              </div>
              <button
                type="button"
                onClick={openProductModal}
                className="flex items-center gap-2 bg-[#29845A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                <Plus size={14} />
                Agregar Producto
              </button>
            </div>

            <div className="bg-[#DCE7E1] px-10 py-8 rounded-xl">
              {/* Header tabla */}
              <div className="grid grid-cols-[1fr_1fr_auto] mb-6">
                <p className="text-sm font-bold text-[#111827]">Nombre</p>
                <p className="text-sm font-bold text-[#111827]">Unidad</p>
                <p className="text-sm font-bold text-[#111827]">Acción</p>
              </div>

              {isLoadingProducts ? (
                <div className="flex justify-center py-10">
                  <div className="w-5 h-5 border-2 border-[#29845A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : products.length === 0 ? (
                <p className="text-sm text-[#6B7280]">
                  No hay productos registrados.
                </p>
              ) : (
                products.map((product: Product) => (
                  <div
                    key={product.idProducto}
                    className="grid grid-cols-[1fr_1fr_auto] py-4 items-center"
                  >
                    <p className="text-sm text-[#111827]">{product.nombre}</p>
                    <p className="text-sm text-[#374151]">Litros (L)</p>
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-white/50 transition"
                    >
                      <MoreVertical size={16} className="text-[#374151]" />
                    </button>
                  </div>
                ))
              )}

              <div className="pt-8 text-center">
                <button
                  type="button"
                  className="text-sm font-semibold text-[#0E5A39] hover:underline"
                >
                  Ver catálogo base completo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <NewProductModal
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
      />
      <NewBreedModal isOpen={isBreedModalOpen} onClose={closeBreedModal} />
    </>
  )
}
