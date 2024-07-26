import PropTypes from 'prop-types'

export function PostSorting({
  fields = [],
  sortBy,
  onSortByChanged,
  sortOrder,
  onSortOrderChanged,
}) {
  return (
    <div>
      <label htmlFor='sort-by'>Sort by: </label>
      <select
        name='sort-by'
        id='sort-by'
        value={sortBy}
        onChange={(e) => onSortByChanged(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}
      <label htmlFor='sort-order'>Sort Order: </label>
      <select
        name='sort-order'
        id='sort-order'
        value={sortOrder}
        onChange={(e) => onSortOrderChanged(e.target.value)}
      >
        <option value='ascending'>ascending</option>
        <option value='descending'>descending</option>
      </select>
    </div>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortByChanged: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSortOrderChanged: PropTypes.func.isRequired,
}
