import { Establecimiento_OrganiacionUsuario } from '@/types/establishment'
import { getEstablishment } from '@/utils/api/establishment.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useEstablishment({ id }: { id: string }) {
  return useQuery<{ data: Establecimiento_OrganiacionUsuario }>({
    queryKey: queryKeys.establishment.detail(id),
    queryFn: async () => {
      const { data } = await getEstablishment(id)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
