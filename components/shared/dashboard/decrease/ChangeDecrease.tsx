'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ConnectionErrorModal } from '@/components/ConnectionErrorModal'
import { useConnectionError } from '@/hooks/connection/useConnectionError'
import { useCreateDecrease } from '@/hooks/decrease/useCreateDecrease'
import { useUpdateDecrease } from '@/hooks/decrease/useUpdateDecrease'
import { useErrorMessage } from '@/hooks/useErrorMessage'
import { Merma, DecreaseSchema, TipoMerma } from '@/types/decrease'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface ChangeDecreaseProps {
  open: boolean
  onClose: () => void
  onOpen?: () => void
  idBatch?: string
  decrease?: Merma
}

const ChangeDecrease = ({
  open,
  onClose,
  onOpen,
  decrease,
  idBatch,
}: ChangeDecreaseProps) => {
  const { mutateAsync: create, isPending } = useCreateDecrease()
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
  const { mutateAsync: update, isPending: isPendingUpdate } = useUpdateDecrease(
    { idLote: idBatch! }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      cantidad: '',
      observacion: '',
      tipo: TipoMerma.Natural,
    },

    resolver: zodResolver(DecreaseSchema),
  })

  useEffect(() => {
    if (decrease) {
      reset({
        cantidad: decrease.cantidad.toString(),
        observacion: decrease.observacion,
        tipo: decrease.tipo,
      })
    } else {
      reset({
        cantidad: '',
        observacion: '',
        tipo: TipoMerma.Natural,
      })
    }
  }, [decrease, reset])

  const onSubmit = handleSubmit(
    handleSubmitWithConnectionCheck(async (data) => {
      if (decrease) {
        await update({ id: decrease.idMerma, values: data })
      } else {
        await create({ ...data, idLote: idBatch! })
      }
      onClose()
    })
  )

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose()
        reset()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {decrease ? 'Editar merma' : 'Registrar merma'}
          </DialogTitle>
          <DialogDescription>
            {decrease
              ? 'Ingresa los nuevos datos para actualizar la merma asociada al lote de produccion'
              : 'Ingresa los datos para asociar la merma a un lote de produccion'}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Tipo de merma*</Label>

            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending || isPendingUpdate}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar tipo de merma..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Natural">Natural</SelectItem>
                      <SelectItem value="Tecnica">Tecnica</SelectItem>
                      <SelectItem value="Administrativa">
                        Administrativa
                      </SelectItem>
                      <SelectItem value="Danio">Daño</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.tipo && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {errors.tipo.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Merma (Kg/L)*</Label>
            <Input
              placeholder="0.00"
              inputMode="decimal"
              {...register('cantidad')}
              disabled={isPending || isPendingUpdate}
            />

            {errors.cantidad && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {errors.cantidad.message}
              </span>
            )}

            <small>
              Este valor se restará del stock disponible sin modificar la
              producción original
            </small>
          </div>

          <div className="space-y-2">
            <Label>Observaciones</Label>
            <Input
              placeholder="Anota la información que consideres importante"
              {...register('observacion')}
              disabled={isPending || isPendingUpdate}
            />

            {errors.observacion && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {errors.observacion.message}
              </span>
            )}
          </div>

          <span className="flex items-center gap-2 text-xs">
            <AlertCircle className="size-5" /> Verifica que los datos sean
            correctos antes de {decrease ? 'actualizar' : 'registrar'} la merma
          </span>

          <Button
            className="w-full h-14"
            type="submit"
            disabled={isPending || isPendingUpdate}
          >
            {decrease ? 'Actualizar merma' : 'Registrar merma'}
          </Button>
        </form>
      </DialogContent>
      <ConnectionErrorModal
        open={showConnectionError}
        onRetry={retry}
        onCancel={() => dismiss(reset)}
      />
    </Dialog>
  )
}
export default ChangeDecrease
