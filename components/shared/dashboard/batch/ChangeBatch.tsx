'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, ArrowRight, Grid } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lote, BatchSchema } from '@/types/batch'
import { useCreateBatch } from '@/hooks/batch/useCreateBatch'
import { useUpdateBatch } from '@/hooks/batch/useUpdateBatch'
import { useProducts } from '@/hooks/product/useProducts'
import { useErrorMessage } from '@/hooks/useErrorMessage'
import { useConnectionError } from '@/hooks/connection/useConnectionError'
import { ConnectionErrorModal } from '@/components/ConnectionErrorModal'
import { Product } from '@/types/product'
import { Unidad } from '@/types/enums'
import { useBreeds } from '@/hooks/establishment/breeds/useBreeds'
import { Breed } from '@/types/establishment/breed'
import { usePathname } from 'next/navigation'

interface ChangeBatchProps {
  open: boolean
  onClose: () => void
  onOpen?: () => void
  batch?: Lote
  cantRazas?: number
}
const ChangeBatch = ({
  open,
  onClose,
  onOpen,
  batch,
  cantRazas,
}: ChangeBatchProps) => {
  const [id, setId] = useState('')
  const [finished, setFinished] = useState(false)
  const { mutateAsync } = useCreateBatch()
  const { mutateAsync: mutateAsyncUpdate } = useUpdateBatch()
  const { data } = useProducts()
  const { data: breeds } = useBreeds()
  const pathname = usePathname()

  const { showErrorMessage } = useErrorMessage()
  const {
    showConnectionError,
    handleSubmitWithConnectionCheck,
    retry,
    dismiss,
  } = useConnectionError({
    onServerError: showErrorMessage,
    closeParentDialog: onClose,
    openParentDialog: onOpen,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      idProducto: '',
      cantidad: '',
      fechaProduccion: '',
      unidad: Unidad.KG,
      idRaza: '',
      cantRaza: 0,
    },
    resolver: zodResolver(BatchSchema),
  })

  useEffect(() => {
    if (batch) {
      const fecha =
        batch.fechaProduccion && !isNaN(Date.parse(batch.fechaProduccion))
          ? new Date(batch.fechaProduccion).toISOString().slice(0, 10)
          : ''

      reset({
        idProducto: batch.idProducto ?? '',
        cantidad: (batch.cantidad ?? '').toString(),
        fechaProduccion: fecha,
        unidad: batch.unidad ?? Unidad.KG,
        idRaza: batch.idRaza ?? '',
        cantRaza: batch.cantRazas
          ? batch.cantRazas.toString()
          : cantRazas
            ? cantRazas.toString()
            : '0',
      })

      setValue('fechaProduccion', fecha, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      })
    } else {
      reset({
        idProducto: '',
        cantidad: '',
        fechaProduccion: '',
        unidad: Unidad.KG,
        idRaza: '',
        cantRaza: 0,
      })
    }
  }, [batch, reset, setValue])

  const onSubmit = handleSubmit(
    handleSubmitWithConnectionCheck(async (data) => {
      if (!batch) {
        const date = new Date(data.fechaProduccion)
        const fechaProduccion = [
          String(date.getUTCDate()).padStart(2, '0'),
          String(date.getUTCMonth() + 1).padStart(2, '0'),
          date.getUTCFullYear(),
        ].join('/')
        const idLote = crypto.randomUUID()
        const batch = {
          idProducto: data.idProducto,
          cantidad: data.cantidad,
          unidad: data.unidad,
          idRaza: data.idRaza,
          cantRaza: data.cantRaza,
          fechaProduccion: fechaProduccion,
          idLote: idLote,
        }

        await mutateAsync(batch)
        setId(idLote)
        setFinished(true)
      } else {
        const date = new Date(data.fechaProduccion)
        const fechaProduccion = [
          String(date.getUTCDate()).padStart(2, '0'),
          String(date.getUTCMonth() + 1).padStart(2, '0'),
          date.getUTCFullYear(),
        ].join('/')
        await mutateAsyncUpdate({
          id: batch.idLote,
          values: { ...data, fechaProduccion },
        })
        setId(batch.idLote)
        setFinished(true)
      }
    })
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setFinished(false)
          reset({
            idProducto: '',
            cantidad: '',
            fechaProduccion: '',
          })
          onClose()
        }
      }}
    >
      {finished ? (
        <DialogContent className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-[32px] font-bold text-black flex justify-center">
              <img
                src="/successIcon.svg"
                alt="success"
                className="w-36 aspect-square"
              />
            </DialogTitle>

            <DialogTitle className="text-[32px] font-bold text-black flex justify-center text-center">
              {batch
                ? 'Lote actualizado correctamente'
                : 'Lote creado correctamente'}
            </DialogTitle>

            {batch ? (
              <DialogDescription className="text-center text-[16px]">
                El lote ha sido actualizado exitosamente en <br />
                el sistema. Ahora puedes gestionar su <br />
                seguimiento y produccion.
              </DialogDescription>
            ) : (
              <DialogDescription className="text-center text-[16px]">
                El nuevo lote ha sido registrado exitosamente en <br />
                el sistema. Ahora puedes gestionar su <br />
                seguimiento y produccion.
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="p-4 space-y-2">
            <Button
              variant="default"
              className="flex items-center justify-center w-full h-14 text-xl font-bold"
              asChild
            >
              <Link href={pathname + '/lote/' + id} className="block">
                Ir al detalle del lote
                <ArrowRight className="ml-2 size-6" />
              </Link>
            </Button>

            {!batch && (
              <Button
                variant="secondary"
                className="flex items-center justify-center w-full h-14 text-xl font-bold"
                onClick={() => {
                  setFinished(false)
                  reset()
                }}
              >
                Crear otro lote
              </Button>
            )}
          </div>

          <DialogFooter className="flex flex-row justify-center sm:justify-center items-center text-center">
            <Button variant="ghost" onClick={() => onClose()}>
              <Grid className="size-5" />
              <span className="underline">Volver al dashboard</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader className="border-b p-2">
            <DialogTitle className="text-[32px] font-bold text-black">
              {batch ? 'Editar lote' : 'Crear nuevo lote'}
            </DialogTitle>

            <DialogDescription>
              {batch
                ? 'Ingresa los nuevos datos para actualizar el lote.'
                : 'Ingresa los datos para iniciar el seguimiento de producción.'}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-3" onSubmit={onSubmit}>
            {/* Fecha */}
            <div className="space-y-2">
              <Label className="font-bold">Fecha de producción *</Label>
              <Input
                type="date"
                placeholder="dd/mm/aaaa"
                {...register('fechaProduccion')}
              />

              {errors.fechaProduccion && (
                <span className="text-xs text-red-600">
                  {errors.fechaProduccion.message}
                </span>
              )}
            </div>

            {/* Razas y cantidades de la raza */}
            <div className="flex items-center justify-between gap-2 w-full">
              {/* razas */}
              <div className="space-y-2 w-full mt-2">
                <Label className="font-bold">Tipo de raza *</Label>
                <Select
                  defaultValue={batch ? batch.idRaza : ''}
                  onValueChange={(e) => setValue('idRaza', e)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona raza..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {breeds?.data.data.map((breed: Breed) => (
                        <SelectItem key={breed.idRaza} value={breed.idRaza}>
                          {breed.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {errors.idRaza && (
                  <span className="text-xs text-red-600">
                    {errors.idRaza.message}
                  </span>
                )}
              </div>

              {/* cantidad raza */}
              <div className="space-y-2 w-full h-full">
                <Label className="font-bold">Cantidad de vacas *</Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="0.00"
                  {...register('cantRaza')}
                />

                {errors.cantRaza && (
                  <span className="text-xs text-red-600">
                    {errors.cantRaza.message}
                  </span>
                )}
              </div>
            </div>

            {/* producto y unidad */}
            <div className="flex items-center justify-between gap-2 w-full">
              {/* Productos */}
              <div className="space-y-2 w-full">
                <Label className="font-bold">Tipo de producción *</Label>
                <Select
                  value={watch('idProducto')}
                  onValueChange={(e) => {
                    setValue('idProducto', e)
                    const product = data?.data.find(
                      (product: Product) => product.idProducto === e
                    )

                    if (product?.categoria === 'quesos') {
                      setValue('unidad', Unidad.KG)
                    } else {
                      setValue('unidad', Unidad.LITROS)
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona producto..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {data?.data.map((product: Product) => (
                        <SelectItem
                          key={product.idProducto}
                          value={product.idProducto}
                        >
                          {product.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {errors.idProducto && (
                  <span className="text-xs text-red-600">
                    {errors.idProducto.message}
                  </span>
                )}
              </div>

              {/* Unidad */}
              <div className="space-y-2 w-full">
                <Label className="font-bold">Unidad *</Label>
                <Select
                  value={watch('unidad')}
                  onValueChange={(e) => setValue('unidad', e as Unidad)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona unidad..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={Unidad.KG}>{Unidad.KG}</SelectItem>

                      <SelectItem value={Unidad.LITROS}>
                        {Unidad.LITROS}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {errors.unidad && (
                  <span className="text-xs text-red-600">
                    {errors.unidad.message}
                  </span>
                )}
              </div>
            </div>

            {/* Cantidad producida */}
            <div className="space-y-2">
              <Label className="font-bold">
                Cantidad producida (Kg / Litros) *
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...register('cantidad')}
              />

              {errors.cantidad && (
                <span className="text-xs text-red-600">
                  {errors.cantidad.message}
                </span>
              )}
            </div>
            <span className="flex items-center gap-2 text-xs">
              <AlertCircle className="size-5" /> Verifica que los datos sean
              correctos antes de crear el lote.
            </span>
            <DialogFooter>
              <Button
                variant="default"
                className="flex items-center justify-center w-full h-16 text-xl font-bold"
                type="submit"
              >
                {batch ? 'Actualizar lote' : 'Crear lote'}
                <ArrowRight className="size-6" />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
      <ConnectionErrorModal
        open={showConnectionError}
        onRetry={retry}
        onCancel={() => dismiss(reset)}
      />
    </Dialog>
  )
}
export default ChangeBatch
