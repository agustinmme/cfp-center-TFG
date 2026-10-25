import theme from '../theme/index.js'

function Legend({ text }) {
  return (
    <legend
      style={{
        width: '100%',
        padding: '0 0 6px',
        marginBottom: '6px',
        borderBottom: `1px solid ${theme.login.border}`,
        color: theme.button.primaryBackground,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.1em',
      }}
    >
      {text}
    </legend>
  )
}

export default Legend
