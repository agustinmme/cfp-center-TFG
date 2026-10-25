function HeaderTitle({ children, id }) {
  return (
    <h1
      id={id}
      style={{
        margin: '6px 0 8px',
        fontSize: '28px',
        lineHeight: 1.2,
      }}
    >
      {children}
    </h1>
  )
}

export default HeaderTitle
