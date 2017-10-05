import ShaoCoin from './shao_coin'
import Vue from 'vue'

// app Vue instance
var shaoCoinVending = new Vue({
    // app initial state
    data: {
        totalSupply: 0,
        myBalance: 0,
        account: null,
        purchaseAmount: 0,
        etherscanHost: 'https://etherscan.io/'
    }
});

// mount
shaoCoinVending.$mount('#shao_coin_vending')


window.addEventListener('load', () => {
    let shaoCoin = new ShaoCoin();

    shaoCoin.contract.methods.totalSupply().call().then((result) => {
        shaoCoinVending.totalSupply = result / 1000.0;
    });

    shaoCoinVending.$on('getBalance', () => { 
        shaoCoin.contract.methods.balanceOf(shaoCoin.account).call().then((result) => {
            shaoCoinVending.myBalance = result / 1000.0;
        });
    });

    shaoCoinVending.$on('faucet', () => { 
        shaoCoin.faucet();
    });

    shaoCoinVending.$on('purchase', (amount) => { 
        shaoCoin.purchase(amount * 1000000000000000);
    });

});