import PropTypes from 'prop-types'

const List = (props) => (
  <ul {...props}>
    {props.items.map(item => <li key={item.key}>{item.desc}</li>)}
  </ul>
)

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      desc: PropTypes.string,
    })
  ).isRequired
}

export default List