'use client'
import {
  configurationSchema,
  ConfigurationData,
} from '@/types/establishment/configuration'
import { TipoOrdenie, VentaLeche, TipoRodeo } from '@/types/enums'
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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
  const [selectedLocalityName, setSelectedLocalityName] = useState('')
  const [searchP] = useDebounce(searchProvince, 300)
  const [searchL] = useDebounce(searchLocality, 300)
  const pathname = usePathname()
  const router = useRouter()

  const { data: province } = useProvince({ name: searchP })
  const { data: locality } = useLocality({ id: idProvince, search: searchL })

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
      rodeos: Object.values(TipoRodeo).map((tipo) => ({
        tipoRodeo: tipo,
        cantVacas: 1,
        costoRacion: 1,
      })),
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
    if (!config?.data) return

    const data = config.data
    const savedRodeos = data.rodeos ?? []

    reset({
      rodeos: Object.values(TipoRodeo).map((tipo) => {
        const saved = savedRodeos.find((r: any) => r.tipoRodeo === tipo)
        return {
          tipoRodeo: tipo,
          cantVacas: saved?.cantVacas ?? 1,
          costoRacion: saved?.costoRacion ?? 1,
        }
      }),
      cantOrdenie: data.ordeñe_por_dia ?? 2,
      tipoOrdenie: data.tipo_ordeñe,
      ventaLeche: data.venta_leche,
      promLitros: data.litros_por_dia,
      empleados: data.empleados ?? false,
      cantEmpleados:
        data.cantidad_empleados !== null ? data.cantidad_empleados : 1,
      ubicacion: {
        provincia: data.provincia ?? '',
        localidad: data.localidad ?? '',
      },
    })

    setSearchProvince(data.provincia ?? '')
    setSearchLocality(data.localidad ?? '')
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

  const cantEmpleados = watch('cantEmpleados') ?? 1
  const tipoOrdenie = watch('tipoOrdenie')
  const cantOrdenie = watch('cantOrdenie')
  const ventaLeche = watch('ventaLeche')
  const empleados = watch('empleados')

  const onSubmit = (data: ConfigurationData) => {
    sendConfiguration(data, {
      onSuccess: () => {
        if (pathname.includes('/cuestionario')) {
          toast.success('Configuración guardada correctamente', {
            description:
              'Ya podés invitar a tu equipo o empezar a usar tu establecimiento',
            position: 'top-center',
            duration: 5000,
          })
        } else {
          toast.success('Configuración guardada correctamente', {
            position: 'top-center',
            duration: 5000,
          })
        }

        router.push(pathname.replace('cuestionario', 'invitar'))
      },
    })
  }

  /*   const toggleRaza = (nombre: string, id?: string) => {
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
  } */

  return (
    <div
      className={`flex flex-col gap-10 w-full ${pathname.includes('cuestionario') ? 'p-8' : ''}`}
    >
      <header className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold text-slate-900">
            Configura tu Perfil
          </h1>
        </div>
        <p className="text-slate-500 text-lg">
          Ayudanos a personalizar la experiencia de Tambo360 con los datos
          actuales de tu establecimiento
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        {/* 1. Cantidad de Vacas 
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            1. ¿Cuántas vacas tenés en ordeñe hoy?
          </Label>
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center h-14">
            <span className="inline-flex h-14 items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-xl font-bold text-slate-900">
              {watch('rodeos')?.reduce(
                (total, rodeo) => total + (rodeo.cantVacas ?? 0),
                0
              ) ?? 0}
            </span>
            <p className="text-sm text-slate-500">
              Este total se calcula a partir de los rodeos definidos abajo.
            </p>
          </div>
        </section> */}

        {/* 1. Rodeos */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            1. ¿Cómo está compuesto tu rodeo?
          </Label>
          <div className="grid gap-4">
            {Object.values(TipoRodeo).map((tipo, index) => (
              <div
                key={tipo}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-semibold text-slate-900">
                    {tipo.replace('_', ' ')}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs font-medium text-slate-700">
                      Cantidad de vacas
                    </Label>
                    <input
                      type="number"
                      min={1}
                      {...register(`rodeos.${index}.cantVacas` as const, {
                        valueAsNumber: true,
                      })}
                      className={cn(
                        'h-14 w-full border-2 rounded-xl px-4 outline-none transition-colors',
                        errors.rodeos?.[index]?.cantVacas
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#29845A]'
                      )}
                    />
                    {errors.rodeos?.[index]?.cantVacas && (
                      <p className="text-xs text-red-500">
                        {errors.rodeos?.[index]?.cantVacas?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs font-medium text-slate-700">
                      Costo de ración
                    </Label>
                    <input
                      type="number"
                      min={0.1}
                      step={0.1}
                      {...register(`rodeos.${index}.costoRacion` as const, {
                        valueAsNumber: true,
                      })}
                      className={cn(
                        'h-14 w-full border-2 rounded-xl px-4 outline-none transition-colors',
                        errors.rodeos?.[index]?.costoRacion
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#29845A]'
                      )}
                    />
                    {errors.rodeos?.[index]?.costoRacion && (
                      <p className="text-xs text-red-500">
                        {errors.rodeos?.[index]?.costoRacion?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.rodeos && !Array.isArray(errors.rodeos) && (
            <p className="text-xs text-red-500">{errors.rodeos.message}</p>
          )}
        </section>

        {/* 2. Frecuencia de Ordeñe */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            2. ¿Cuántas veces al día ordeñás?
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
                  className="w-4 h-4 accent-[#29845A]"
                />
                {n === 1 ? '1 vez' : `${n} veces`}
              </Label>
            ))}
          </div>
          {errors.cantOrdenie && (
            <p className="text-xs text-red-500">{errors.cantOrdenie.message}</p>
          )}
        </section>

        {/* 3. Tipo de Ordeñe */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            3. ¿Qué tipo de ordeñe usás?
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
                    ? 'bg-emerald-200 border-emerald-300 text-[#29845A]'
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
        {/* 4. Producción Diaria */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            4. ¿Cuántos litros producís en promedio por día?
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
                  : 'border-slate-200 focus:border-[#29845A]'
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
        {/* 5. Frecuencia de Ordeñe */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            5. ¿A quién le vendes la leche?
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
                  className="w-4 h-4 accent-[#29845A] capitalize"
                />
                {n == 'fabrica_propia' ? 'Fábrica propia' : n}
              </Label>
            ))}
          </div>
          {errors.ventaLeche && (
            <p className="text-xs text-red-500">{errors.ventaLeche.message}</p>
          )}
        </section>
        {/* 6. Empleados y Plan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-4">
            <Label className="text-sm font-medium text-slate-700">
              6. ¿Tenés empleados que cargarían datos?
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
                    ? 'border-2 border-[#29845A] bg-emerald-100'
                    : 'border-slate-200'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-2',
                    !empleados
                      ? 'bg-[#29845A] border-[#669213]'
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
                    ? 'border-[#29845A] bg-emerald-100'
                    : 'border-slate-200'
                )}
              >
                Sí, tengo empleados
                <div
                  className={cn(
                    'w-4 h-4 rounded-full',
                    empleados ? 'bg-[#29845A]' : 'bg-slate-300'
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
              <span className="text-sm font-bold text-[#29845A]">
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
            {errors.cantEmpleados && (
              <p className="text-xs text-red-500">
                {errors.cantEmpleados.message}
              </p>
            )}
          </div>
        </section>
        {/* 7. Ubicación */}
        <section className="flex flex-col gap-4">
          <Label className="text-sm font-medium text-slate-700">
            7. ¿Dónde está tu tambo?
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
        <footer className="flex items-center justify-between gap-4 pt-8 border-t border-slate-100">
          {pathname.includes('cuestionario') && (
            <div className="flex gap-4 w-full">
              <button
                type="button"
                className="px-12 py-4 bg-emerald-200 text-emerald-800 font-bold rounded-xl hover:bg-emerald-300 transition-all cursor-pointer"
                disabled={isPending}
              >
                <Link href="/organizaciones">Atrás</Link>
              </button>
            </div>
          )}

          <div className="flex gap-4 w-full justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-12 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 flex items-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
