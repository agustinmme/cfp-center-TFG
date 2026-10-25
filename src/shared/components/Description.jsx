import theme from '../theme/index.js'

function Description({ children }) {
  return <p style={{ margin: 0, color: theme.login.mutedText, fontSize: '13px' }}>{children}</p>
}

export default Description
