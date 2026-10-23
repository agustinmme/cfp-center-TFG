import {
  Bell,
  BookOpen,
  ClipboardList,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

export const navigationGroups = [
  {
    label: 'GESTION ACADEMICA',
    items: [
      { label: 'Panel general', icon: LayoutDashboard },
      { label: 'Estudiantes', icon: UsersRound },
      { label: 'Cursos y modulos', icon: BookOpen },
      { label: 'Comisiones', icon: ClipboardList },
      { label: 'Inscripciones', icon: CreditCard },
      { label: 'Certificaciones', icon: GraduationCap },
      { label: 'Comunicaciones', icon: Megaphone },
      { label: 'Alertas', icon: Bell },
    ],
  },
  {
    label: 'ADMINISTRACION',
    items: [
      { label: 'Logs', icon: ShieldCheck },
      { label: 'Configuracion', icon: Settings },
    ],
  },
]

export function getNavigationForRole(role) {
  if (role === 'Administrador') return navigationGroups
  if (role === 'Administrativo') {
    return navigationGroups.filter((group) => group.label === 'GESTION ACADEMICA')
  }

  return []
}
