import { breeds } from '@/utils/api/establishment/breeds.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export function useBreeds() {
  return useQuery<AxiosResponse>({
    queryKey: queryKeys.breed.lists(),
    queryFn: async () => breeds(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
