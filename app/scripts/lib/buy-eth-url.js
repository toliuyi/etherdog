module.exports = getBuyEthUrl

function getBuyEthUrl ({ network, amount, address }) {
  let url
  switch (network) {
    case '1':
      url = `https://yunjiami.github.io/`
      break

    case '3':
      url = 'https://faucet.metamask.io/'
      break

    case '4':
      url = 'https://www.rinkeby.io/'
      break

    case '42':
      url = 'https://github.com/kovan-testnet/faucet'
      break
  }
  return url
}
