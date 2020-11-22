import PropTypes from 'prop-types'

const InputText = (props) => <input {...props} type="text" />

InputText.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default InputText