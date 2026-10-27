import HomePage from '../../features/home/pages/HomePage.jsx'
import StudentsPage from '../../features/students/pages/StudentsPage.jsx'
import CoursesPage from '../../features/courses/pages/Main.jsx'
import CommissionsPage from '../../features/commissions/pages/CommissionsPage.jsx'
import CertificatesPage from '../../features/certificates/pages/CertificatesPage.jsx'
import CommunicationsPage from '../../features/communications/pages/CommunicationsPage.jsx'
import AlertsPage from '../../features/alerts/pages/AlertsPage.jsx'
import LogsPage from '../../features/logs/pages/LogsPage.jsx'
import ConfigurationPage from '../../features/configuration/pages/ConfigurationPage.jsx'

export const navigationViews = {
  'Panel general': HomePage,
  Estudiantes: StudentsPage,
  'Cursos y modulos': CoursesPage,
  Comisiones: CommissionsPage,
  Certificaciones: CertificatesPage,
  Comunicaciones: CommunicationsPage,
  Alertas: AlertsPage,
  Logs: LogsPage,
  Configuracion: ConfigurationPage,
}
