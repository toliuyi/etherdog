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

          h('div.welcome-screen__info__header', '欢迎使用云加密钱包'),

          h('div.welcome-screen__info__copy', '云加密钱包是简洁易用的开源以太坊浏览器钱包。云加密钱包基于Metamask开发，是Metamask的中文精简版。您可以用云加密钱包管理以太币（ETH）和基于以太坊的数字代币(ERC20 Token)，并操作以太坊去中心化应用（Dapp)。'),

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
