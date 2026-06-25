'use client'
import { useState } from 'react'
import { useBreeds } from '@/hooks/establishment/breeds/useBreeds'
import { useProducts } from '@/hooks/product/useProducts'
import { Breed } from '@/types/establishment/breed'
import { Product } from '@/types/product'

// Datos visuales por raza hasta que el backend los tenga
const BREED_OVERRIDES: Record<
  string,
  { categoria: string; badgeClass: string; promedio: string }
> = {
  jersey: {
    categoria: 'Grasa',
    badgeClass: 'bg-[#7A9B22] text-white',
    promedio: '18-22 L/día',
  },
  'pardo suizo': {
    categoria: 'Lechera',
    badgeClass: 'bg-[#6B8E23] text-white',
    promedio: '20-28 L/día',
  },
  'holando argentino': {
    categoria: 'Lechera',
    badgeClass: 'bg-[#6B8E23] text-white',
    promedio: '25-35 L/día',
  },
  normando: {
    categoria: 'Lechera',
    badgeClass: 'bg-[#6B8E23] text-white',
    promedio: '25-35 L/día',
  },
}

const DEFAULT_VISUAL = {
  categoria: 'Lechera',
  badgeClass: 'bg-[#6B8E23] text-white',
  promedio: '25-35 L/día',
}

export function getBreedVisual(nombre: string) {
  return BREED_OVERRIDES[nombre.toLowerCase()] ?? DEFAULT_VISUAL
}

export function useCatalog() {
  const { data: breedsData, isLoading: isLoadingBreeds } = useBreeds()
  const { data: productsData, isLoading: isLoadingProducts } = useProducts()

  const [enabledBreeds, setEnabledBreeds] = useState<Record<string, boolean>>(
    {}
  )
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isBreedModalOpen, setIsBreedModalOpen] = useState(false)

  const breeds: Breed[] = breedsData?.data?.data ?? []
  const products: Product[] = productsData?.data ?? []

  const isEnabled = (id: string) => enabledBreeds[id] !== false
  const toggleBreed = (id: string) =>
    setEnabledBreeds((prev) => ({ ...prev, [id]: !isEnabled(id) }))

  return {
    // Data
    breeds,
    products,
    isLoadingBreeds,
    isLoadingProducts,
    // Toggles de razas
    isEnabled,
    toggleBreed,
    // Modal Producto
    isProductModalOpen,
    openProductModal: () => setIsProductModalOpen(true),
    closeProductModal: () => setIsProductModalOpen(false),
    // Modal Raza
    isBreedModalOpen,
    openBreedModal: () => setIsBreedModalOpen(true),
    closeBreedModal: () => setIsBreedModalOpen(false),
  }
}
