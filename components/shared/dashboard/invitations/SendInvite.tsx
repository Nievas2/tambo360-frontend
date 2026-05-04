'use client'
import { User, ShieldCheck, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useSendInvite } from '@/hooks/invitation/useSendInvite'
import { sendInviteSchema } from '@/types/invite'
import { zodResolver } from '@hookform/resolvers/zod'
import { InvitationRole } from '@/types/enums'

const SendInvite = () => {
  const { mutate, isPending, error } = useSendInvite()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      correo: '',
      rol: InvitationRole.EMPLOYEE,
    },
    resolver: zodResolver(sendInviteSchema),
  })

  const selectedRole = watch('rol')

  const onSubmit = handleSubmit((data) => {
    console.log('Invitación enviada con datos:', data)
    mutate(data, {
      onSuccess: () => reset(),
    })
  })
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-emerald-900 text-center">
        Invitaciones
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <form
          onSubmit={onSubmit}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-10 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <Label className="text-emerald-800 font-semibold text-sm">
              Correo Electrónico
            </Label>
            <Input
              placeholder="tambero@example.com"
              className="w-full p-4"
              {...register('correo')}
              disabled={isPending}
            />

            {errors.correo && (
              <small className="text-red-700">{errors.correo.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-emerald-800 font-semibold text-sm">
              Seleccione el nivel del usuario
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                className={`cursor-pointer transition-colors duration-150 border border-emerald-100 rounded-xl p-6 flex flex-col gap-3 ${selectedRole === InvitationRole.EMPLOYEE ? 'bg-[#29845A] text-white' : 'bg-[#d4e6de] hover:bg-[#29845A] text-black hover:text-white'}`}
                onClick={() => setValue('rol', InvitationRole.EMPLOYEE)}
                type="button"
                disabled={isPending}
              >
                <div className="flex items-center gap-3 font-bold">
                  <User size={20} />
                  <span>Empleado</span>
                </div>
                <p className="text-sm opacity-90 leading-relaxed text-start">
                  Ideal para personal de campo. Permite registrar datos de
                  ordeñe, salud animal y tareas diarias sin acceso a
                  configuraciones sensibles.
                </p>
              </button>

              <button
                className={`cursor-pointer transition-colors duration-150 border border-emerald-100 rounded-xl p-6 flex flex-col gap-3 ${selectedRole === InvitationRole.ADMIN ? 'bg-[#29845A] text-white' : 'bg-[#d4e6de] hover:bg-[#29845A] text-black hover:text-white'}`}
                onClick={() => setValue('rol', InvitationRole.ADMIN)}
                type="button"
                disabled={isPending}
              >
                <div className="flex items-center gap-3 font-bold">
                  <ShieldCheck size={20} />
                  <span>Administrador</span>
                </div>
                <p className="text-sm opacity-90 leading-relaxed text-start">
                  Acceso total a la gestión del tambo. Permite gestionar el
                  equipo, configurar establecimientos y visualizar reportes
                  analíticos avanzados.
                </p>
              </button>
            </div>

            {errors.rol && (
              <small className="text-red-700">{errors.rol.message}</small>
            )}
          </div>

          {error && (
            <small className="text-red-700">
              {error.response?.data?.message || 'Error al enviar la invitación'}
            </small>
          )}

          {/* Botón Enviar */}
          <Button
            className="w-full h-12 bg-emerald-900 hover:bg-emerald-950 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
            type="submit"
            disabled={isPending}
          >
            <Send size={20} />
            Enviar Invitación
          </Button>
        </form>

        <div className="bg-emerald-50/50 rounded-2xl p-6 flex flex-col gap-6 border border-emerald-100">
          <div className="text-center">
            <h2 className="text-emerald-900 font-bold text-xl">
              Actividades Pendientes
            </h2>
            <p className="text-xs text-emerald-700 font-medium">
              4 invitaciones pendientes
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                name: 'Julian Arboleda',
                email: 'julian.arb@tambo.com',
                role: 'Admin',
                active: true,
              },
              {
                name: 'Sara Morales',
                email: 'saramorales@tamboR.com',
                role: 'Tambero',
                active: true,
              },
              {
                name: 'Marcos García',
                email: 'marcos.garcia@botanica.com',
                role: 'Tambero',
                active: false,
              },
              {
                name: 'Elena Rossi',
                email: 'elena.rossi@herd.com',
                role: 'Tambero',
                active: true,
              },
            ].map((user, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {/* Avatar Placeholder */}
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold ${user.active ? 'text-emerald-900' : 'text-slate-400'}`}
                    >
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {user.email}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                    user.role === 'Admin'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-lime-500 text-emerald-950'
                  } ${!user.active && 'opacity-40'}`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex gap-3">
          <Button
            className="px-10 py-3 bg-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-300 transition-colors"
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            className="px-10 py-3 bg-white border border-slate-200 text-emerald-800 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            disabled={isPending}
          >
            Omitir
          </Button>
        </div>
        <div className="flex gap-3">
          <Button
            className="px-10 py-3 bg-emerald-200 text-emerald-800 font-bold rounded-xl hover:bg-emerald-300 transition-colors"
            disabled={isPending}
          >
            Atrás
          </Button>
          <Button
            className="px-10 py-3 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors"
            disabled={isPending}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SendInvite
