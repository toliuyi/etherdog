const { Component } = require('react')
const PropTypes = require('prop-types')
const h = require('react-hyperscript')
const classnames = require('classnames')
const R = require('ramda')

class SimpleDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  getDisplayValue () {
    const { selectedOption, options } = this.props
    const matchesOption = option => option.value === selectedOption
    const matchingOption = R.find(matchesOption)(options)
    return matchingOption
      ? matchingOption.displayValue || matchingOption.value
      : selectedOption
  }

  handleClose () {
    this.setState({ isOpen: false })
  }

  toggleOpen () {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  renderOptions () {
    const { options, onSelect, selectedOption } = this.props

    return h('div', [
      h('div.simple-dropdown__close-area', {
        onClick: event => {
          event.stopPropagation()
          this.handleClose()
        },
      }),

    ])
  }

  render () {
    const { placeholder } = this.props
    const { isOpen } = this.state

    return h(
      'div.simple-dropdown',
      {
        onClick: () => this.toggleOpen(),
      },
      [
        h('div.simple-dropdown__selected', this.getDisplayValue() || placeholder || 'Select'),

        isOpen && this.renderOptions(),
      ]
    )
  }
}

SimpleDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  selectedOption: PropTypes.string,
}

module.exports = SimpleDropdown
