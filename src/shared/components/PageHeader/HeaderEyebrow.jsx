import theme from '../../theme/index.js'

function HeaderEyebrow({ children }) {
  return (
    <div
      style={{
        color: theme.login.eyebrow,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.14em',
      }}
    >
      {children}
    </div>
  )
}

export default HeaderEyebrow
