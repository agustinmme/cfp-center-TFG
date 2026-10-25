import theme from '../theme/index.js'

function Description({ children, fontSize = '13px' }) {
  return <p style={{ margin: 0, color: theme.login.mutedText, fontSize }}>{children}</p>
}

export default Description
