export const getClosingStatus = (productionDate: Date | string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const closingDate = new Date(productionDate)
  closingDate.setHours(0, 0, 0, 0)

  // Sumamos los 15 días de plazo
  closingDate.setDate(closingDate.getDate() + 15)

  const diffDays = Math.ceil(
    (closingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays <= 0) {
    return {
      text: 'Cierra hoy',
      color: 'bg-red-700',
    }
  }

  if (diffDays <= 3) {
    return {
      text: `Cierra en ${diffDays} día${diffDays > 1 ? 's' : ''}`,
      color: 'bg-red-500',
    }
  }

  if (diffDays <= 7) {
    return {
      text: `Cierra en ${diffDays} día${diffDays > 1 ? 's' : ''}`,
      color: 'bg-yellow-500',
    }
  }

  return {
    text: `Cierra en ${diffDays} día${diffDays > 1 ? 's' : ''}`,
    color: 'bg-green-400',
  }
}
