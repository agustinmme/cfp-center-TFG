import theme from '../../theme/index.js'
import './Button.css'

function Button({
  children,
  type = 'button',
  className = '',
  variant = 'primary',
  icon,
  style,
  ...buttonProps
}) {
  const buttonVariant = variant === 'secondary' ? 'secondary' : 'primary'

  return (
    <button
      type={type}
      className={`app-button app-button--${buttonVariant} ${className}`.trim()}
      style={{
        '--button-primary-background': theme.button.primaryBackground,
        '--button-primary-text': theme.button.primaryText,
        '--button-secondary-background': theme.button.secondaryBackground,
        '--button-secondary-border': theme.button.secondaryBorder,
        '--button-secondary-text': theme.button.secondaryText,
        '--button-secondary-hover-background': theme.button.secondaryHoverBackground,
        ...style,
      }}
      {...buttonProps}
    >
      {icon}
      {children}
    </button>
  )
}

export default Button
