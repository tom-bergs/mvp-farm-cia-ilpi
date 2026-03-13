import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, Upload, FileText, ImageIcon, Trash2, ExternalLink } from 'lucide-react'

interface Resident {
  id: string
  name: string
  room: string
}

interface PrescriptionFile {
  id: string
  file_name: string
  file_type: string
  file_path: string
  notes: string
  created_at: string
  residents: { name: string; room: string }
}

interface Props {
  open: boolean
  onClose: () => void
}

export function UploadPrescricaoModal({ open, onClose }: Props) {
  const { user } = useAuth()
  const [residents, setResidents] = useState<Resident[]>([])
  const [uploads, setUploads] = useState<PrescriptionFile[]>([])
  const [selectedResident, setSelectedResident] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (open) {
      fetchResidents()
      fetchUploads()
    }
  }, [open])

  const fetchResidents = async () => {
    const { data } = await supabase.from('residents').select('id, name, room').order('name')
    if (data) setResidents(data)
  }

  const fetchUploads = async () => {
    setFetching(true)
    const { data } = await supabase
      .from('prescription_files')
      .select('id, file_name, file_type, file_path, notes, created_at, residents(name, room)')
      .eq('professional_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(10)
    if (data) setUploads(data as any)
    setFetching(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowed.includes(selected.type)) {
      toast.error('Formato inválido. Use PDF, JPG ou PNG.')
      return
    }
    if (selected.size > 10 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 10MB.')
      return
    }
    setFile(selected)
  }

  const handleUpload = async () => {
    if (!selectedResident) { toast.error('Selecione um residente'); return }
    if (!file) { toast.error('Selecione um arquivo'); return }

    setLoading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${selectedResident}/${Date.now()}.${ext}`

      const { data: storageData, error: storageError } = await supabase.storage
        .from('prescriptions')
        .upload(fileName, file)

      if (storageError) throw storageError

      const { error: dbError } = await supabase.from('prescription_files').insert({
        resident_id: selectedResident,
        professional_id: user?.id,
        file_path: storageData.path,
        file_name: file.name,
        file_type: file.type,
        notes: notes.trim() || null,
      })

      if (dbError) throw dbError

      toast.success('Prescrição enviada com sucesso!')
      setFile(null)
      setNotes('')
      setSelectedResident('')
      fetchUploads()
    } catch (err) {
      toast.error('Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, filePath: string) => {
    await supabase.storage.from('prescriptions').remove([filePath])
    await supabase.from('prescription_files').delete().eq('id', id)
    toast.success('Arquivo removido.')
    fetchUploads()
  }

  const handleView = async (filePath: string) => {
    const { data } = await supabase.storage.from('prescriptions').createSignedUrl(filePath, 60)
    if (data?.signedUrl) window.open(data.signedUrl, '_blank')
  }

  const fileIcon = (type: string) =>
    type === 'application/pdf' ? <FileText className="h-5 w-5 text-red-500" /> : <ImageIcon className="h-5 w-5 text-blue-500" />

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subir Prescrição</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Formulário de upload */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Novo envio</h3>

            <div className="space-y-2">
              <Label>Residente</Label>
              <Select value={selectedResident} onValueChange={setSelectedResident}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o residente" />
                </SelectTrigger>
                <SelectContent>
                  {residents.length === 0 && (
                    <SelectItem value="_none" disabled>Nenhum residente cadastrado</SelectItem>
                  )}
                  {residents.map(r => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name} — Quarto {r.room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Arquivo (PDF, JPG ou PNG — máx. 10MB)</Label>
              <input id="file-input" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                {file ? (
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Clique para selecionar ou arraste o arquivo aqui</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações (opcional)</Label>
              <Textarea
                placeholder="Ex: Receita válida até..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleUpload} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Enviar prescrição
            </Button>
          </div>

          {/* Histórico de uploads */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Enviados recentemente</h3>
            {fetching ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : uploads.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhuma prescrição enviada ainda.</p>
            ) : (
              <div className="space-y-2">
                {uploads.map(u => (
                  <div key={u.id} className="flex items-center justify-between border border-border rounded-lg p-3 bg-card">
                    <div className="flex items-center gap-3">
                      {fileIcon(u.file_type)}
                      <div>
                        <p className="text-sm font-medium text-foreground">{u.file_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(u.residents as any)?.name} — Quarto {(u.residents as any)?.room}
                          {u.notes && ` • ${u.notes}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(u.file_path)}>
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(u.id, u.file_path)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
