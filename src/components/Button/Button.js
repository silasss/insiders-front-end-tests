import PropTypes from "prop-types";

const Button = (props) => <button {...props}>{props.children}</button>

Button.propTypes = {
  children: PropTypes.string.isRequired
}

export default Button
