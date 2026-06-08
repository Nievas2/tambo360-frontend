'use client'
import { useAuth } from '@/context/AuthContext'
import { createOrganization } from '@/utils/api/organization.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCreateOrganization() {
  const { setUser } = useAuth()
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, string>({
    mutationFn: async (name: string) => {
      const { data } = await createOrganization(name)
      setUser((prevUser) => {
        if (!prevUser) return prevUser
        return {
          ...prevUser,
          organizaciones: data,
        }
      })
      return data
    },
  })
}
