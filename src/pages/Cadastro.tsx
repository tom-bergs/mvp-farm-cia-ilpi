import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function Cadastro() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) { toast.error('As senhas não coincidem'); return }
    if (!role) { toast.error('Selecione seu perfil de acesso'); return }
    setLoading(true)
    const { error } = await signUp(email, password, fullName, role)
    if (error) {
      toast.error('Erro ao criar conta. Tente novamente.')
      setLoading(false)
      return
    }
    toast.success('Conta criada! Verifique seu e-mail para confirmar o cadastro.')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">SeniorCare Farma</h1>
          <p className="text-muted-foreground">Crie sua conta</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Criar conta</CardTitle>
              <CardDescription>Preencha seus dados para começar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input id="fullName" placeholder="Seu nome" value={fullName}
                  onChange={e => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email}
                  onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Meu perfil</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger><SelectValue placeholder="Selecione seu perfil" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ilpi_admin">Administrador de ILPI</SelectItem>
                    <SelectItem value="profissional">Profissional de Saúde</SelectItem>
                    <SelectItem value="familia">Familiar de Residente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} minLength={6} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)} required />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar conta
              </Button>
              <p className="text-sm text-muted-foreground">
                Já tem conta?{' '}
                <Link to="/login" className="text-primary hover:underline">Entrar</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
