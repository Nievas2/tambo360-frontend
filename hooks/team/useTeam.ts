'use client'
import { useInvitations } from '@/hooks/invitation/useInvitations'
import { useSendInvite } from '@/hooks/invitation/useSendInvite'
import { Invitacion } from '@/types/invite'
import { InvitationRole } from '@/types/enums'
import { sendInviteSchema } from '@/types/invite'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

export type SendInviteForm = z.infer<typeof sendInviteSchema>

export function useTeam() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Invitacion | null>(null)
  const [search, setSearch] = useState('')

  const { data: invitationsResponse, isLoading } = useInvitations()
  const invitationsData = invitationsResponse?.data
  const { mutateAsync: sendInvite, isPending } = useSendInvite()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SendInviteForm>({
    resolver: zodResolver(sendInviteSchema),
    defaultValues: {
      correo: '',
      rol: InvitationRole.EMPLOYEE,
    },
  })

  // Combina invitaciones de organización y establecimiento
  const allInvitations: Invitacion[] = [
    ...(invitationsData?.invitaciones_organizacion ?? []),
    ...(invitationsData?.invitaciones_establecimiento ?? []),
  ]

  // Filtra por búsqueda
  const filtered = allInvitations.filter((inv) => {
    const q = search.toLowerCase()
    return (
      inv.correo?.toLowerCase().includes(q) ||
      inv.usuario?.nombre?.toLowerCase().includes(q) ||
      inv.rol?.nombre?.toLowerCase().includes(q)
    )
  })

  const onSubmitInvite = async (data: SendInviteForm) => {
    try {
      await sendInvite({ correo: data.correo, rol: data.rol })
      toast.success('Invitación enviada correctamente', {
        position: 'top-center',
      })
      reset()
      setIsInviteModalOpen(false)
    } catch {
      toast.error('No se pudo enviar la invitación', { position: 'top-center' })
    }
  }

  const openInviteModal = () => setIsInviteModalOpen(true)
  const closeInviteModal = () => {
    setIsInviteModalOpen(false)
    reset()
  }

  const openDeleteModal = (inv: Invitacion) => setDeleteTarget(inv)
  const closeDeleteModal = () => setDeleteTarget(null)

  return {
    // Data
    invitations: filtered,
    isLoading,
    // Search
    search,
    setSearch,
    // Invite modal
    isInviteModalOpen,
    openInviteModal,
    closeInviteModal,
    onSubmitInvite,
    isPending,
    // Delete modal
    deleteTarget,
    openDeleteModal,
    closeDeleteModal,
    // Form
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
  }
}
