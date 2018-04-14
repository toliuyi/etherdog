import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'
import shuffle from 'lodash.shuffle'
import {compose, onlyUpdateForPropTypes} from 'recompose'
import Identicon from '../../../../ui/app/components/identicon'
import {confirmSeedWords} from '../../../../ui/app/actions'
import Breadcrumbs from './breadcrumbs'
import LoadingScreen from './loading-screen'

const LockIcon = props => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="401.998px"
    height="401.998px"
    viewBox="0 0 401.998 401.998"
    style={{enableBackground: 'new 0 0 401.998 401.998'}}
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <path
        d="M357.45,190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218
          C266.093,12.563,236.025,0,200.998,0c-35.026,0-65.1,12.563-90.222,37.688C85.65,62.814,73.091,92.884,73.091,127.907v54.821
          h-9.135c-7.611,0-14.084,2.663-19.414,7.993c-5.33,5.326-7.994,11.799-7.994,19.417V374.59c0,7.611,2.665,14.086,7.994,19.417
          c5.33,5.325,11.803,7.991,19.414,7.991H338.04c7.617,0,14.085-2.663,19.417-7.991c5.325-5.331,7.994-11.806,7.994-19.417V210.135
          C365.455,202.523,362.782,196.051,357.45,190.721z M274.087,182.728H127.909v-54.821c0-20.175,7.139-37.402,21.414-51.675
          c14.277-14.275,31.501-21.411,51.678-21.411c20.179,0,37.399,7.135,51.677,21.411c14.271,14.272,21.409,31.5,21.409,51.675V182.728
          z"
      />
    </g>
  </svg>
);

class BackupPhraseScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    seedWords: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    confirmSeedWords: PropTypes.func.isRequired,
  };

  static defaultProps = {
    seedWords: ''
  };

  static PAGE = {
    SECRET: 'secret',
    CONFIRM: 'confirm'
  };

  constructor(props) {
    const {seedWords} = props
    super(props)
    this.state = {
      isShowingSecret: false,
      page: BackupPhraseScreen.PAGE.SECRET,
      selectedSeeds: [],
      shuffledSeeds: seedWords && shuffle(seedWords.split(' ')),
    }
  }

  renderSecretWordsContainer () {
    const { isShowingSecret } = this.state

    return (
      <div className="backup-phrase__secret">
        <div className={classnames('backup-phrase__secret-words', {
          'backup-phrase__secret-words--hidden': !isShowingSecret
        })}>
          {this.props.seedWords}
        </div>
        {!isShowingSecret && (
          <div
            className="backup-phrase__secret-blocker"
            onClick={() => this.setState({ isShowingSecret: true })}
          >
            <LockIcon width="28px" height="35px" fill="#FFFFFF" />
            <div
              className="backup-phrase__reveal-button"
            >
              点击此处显示钱包助记词
            </div>
          </div>
        )}
      </div>
    )
  }

  renderSecretScreen () {
    const { isShowingSecret } = this.state

    return (
      <div className="backup-phrase__content-wrapper">
        <div className="backup-phrase__phrase">
          <div className="backup-phrase__title">保存助记词</div>
          <div className="backup-phrase__body-text">
          请妥善保存您的钱包助记词，通过助记词可使用以太狗、Metamask及很多支持BIP39标准的钱包软件恢复你的以太坊钱包。
          </div>
          <div className="backup-phrase__body-text">
          警告：任何人知道你的助记词，都可以随时转走以太坊钱包内的全部资产。
          </div>
          {this.renderSecretWordsContainer()}
        </div>
        <div className="backup-phrase__tips">
          <div className="backup-phrase__tips-text">保存助记词的推荐方法:</div>
          <div className="backup-phrase__tips-text">
          将助记词清晰地抄在纸上，共抄写两份，注意一个字母都不能写错。将两份记录密封在塑料袋里，分别保存在不同地点，避免由于失火、失窃同时丢失两份记录。记录保存的位置应尽量隐秘，比如夹在书架上的书页中。不要夹在会被人借走的书里，注意记住书名。定期检查保存的助记词，如果一份损坏，立即再抄写一份，总是保持有两个可以使用的备份记录。如果发现助记词丢失或者泄露，马上新建钱包，将老钱包的资产全部转移至新钱包，并妥善保管新钱包的助记词。
          </div>
        </div>
        <div className="backup-phrase__next-button">
          <button
            className="first-time-flow__button"
            onClick={() => isShowingSecret && this.setState({
              isShowingSecret: false,
              page: BackupPhraseScreen.PAGE.CONFIRM,
            })}
            disabled={!isShowingSecret}
          >
            下一步
          </button>
          <Breadcrumbs total={3} currentIndex={1} />
        </div>
      </div>
    )
  }

  renderConfirmationScreen() {
    const { seedWords, confirmSeedWords, next } = this.props;
    const { selectedSeeds, shuffledSeeds } = this.state;
    const isValid = seedWords === selectedSeeds.map(([_, seed]) => seed).join(' ')

    return (
      <div className="backup-phrase__content-wrapper">
        <div>
          <div className="backup-phrase__title">确认钱包助记词</div>
          <div className="backup-phrase__body-text">
          请按正确的顺序点击助记词。
          </div>
          <div className="backup-phrase__confirm-secret">
            {selectedSeeds.map(([_, word], i) => (
              <button
                key={i}
                className="backup-phrase__confirm-seed-option"
              >
                {word}
              </button>
            ))}
          </div>
          <div className="backup-phrase__confirm-seed-options">
            {shuffledSeeds.map((word, i) => {
              const isSelected = selectedSeeds
                .filter(([index, seed]) => seed === word && index === i)
                .length

              return (
                <button
                  key={i}
                  className={classnames('backup-phrase__confirm-seed-option', {
                    'backup-phrase__confirm-seed-option--selected': isSelected
                  })}
                  onClick={() => {
                    if (!isSelected) {
                      this.setState({
                        selectedSeeds: [...selectedSeeds, [i, word]]
                      })
                    } else {
                      this.setState({
                        selectedSeeds: selectedSeeds
                          .filter(([index, seed]) => !(seed === word && index === i))
                      })
                    }
                  }}
                >
                  {word}
                </button>
              )
            })}
          </div>
          <button
            className="first-time-flow__button"
            onClick={() => isValid && confirmSeedWords().then(next)}
            disabled={!isValid}
          >
            确认
          </button>
        </div>
      </div>
    )
  }

  renderBack () {
    return this.state.page === BackupPhraseScreen.PAGE.CONFIRM
      ? (
        <a
          className="backup-phrase__back-button"
          onClick={e => {
            e.preventDefault()
            this.setState({
              page: BackupPhraseScreen.PAGE.SECRET
            })
          }}
          href="#"
        >
          {`< 上一步`}
        </a>
      )
      : null
  }

  renderContent () {
    switch (this.state.page) {
      case BackupPhraseScreen.PAGE.CONFIRM:
        return this.renderConfirmationScreen()
      case BackupPhraseScreen.PAGE.SECRET:
      default:
        return this.renderSecretScreen()
    }
  }

  render () {
    return this.props.isLoading
      ? <LoadingScreen loadingMessage="Creating your new account" />
      : (
        <div className="first-view-main-wrapper">
          <div className="first-view-main">
            <div className="backup-phrase">
              {this.renderBack()}
              <Identicon address={this.props.address} diameter={70} />
              {this.renderContent()}
            </div>
          </div>
        </div>
      )
  }
}

export default compose(
  onlyUpdateForPropTypes,
  connect(
    ({ metamask: { selectedAddress, seedWords }, appState: { isLoading } }) => ({
      seedWords,
      isLoading,
      address: selectedAddress,
    }),
    dispatch => ({
      confirmSeedWords: () => dispatch(confirmSeedWords()),
    })
  )
)(BackupPhraseScreen)
