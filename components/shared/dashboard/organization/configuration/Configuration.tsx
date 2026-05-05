'use client'
import {
  configurationSchema,
  ConfigurationData,
} from '@/types/establishment/configuration'
import { TipoOrdenie, VentaLeche } from '@/types/enums'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight, Minus, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useProvince } from '@/hooks/ubication/useProvince'
import { useLocality } from '@/hooks/ubication/useLocality'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import { useDebounce } from 'use-debounce'
import { useUpdateConfiguration } from '@/hooks/establishment/useUpdateConfiguration'
import { usePathname } from 'next/navigation'
import { useConfiguration } from '@/hooks/establishment/useConfiguration'
import { useBreeds } from '@/hooks/establishment/breeds/useBreeds'
import { Breed } from '@/types/establishment/breed'

const TIPO_ORDENIE_OPTIONS: { value: TipoOrdenie; Label: string }[] = [
  { value: TipoOrdenie.BALDE, Label: 'Balde' },
  { value: TipoOrdenie.LINEA, Label: 'Línea' },
  { value: TipoOrdenie.ESPINA_DE_PESCADO, Label: 'Espina de pescado' },
  { value: TipoOrdenie.ROTATIVO, Label: 'Rotativo' },
  { value: TipoOrdenie.MANUAL, Label: 'Manual' },
  { value: TipoOrdenie.OTRO, Label: 'Otro' },
]

const Configuration = () => {
  const [searchProvince, setSearchProvince] = useState('')
  const [idProvince, setIdProvince] = useState<string | undefined>('')
  const [searchLocality, setSearchLocality] = useState('')
  const [newRazaName, setNewRazaName] = useState('')
  const [selectedProvinceName, setSelectedProvinceName] = useState('')
  const [selectedLocalityName, setSelectedLocalityName] = useState('')
  const [searchP] = useDebounce(searchProvince, 300)
  const [searchL] = useDebounce(searchLocality, 300)
  const pathname = usePathname()

  const { data: province } = useProvince({ name: searchP })
  const { data: locality } = useLocality({ id: idProvince, search: searchL })
  const { data: breeds } = useBreeds()

  const {
    mutateAsync: sendConfiguration,
    isPending,
    error,
  } = useUpdateConfiguration()
  const { data: config } = useConfiguration()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ConfigurationData>({
    defaultValues: {
      cantidadVacas: 100,
      Razas: [],
      cantOrdenie: 2,
      tipoOrdenie: undefined,
      promLitros: undefined,
      empleados: false,
      cantEmpleados: 1,
      ubicacion: {
        provincia: '',
        localidad: '',
      },
    },
    resolver: zodResolver(configurationSchema),
  })

  useEffect(() => {
    if (!config?.data || !breeds?.data?.data) return

    const data = config.data

    reset({
      cantidadVacas: data.cantidad_vacas ?? 100,
      Razas:
        data.razas?.map((r: any) => ({
          id: r.id,
          nombre: r.nombre,
        })) ?? [],
      cantOrdenie: data.ordeñe_por_dia ?? 2,
      tipoOrdenie: data.tipo_ordeñe,
      ventaLeche: data.venta_leche,
      promLitros: data.litros_por_dia,
      empleados: data.empleados ?? false,
      cantEmpleados:
        data.cantidad_empleados !== undefined ? data.cantidad_empleados : 1,
      ubicacion: {
        provincia: data.provincia ?? '',
        localidad: data.localidad ?? '',
      },
    })

    setSearchProvince(data.provincia ?? '')
    setSelectedProvinceName(data.provincia ?? '')

    setSearchLocality(data.localidad ?? '')
    setSelectedLocalityName(data.localidad ?? '')

    const breedsFromApi = breeds.data.data

    const normalizedRazas =
      config.data.razas?.map((r: any) => {
        const match = breedsFromApi.find(
          (b: Breed) => b.nombre.toLowerCase() === r.nombre.toLowerCase()
        )
        if (match) {
          return {
            idRaza: match.idRaza,
            nombre: match.nombre,
          }
        }

        return {
          nombre: r.nombre,
        }
      }) ?? []

    reset((prev) => ({
      ...prev,
      Razas: normalizedRazas,
    }))
  }, [config, reset])

  useEffect(() => {
    if (!config?.data || !province?.provincias) return

    const match = province.provincias.find(
      (p) => p.nombre.toLowerCase() === config.data.provincia?.toLowerCase()
    )

    if (match) {
      setIdProvince(match.id)
    }
  }, [config, province])

  const cantidadVacas = watch('cantidadVacas')
  const cantEmpleados = watch('cantEmpleados') ?? 1
  const razasSeleccionadas = watch('Razas')
  const tipoOrdenie = watch('tipoOrdenie')
  const cantOrdenie = watch('cantOrdenie')
  const ventaLeche = watch('ventaLeche')
  const empleados = watch('empleados')

  const onSubmit = (data: ConfigurationData) => {
    console.log(data)
    sendConfiguration(data)
  }

  const toggleRaza = (nombre: string, id?: string) => {
    const current = razasSeleccionadas ?? []
    const exists = current.find((r) => r.nombre === nombre)

    if (exists) {
      setValue(
        'Razas',
        current.filter((r) => r.nombre !== nombre),
        { shouldValidate: true }
      )
    } else {
      const newRaza = id ? { idRaza: id, nombre } : { nombre }

      setValue('Razas', [...current, newRaza as any], {
        shouldValidate: true,
      })
    }
  }

  return (
    <div
      className={`flex flex-col gap-10 w-full ${pathname.includes('cuestionario') ? 'p-8' : ''}`}
    >
      {/* Encabezado */}
      <header className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold text-slate-900">
            Configura tu Perfil
          </h1>
          <span className="bg-emerald-600 text-white text-[10px] px-3 py-1 rounded-full">
            Invitación
          </span>
        </div>
        <p className="text-slate-500 text-lg">
          Ayudanos a personalizar la experiencia de Tambo360 con los datos
          actuales de tu establecimiento
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        {/* 1. Cantidad de Vacas */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            1. ¿Cuántas vacas tenés en ordeñe hoy?
          </Label>
          <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center h-14">
            <button
              type="button"
              onClick={() =>
                setValue('cantidadVacas', Math.max(1, cantidadVacas - 1), {
                  shouldValidate: true,
                })
              }
              className="h-full px-4 bg-slate-300 text-slate-600 rounded-lg hover:bg-slate-400 transition-colors"
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              {...register('cantidadVacas', { valueAsNumber: true })}
              className={cn(
                'h-full border-2 rounded-lg text-center font-bold text-xl outline-none transition-colors',
                errors.cantidadVacas
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-lime-200 focus:border-lime-500'
              )}
            />
            <button
              type="button"
              onClick={() =>
                setValue('cantidadVacas', cantidadVacas + 1, {
                  shouldValidate: true,
                })
              }
              className="h-full px-4 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          {errors.cantidadVacas && (
            <p className="text-xs text-red-500">
              {errors.cantidadVacas.message}
            </p>
          )}
        </section>
        {/* 2. Raza Predominante */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            2. ¿Qué raza predominante manejás?
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Razas desde la API */}
            {breeds?.data.data.map((breed: Breed) => (
              <button
                key={breed.idRaza}
                type="button"
                onClick={() => toggleRaza(breed.nombre, breed.idRaza)}
                className={cn(
                  'p-4 rounded-xl border font-medium transition-all',
                  razasSeleccionadas?.find((r) => r.nombre === breed.nombre)
                    ? 'bg-emerald-200 border-emerald-300 text-emerald-900'
                    : 'bg-white border-slate-200 text-slate-500 shadow-sm'
                )}
              >
                {breed.nombre}
              </button>
            ))}

            {razasSeleccionadas
              ?.filter((r) => !r.idRaza)
              .map((r) => (
                <button
                  key={crypto.randomUUID()}
                  type="button"
                  className="p-4 rounded-xl border font-medium transition-all bg-emerald-200 border-emerald-300 text-emerald-900"
                  onClick={() => toggleRaza(r.nombre)}
                >
                  {r.nombre}
                </button>
              ))}

            <div className="flex gap-2 p-2 rounded-xl border-2 bg-white border-slate-200 text-slate-500 shadow-sm">
              <input
                type="text"
                placeholder="Otra raza..."
                value={newRazaName}
                onChange={(e) => setNewRazaName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newRazaName.trim()) {
                    e.preventDefault()
                    toggleRaza(newRazaName.trim())
                    setNewRazaName('')
                  }
                }}
                className="w-full bg-transparent outline-none px-2 text-sm text-emerald-900 placeholder:text-emerald-400"
              />
              <button
                type="button"
                onClick={() => {
                  if (newRazaName.trim()) {
                    toggleRaza(newRazaName.trim())
                    setNewRazaName('')
                  }
                }}
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {errors.Razas && (
            <p className="text-xs text-red-500">
              {errors.Razas.message ?? 'Seleccioná al menos una raza'}
            </p>
          )}
        </section>
        {/* 3. Frecuencia de Ordeñe */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            3. ¿Cuántas veces al día ordeñás?
          </Label>
          <div className="flex gap-8">
            {[1, 2, 3].map((n) => (
              <Label
                key={n}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  value={n}
                  checked={cantOrdenie === n}
                  onChange={() =>
                    setValue('cantOrdenie', n, { shouldValidate: true })
                  }
                  className="w-4 h-4 accent-emerald-600"
                />
                {n === 1 ? '1 vez' : `${n} veces`}
              </Label>
            ))}
          </div>
          {errors.cantOrdenie && (
            <p className="text-xs text-red-500">{errors.cantOrdenie.message}</p>
          )}
        </section>
        {/* 4. Tipo de Ordeñe */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            4. ¿Qué tipo de ordeñe usás?
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TIPO_ORDENIE_OPTIONS.map(({ value, Label }) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setValue('tipoOrdenie', value, { shouldValidate: true })
                }
                className={cn(
                  'p-4 rounded-xl border font-medium transition-all',
                  tipoOrdenie === value
                    ? 'bg-emerald-200 border-emerald-300 text-emerald-900'
                    : 'bg-white border-slate-200 text-slate-500 shadow-sm'
                )}
              >
                {Label}
              </button>
            ))}
          </div>
          {errors.tipoOrdenie && (
            <p className="text-xs text-red-500">{errors.tipoOrdenie.message}</p>
          )}
        </section>
        {/* 5. Producción Diaria */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            5. ¿Cuántos litros producís en promedio por día?
          </Label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              placeholder="000"
              {...register('promLitros', { valueAsNumber: true })}
              className={cn(
                'w-full p-4 border-2 rounded-xl outline-none bg-slate-50/50 transition-colors',
                errors.promLitros
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-slate-200 focus:border-emerald-500'
              )}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
              LTS
            </span>
          </div>
          {errors.promLitros && (
            <p className="text-xs text-red-500">{errors.promLitros.message}</p>
          )}
        </section>
        {/* 6. Frecuencia de Ordeñe */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            6. ¿A quién le vendes la leche?
          </Label>
          <div className="flex gap-8">
            {[
              VentaLeche.USINA,
              VentaLeche.FABRICA_PROPIA,
              VentaLeche.COOPERATIVA,
              VentaLeche.VARIOS,
            ].map((n) => (
              <Label
                key={n}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  value={n}
                  checked={ventaLeche === n}
                  onChange={() =>
                    setValue('ventaLeche', n, { shouldValidate: true })
                  }
                  className="w-4 h-4 accent-emerald-600"
                />
                {n}
              </Label>
            ))}
          </div>
          {errors.ventaLeche && (
            <p className="text-xs text-red-500">{errors.ventaLeche.message}</p>
          )}
        </section>
        {/* 7. Empleados y Plan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-4">
            <Label className="text-sm font-medium text-slate-700">
              7. ¿Tenés empleados que cargarían datos?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setValue('empleados', false, { shouldValidate: true })
                }
                className={cn(
                  'p-4 rounded-xl border flex items-center gap-3 text-sm font-medium transition-all',
                  !empleados
                    ? 'border-2 border-emerald-500 bg-emerald-100'
                    : 'border-slate-200'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-2',
                    !empleados
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-slate-300'
                  )}
                />
                No, solo yo
              </button>
              <button
                type="button"
                onClick={() =>
                  setValue('empleados', true, { shouldValidate: true })
                }
                className={cn(
                  'p-4 rounded-xl border-2 flex items-center justify-between text-sm font-medium transition-all',
                  empleados
                    ? 'border-emerald-500 bg-emerald-100'
                    : 'border-slate-200'
                )}
              >
                Sí, tengo empleados
                <div
                  className={cn(
                    'w-4 h-4 rounded-full',
                    empleados ? 'bg-emerald-600' : 'bg-slate-300'
                  )}
                />
              </button>
            </div>
            {errors.empleados && (
              <p className="text-xs text-red-500">{errors.empleados.message}</p>
            )}
          </div>

          {/* Plan Sugerido Card */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              Plan Sugerido
            </p>
            <div className="flex justify-between items-center bg-emerald-200/60 p-4 rounded-xl border border-emerald-300 ">
              <span className="text-sm font-bold text-emerald-900">
                {empleados ? 'Plan Equipo/Multi' : 'Plan Individual'}
              </span>
              {empleados && (
                <div className="flex items-center gap-4 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        'cantEmpleados',
                        Math.max(1, cantEmpleados - 1),
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold">{cantEmpleados}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setValue('cantEmpleados', cantEmpleados + 1, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
            {empleados && (
              <p className="text-[10px] text-emerald-700 text-right">
                Número de empleados
              </p>
            )}
            {errors.cantEmpleados && (
              <p className="text-xs text-red-500">
                {errors.cantEmpleados.message}
              </p>
            )}
          </div>
        </section>
        {/* 8. Ubicación */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            8. ¿Dónde está tu tambo?
          </Label>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                className={`font-bold ${errors.ubicacion?.provincia ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}
              >
                Provincia*
              </Label>
              <Combobox
                onValueChange={(id: any) => {
                  const selectedProv = province?.provincias.find(
                    (p) => p.id === id
                  )

                  if (!selectedProv) return

                  setIdProvince(id)

                  setSelectedProvinceName(selectedProv.nombre)
                  setSearchProvince(selectedProv.nombre)

                  setValue('ubicacion.provincia', selectedProv.nombre)

                  setSelectedLocalityName('')
                  setSearchLocality('')
                  setValue('ubicacion.localidad', '')
                }}
              >
                <ComboboxInput
                  className={`h-14 w-full ${errors.ubicacion?.provincia ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'bg-[#F9F9F7] border-[#D1CFCA]'}`}
                  placeholder="Seleccione una provincia"
                  value={searchProvince}
                  onChange={(e) => {
                    const val = e.target.value
                    setSearchProvince(val)

                    if (val === '') {
                      setIdProvince('')
                      setSelectedProvinceName('')
                      setValue('ubicacion.provincia', '')
                    }
                  }}
                  data-testid="province-combobox-input"
                />
                <ComboboxContent
                  className="bg-white border-[#D1CFCA] z-100"
                  data-testid="province-combobox-content"
                >
                  {!province?.provincias.length && (
                    <ComboboxEmpty>No se encontraron provincias</ComboboxEmpty>
                  )}
                  <ComboboxList>
                    {province?.provincias.map((item) => (
                      <ComboboxItem
                        key={item.id}
                        value={item.id}
                        className="hover:bg-[#0B1001]/5"
                        data-testid={`province-option-${item.id}`}
                      >
                        {item.nombre}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {errors.ubicacion?.provincia && (
                <p className="text-xs font-medium text-[#B91C1C]">
                  {errors.ubicacion?.provincia.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                className={`font-bold ${errors.ubicacion?.localidad ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}
              >
                Localidad*
              </Label>
              <Combobox
                disabled={!idProvince}
                onValueChange={(id: any) => {
                  const selectedLoc = locality?.municipios.find(
                    (l) => l.id === id
                  )

                  if (!selectedLoc) return

                  setSelectedLocalityName(selectedLoc.nombre)
                  setSearchLocality(selectedLoc.nombre)

                  setValue('ubicacion.localidad', selectedLoc.nombre)
                }}
              >
                <ComboboxInput
                  className={`h-14 w-full ${errors.ubicacion?.localidad ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'bg-[#F9F9F7] border-[#D1CFCA]'}`}
                  placeholder={
                    idProvince
                      ? 'Seleccione una localidad'
                      : 'Primero seleccione una provincia'
                  }
                  value={searchLocality}
                  onChange={(e: { target: { value: any } }) => {
                    const val = e.target.value
                    setSearchLocality(val)
                    if (val !== selectedLocalityName) {
                      setSelectedLocalityName('')
                      setValue('ubicacion.localidad', '')
                    }
                  }}
                  disabled={!idProvince}
                  data-testid="locality-combobox-input"
                />
                <ComboboxContent
                  className="bg-white border-[#D1CFCA] z-100"
                  data-testid="locality-combobox-content"
                >
                  {!locality?.municipios.length && (
                    <ComboboxEmpty>No se encontraron localidades</ComboboxEmpty>
                  )}
                  <ComboboxList>
                    {locality?.municipios.map((item) => (
                      <ComboboxItem
                        key={item.id}
                        value={item.id}
                        className="hover:bg-[#0B1001]/5"
                        data-testid={`locality-option-${item.id}`}
                      >
                        {item.nombre}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {errors.ubicacion?.localidad && (
                <p className="text-xs font-medium text-[#B91C1C]">
                  {errors.ubicacion?.localidad.message}
                </p>
              )}
            </div>
          </div>
        </section>
        {error?.response?.data?.message && (
          <p className="text-xs text-red-500 text-center">
            {error.response.data.message}
          </p>
        )}
        {/* Footer de Navegación */}
        <footer className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-100">
          <div className="flex gap-4">
            <button
              type="button"
              className="px-12 py-4 bg-emerald-200 text-emerald-800 font-bold rounded-xl hover:bg-emerald-300 transition-all"
            >
              Atrás
            </button>
            <button
              type="button"
              className="px-12 py-4 bg-white border border-slate-200 text-emerald-800 font-bold rounded-xl hover:bg-slate-50 transition-all"
            >
              Omitir
            </button>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-12 py-4 bg-white border-2 border-lime-600 text-lime-700 font-bold rounded-xl hover:bg-lime-50 transition-all"
            >
              Aceptar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-12 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 flex items-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? 'Guardando...' : 'Siguiente'}{' '}
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      </form>
    </div>
  )
}

export default Configuration
