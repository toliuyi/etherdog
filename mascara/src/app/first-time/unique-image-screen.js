import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Identicon from '../../../../ui/app/components/identicon'
import Breadcrumbs from './breadcrumbs'

class UniqueImageScreen extends Component {
  static propTypes = {
    address: PropTypes.string,
    next: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div className="first-view-main-wrapper">
        <div className="first-view-main">
          <div className="unique-image">
            <Identicon address={this.props.address} diameter={70} />
            <div className="unique-image__title">你独一无二的钱包账户头像。</div>
            <div className="unique-image__body-text">
            此头像图片根据你的新账号信息通过代码编程生成。
            </div>
            <div className="unique-image__body-text">
            当有需要你确认的事务，你都会看到这个头像图片。
            </div>
            <button
              className="first-time-flow__button"
              onClick={this.props.next}
            >
              下一步
            </button>
            <Breadcrumbs total={3} currentIndex={1} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ metamask: { selectedAddress } }) => ({
    address: selectedAddress,
  })
)(UniqueImageScreen)
