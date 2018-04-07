import EventEmitter from 'events'
import h from 'react-hyperscript'
import { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {closeWelcomeScreen} from './actions'
import Mascot from './components/mascot'

class WelcomeScreen extends Component {
  static propTypes = {
    closeWelcomeScreen: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.animationEventEmitter = new EventEmitter()
  }

  initiateAccountCreation = () => {
    this.props.closeWelcomeScreen()
  }

  render () {
    return h('div.welcome-screen', [

        h('div.welcome-screen__info', [

          h(Mascot, {
            animationEventEmitter: this.animationEventEmitter,
            width: '225',
            height: '225',
          }),

          h('div.welcome-screen__info__header', '欢迎使用以太狗'),

          h('div.welcome-screen__info__copy', '以太狗是安全的以太坊身份验证软件。'),

          h('div.welcome-screen__info__copy', `通过以太狗可以持有使用以太坊和基于以太坊的代币，
          也可以与分布式应用（Dapp)交互。`),

          h('button.welcome-screen__button', {
            onClick: this.initiateAccountCreation,
          }, '继续'),

        ]),

    ])
  }
}

export default connect(
  null,
  dispatch => ({
    closeWelcomeScreen: () => dispatch(closeWelcomeScreen()),
  })
)(WelcomeScreen)
