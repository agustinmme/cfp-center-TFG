import theme from '../theme/index.js'

function Logo({ size = 56 }) {
  const scale = size / 56

  return (
    <div
      role="img"
      aria-label="MI CFP"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        color: theme.sidebar.brand,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          height: `${size}px`,
          color: theme.sidebar.brand,
          fontSize: `${22 * scale}px`,
          fontWeight: 700,
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${14 * scale}px 0 calc(${14 * scale}px + 0.12em)`,
            border: `${2 * scale}px solid ${theme.sidebar.brand}`,
            borderRight: 0,
            borderRadius: '3px 0 0 3px',
            letterSpacing: '0.12em',
          }}
        >
          MI
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${16 * scale}px`,
            borderRadius: '0 3px 3px 0',
            backgroundColor: theme.sidebar.brand,
            color: theme.sidebar.background,
            letterSpacing: '0.04em',
          }}
        >
          CFP
        </span>
      </div>
    </div>
  )
}

export default Logo
