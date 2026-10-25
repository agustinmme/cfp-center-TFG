import theme from '../../theme/index.js'

function DataTable({ columns, rows, getRowKey, emptyState = 'No hay datos disponibles.' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="w-100" style={{ minWidth: '760px', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={{
                  padding: '10px 8px',
                  textAlign: column.align || 'left',
                  borderBottom: `1px solid ${theme.login.border}`,
                  color: theme.login.mutedText,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '.08em',
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}>
              {columns.map((column, columnIndex) => (
                <td
                  key={column.key}
                  style={{
                    ...(columnIndex === 0 ? { height: '56px' } : {}),
                    padding: '0 8px',
                    textAlign: column.align || 'left',
                    borderBottom: `1px solid ${theme.login.border}`,
                    ...(column.cellStyle || {}),
                  }}
                >
                  {column.render ? column.render(row, rowIndex) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="mb-0" style={{ padding: '32px 8px', color: theme.login.mutedText, fontSize: '13px' }}>{emptyState}</p>}
    </div>
  )
}

export default DataTable
