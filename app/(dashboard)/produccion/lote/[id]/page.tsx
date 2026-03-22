import BatchDetails from '@/components/shared/dashboard/batch/BatchDetails'

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!id) {
    return <p>Falta el identificador del lote</p>
  }

  return <BatchDetails id={id} />
}

export default page
