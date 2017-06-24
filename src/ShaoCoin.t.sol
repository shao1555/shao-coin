pragma solidity ^0.4.11;

import "ds-test/test.sol";

import "./ShaoCoin.sol";

contract ShaoCoinTest is DSTest {
    ShaoCoin coin;

    function setUp() {
        coin = new ShaoCoin();
    }

    function testFail_basic_sanity() {
        assert(false);
    }

    function test_basic_sanity() {
        assert(true);
    }
}
