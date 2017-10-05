import Web3 from 'web3'
import Contract from './contract'

class ShaoCoin {
    constructor() {
        this.web3 = new Web3();
        this.mintProposals = [];
        this.transfers = [];

        // Web3 オブジェクトを初期化
        if (typeof web3 !== 'undefined') {
            if (Web3.givenProvider) {
                this.web3.setProvider(Web3.givenProvider);                
            } else {
                if(web3.currentProvider.sendAsync) {
                    web3.currentProvider.send = web3.currentProvider.sendAsync;
                    delete web3.currentProvider.sendAsync;
                }
                this.web3.setProvider(web3.currentProvider);
            }
            console.log('[Web3.js] initialized with web3 object');
        } else {
            // set the provider you want from Web3.providers
            this.web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
            console.log('[Web3.js] intialized with localhost JSON-RPC');
        }

        // 自分のアドレスをロード
        this.web3.eth.getAccounts().then((result) => {
            this.account = result[0];
        });
        
        // gas の価格を取得
        this.web3.eth.getGasPrice().then((result) => { this.gasPrice = result; });
        
        // 接続しているネットワークのホストを代入
        this.web3.eth.net.getId().then((result) => {
            switch(result) {
                case 1:
                    this.etherscanHost = 'https://etherscan.io/';
                    break;
                case 3:
                    this.etherscanHost = 'https://ropsten.etherscan.io/';
                    break;
                case 42:
                    this.etherscanHost = 'https://kovan.etherscan.io/';
                    break;
            }
        });

        // Contract を展開する
        this.contract = new this.web3.eth.Contract(Contract.abi, Contract.contractAddress);
    }

    faucet() {
        let contractMethod = this.contract.methods.faucet();
        let contractData = contractMethod.encodeABI();
        contractMethod.estimateGas({ from: this.account }).then((gasAmount) => {
            contractMethod.send(
                {
                    from: this.account,
                    gasPrice: this.gasPrice,
                    gas: gasAmount
                }
            ).then((receipt) => {
                console.log(['faucet done: ', receipt]);
            }).catch((error) => {
                console.error(error);
            });
            return null;
        });        
    }

    purchase(amount) {
        this.web3.eth.sendTransaction({
            from: this.account,
            to: Contract.contractAddress,
            value: amount
        })
        .then(function(receipt){
            console.log(receipt);
        });
    }
}

export default ShaoCoin