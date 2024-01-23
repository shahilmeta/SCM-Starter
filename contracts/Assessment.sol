// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address public owner;
    mapping(address => uint256) public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Transfer(address recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    constructor(uint256 initBalance) payable {
        owner = msg.sender;
        balance[owner] = initBalance;
    }
    function getOwnerAddress() external view returns (address) {
        return owner;
    }


    function getBalance() external view returns (uint256) {
        return balance[owner];
    }

   
    function deposit(uint256 _amount) external payable onlyOwner {
        uint256 _previousBalance = balance[owner];

        // Perform transaction
        balance[owner] += _amount;

        // Assert transaction completed successfully
        assert(balance[owner] == _previousBalance + _amount);

        // Emit the event
        emit Deposit(_amount);
    }

    // Custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) external onlyOwner {
        uint256 _previousBalance = balance[owner];
        if (balance[owner] < _withdrawAmount) {
            revert InsufficientBalance({ balance: balance[owner], withdrawAmount: _withdrawAmount });
        }

        // Withdraw the given amount
        balance[owner] -= _withdrawAmount;

        // Assert the balance is correct
        assert(balance[owner] == (_previousBalance - _withdrawAmount));

        // Emit the event
        emit Withdraw(_withdrawAmount);
    }

    function transfer(address _recipient, uint256 _amount) external onlyOwner {
        require(_amount <= balance[owner], "Insufficient balance");

        // Transfer the specified amount to the recipient
        balance[_recipient] += _amount;
        // Update the balance
        balance[owner] -= _amount;

        // Emit the event
        emit Transfer(_recipient, _amount);
    }
}
