import { X } from 'lucide-react'
import Description from '../Description.jsx'
import theme from '../../theme/index.js'

function Modal({
  title,
  description,
  onClose,
  children,
  footer,
  open = true,
  titleId = 'modal-title',
  descriptionId = 'modal-description',
  as: Dialog = 'div',
  ...dialogProps
}) {
  if (!open) return null

  return (
    <div
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '56px 16px 24px', backgroundColor: theme.modal.overlay }}
    >
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        {...(description ? { 'aria-describedby': descriptionId } : {})}
        {...dialogProps}
        style={{ width: '100%', maxWidth: '640px', maxHeight: 'calc(100vh - 80px)', overflow: 'auto', backgroundColor: theme.white, borderRadius: '12px', boxShadow: theme.modal.shadow, ...dialogProps.style }}
      >
        <div className="d-flex align-items-start justify-content-between gap-3" style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${theme.login.border}` }}>
          <div>
            <h2 id={titleId} style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 600 }}>{title}</h2>
            {description && <div id={descriptionId}><Description fontSize="12px">{description}</Description></div>}
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" style={{ width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 0, borderRadius: '6px', backgroundColor: theme.white, color: theme.button.secondaryText }}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="d-flex flex-column gap-4" style={{ padding: '20px 24px 24px' }}>
          {children}
        </div>

        {footer && <div className="d-flex justify-content-end gap-3" style={{ padding: '16px 24px', borderTop: `1px solid ${theme.login.border}` }}>{footer}</div>}
      </Dialog>
    </div>
  )
}

export default Modal
