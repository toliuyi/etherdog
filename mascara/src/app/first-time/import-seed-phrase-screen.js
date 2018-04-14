import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {
  createNewVaultAndRestore,
  hideWarning,
  displayWarning,
  unMarkPasswordForgotten,
} from '../../../../ui/app/actions'

class ImportSeedPhraseScreen extends Component {
  static propTypes = {
    warning: PropTypes.string,
    back: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    createNewVaultAndRestore: PropTypes.func.isRequired,
    hideWarning: PropTypes.func.isRequired,
    displayWarning: PropTypes.func,
    leaveImportSeedScreenState: PropTypes.func,
  };

  state = {
    seedPhrase: '',
    password: '',
    confirmPassword: '',
  }

  parseSeedPhrase = (seedPhrase) => {
    return seedPhrase
      .match(/\w+/g)
      .join(' ')
  }

  onChange = ({ seedPhrase, password, confirmPassword }) => {
    const {
      password: prevPassword,
      confirmPassword: prevConfirmPassword,
    } = this.state
    const { displayWarning, hideWarning } = this.props

    let warning = null

    if (seedPhrase && this.parseSeedPhrase(seedPhrase).split(' ').length !== 12) {
      warning = '种子备份密语是十二个单词'
    } else if (password && password.length < 8) {
      warning = '密码最少需要八位'
    } else if ((password || prevPassword) !== (confirmPassword || prevConfirmPassword)) {
      warning = '两次密码不匹配'
    }

    if (warning) {
      displayWarning(warning)
    } else {
      hideWarning()
    }

    seedPhrase && this.setState({ seedPhrase })
    password && this.setState({ password })
    confirmPassword && this.setState({ confirmPassword })
  }

  onClick = () => {
    const { password, seedPhrase } = this.state
    const {
      createNewVaultAndRestore,
      next,
      displayWarning,
      leaveImportSeedScreenState,
    } = this.props

    leaveImportSeedScreenState()
    createNewVaultAndRestore(password, this.parseSeedPhrase(seedPhrase))
      .then(next)
  }

  render () {
    const { seedPhrase, password, confirmPassword } = this.state
    const { warning } = this.props
    const importDisabled = warning || !seedPhrase || !password || !confirmPassword
    return (
      <div className="first-view-main-wrapper">
        <div className="first-view-main">
          <div className="import-account">
            <a
              className="import-account__back-button"
              onClick={e => {
                e.preventDefault()
                this.props.back()
              }}
              href="#"
            >
              {`< 上一步`}
            </a>
            <div className="import-account__title">
            使用助记词恢复钱包
            </div>
            <div className="import-account__selector-label">
            在这里输入助记词，助记词是12个小写英文单词。注意钱包恢复后只显示地址1，点击“更多地址”恢复其他地址。
            </div>
            <div className="import-account__input-wrapper">
              <label className="import-account__input-label">助记词</label>
              <textarea
                className="import-account__secret-phrase"
                onChange={e => this.onChange({seedPhrase: e.target.value})}
                value={this.state.seedPhrase}
                placeholder="单词之间有1个空格"
              />
            </div>
            <span
              className="error"
            >
              {this.props.warning}
            </span>
            <div className="import-account__input-wrapper">
              <label className="import-account__input-label">新密码</label>
              <input
                className="first-time-flow__input"
                type="password"
                placeholder="新密码 (至少8位)"
                onChange={e => this.onChange({password: e.target.value})}
              />
            </div>
            <div className="import-account__input-wrapper">
              <label
                className={classnames('import-account__input-label', {
                  'import-account__input-label__disabled': password.length < 8,
                })}
              >确认密码</label>
              <input
                className={classnames('first-time-flow__input', {
                  'first-time-flow__input__disabled': password.length < 8,
                })}
                type="password"
                placeholder="确认密码"
                onChange={e => this.onChange({confirmPassword: e.target.value})}
                disabled={password.length < 8}
              />
            </div>
            <button
              className="first-time-flow__button"
              onClick={() => !importDisabled && this.onClick()}
              disabled={importDisabled}
            >
              恢复
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ appState: { warning } }) => ({ warning }),
  dispatch => ({
    leaveImportSeedScreenState: () => {
      dispatch(unMarkPasswordForgotten())
    },
    createNewVaultAndRestore: (pw, seed) => dispatch(createNewVaultAndRestore(pw, seed)),
    displayWarning: (warning) => dispatch(displayWarning(warning)),
    hideWarning: () => dispatch(hideWarning()),
  })
)(ImportSeedPhraseScreen)
