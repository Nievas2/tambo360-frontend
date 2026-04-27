'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreateOrganizationProps {
  open: boolean
  onClose: () => void
  onOpen?: () => void
}

const CreateOrganization = ({ open, onClose }: CreateOrganizationProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose()
      }}
    >
      <DialogContent className="bg-[#FFFBF1]">
        <DialogHeader>
          <DialogTitle>Crear organización</DialogTitle>
        </DialogHeader>
        <form className="space-y-8 my-8">
          <div className="space-y-2">
            <Label>Nombre de la organización</Label>
            <Input placeholder="Ingrese el nombre de la organización" />
          </div>

          <div className="flex items-center justify-center w-full">
            <Button variant="darkGreen" className="w-32 h-14" type="submit">
              ACEPTAR
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateOrganization
