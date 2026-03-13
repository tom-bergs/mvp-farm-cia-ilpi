import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, CheckCircle } from 'lucide-react'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await resetPassword(email)
    if (error) {
      toast.error('Erro ao enviar e-mail. Verifique o endereço.')
      setLoading(false)
      return
    }
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">SeniorCare Farma</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recuperar senha</CardTitle>
            <CardDescription>
              {sent ? 'E-mail enviado!' : 'Enviaremos um link para redefinir sua senha'}
            </CardDescription>
          </CardHeader>
          {sent ? (
            <CardContent className="text-center space-y-3 py-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <p className="font-medium">Link enviado para {email}</p>
              <p className="text-sm text-muted-foreground">Verifique sua caixa de entrada e spam.</p>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" value={email}
                    onChange={e => setEmail(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar link de recuperação
                </Button>
              </CardFooter>
            </form>
          )}
          <CardFooter className="justify-center pt-0">
            <Link to="/login" className="text-sm text-primary hover:underline">
              Voltar para o login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
