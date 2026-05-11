import BatchDetails from '@/components/shared/dashboard/batch/BatchDetails'

async function page({ params }: { params: Promise<{ loteId: string }> }) {
  const { loteId } = await params

  if (loteId) {
    return <p>Falta el identificador del lote</p>
  }

  return <BatchDetails id={loteId} />
}

export default page
