import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert } from '@/types/alerts'
import { History, Package } from 'lucide-react'
import Link from 'next/link'

interface AlertCardProps {
  alert: Alert
}
const AlertCard = ({ alert }: AlertCardProps) => {
  const loteDisplay = `#${String(alert.numeroLote).padStart(3, '0')}`
  return (
    <Card className="bg-alert-bg mx-4 rounded-lg gap-4">
      <CardHeader className="space-y-1">
        <CardTitle className="font-bold text-[16px]">
          Merma superior al promedio en {alert.producto}
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span className="flex gap-2 text-xs">
            <History className="size-3" />{' '}
            {new Date(alert.creado_en)
              .toLocaleString('es-ES', {
                month: 'long',
                year: 'numeric',
              })
              .replace(/^\w/, (c) => c.toUpperCase())}
          </span>

          <span className="flex gap-2 text-xs">
            <Package className="size-3" /> {loteDisplay}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 mx-4 p-1">
        <p>{alert.descripcion}</p>
      </CardContent>

      <CardFooter className="justify-between gap-2 w-full">
        <Button className="flex-1" asChild>
          <Link href={`/alertas/#${alert.id}`}>Ver alerta</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/produccion/lote/${alert.idLote}`}>Ver lote</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
export default AlertCard
