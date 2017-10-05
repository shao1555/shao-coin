# shao-coin/web3-app

## setup

```shell
npm install
```

## development

下記手順で webpack-dev-server を起動できる。

```shell
npm start
```

## build

```shell
# 開発環境 - コード難読化を含まない
NODE_ENV=development npm build

# 本番環境 - コード難読化を含む
NODE_ENV=production npm build
```
