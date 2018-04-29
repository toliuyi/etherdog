# 关于以太狗
以太狗是简便可靠的以太坊钱包，用于管理以太币和各种以太坊代币。以太狗是基于[metamask](https://github.com/MetaMask/metamask-extension)开发的开源软件，是[metamask](https://github.com/MetaMask/metamask-extension)的中文精简版。

# 用户支持
如果您使用以太狗遇到问题，可参阅[以太狗项目wiki](https://github.com/toliuyi/etherdog/wiki)。还可以在[以太狗网站](https://etherdog.io)给开发团队留言，寻求帮助。

# Dapp应用兼容性
以太狗与metamask底层代码一致，100%兼容。经过metamask测试的Dapp，都可直接通过以太狗使用。

# 构建方法
以太狗与metamask构建方法一致：

 - 安装[Node.js](https://nodejs.org/en/) 6.3.1或以上版本；
 - 在项目工程目录执行 `npm install`；
 - 安装gulp `npm install -g gulp-cli`.
 - 执行`gulp build`，输出在`./dist/`目录；
 - 执行`gulp zip`获得安装包，或者用`gulp dist`执行构建和打包，打包的输出在`/builds`目录；
