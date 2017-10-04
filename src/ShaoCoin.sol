pragma solidity ^0.4.11;

contract ShaoCoin {
    string public name = "ShaoCoin 9";
    string public constant symbol = "SC9";
    uint8 public constant decimals = 3;
    mapping(address => uint256) coinBalances;
    mapping(address => uint256) tokenBalances;

    // private
    address _ownerAddress;
    uint256 _totalSupply = 0;

    function ShaoCoin() public {
        _ownerAddress = msg.sender;
    }

    function () public payable {
        uint256 value = msg.value / 1000000000000;
        _totalSupply += value;
        coinBalances[msg.sender] += value;
        tokenBalances[msg.sender] += value;
    }

    function faucet() public {
        uint256 value = 30000;
        _totalSupply += value;
        coinBalances[msg.sender] += value;
        tokenBalances[msg.sender] += value;
    }

    function changeOwner(address newOwnerAddress) public onlyOwner {
        _ownerAddress = newOwnerAddress;
    }

    modifier onlyOwner {
        require(msg.sender == _ownerAddress);
        _;
    }

    function totalSupply() public view returns (uint supply) {
        return _totalSupply;
    }

    function balanceOf(address targetAddress) public constant returns (uint256 balance) {
        return coinBalances[targetAddress];
    }

    function transfer(address to, uint256 amount) public returns (bool success) {
        if (amount <= 0) revert();
        if (amount > balanceOf(msg.sender)) revert();

        coinBalances[msg.sender] -= amount;
        coinBalances[to] += amount;
        return true;
    }

    function mint(uint256 amount) public onlyOwner returns (bool success) {
        if (amount <= 0) revert();
        _totalSupply += amount;
        coinBalances[msg.sender] += amount;
        tokenBalances[msg.sender] += amount;
        return true;
    }
}
