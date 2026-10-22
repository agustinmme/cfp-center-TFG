function Button({
  children,
  type = 'button',
  className = '',
  endIcon,
  ...buttonProps
}) {
  return (
    <button
      type={type}
      className={`btn ${className}`.trim()}
      {...buttonProps}
    >
      {children}
      {endIcon}
    </button>
  )
}

export default Button
