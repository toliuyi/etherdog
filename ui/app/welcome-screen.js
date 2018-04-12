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

          h('div.welcome-screen__info__copy', '以太狗是简洁易用的以太坊浏览器钱包，是基于Metamask开发的开源浏览器插件，是Metamask的中文精简版。您可以用以太狗管理以太币（ETH）和基于以太坊的代币(Token)，并操作以太坊去中心化应用（Dapp)。'),

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
