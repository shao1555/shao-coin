pragma solidity ^0.4.11;

import "ds-test/test.sol";

import "./ShaoCoin.sol";

contract ShaoCoinTest is DSTest {
    ShaoCoin coin;

    function setUp() public {
        coin = new ShaoCoin();
    }
}