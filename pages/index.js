import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const send = async () => {
    if (atm) {
      let tx = await atm.send(recipient, amount);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount} className="custom-button">
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <div className="button-group">
          <button onClick={deposit} className="custom-button">Deposit 1 ETH</button>
          <button onClick={withdraw} className="custom-button">Withdraw 1 ETH</button>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="custom-input"
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="custom-input"
          />
          <button onClick={send} className="custom-button">
            Send
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <div className="header-content">
          <h1>Metamask Wallet Integration</h1>
        </div>
      </header>
      {initUser()}
      <style jsx>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          text-align: center;
        }
        .header-content {
          padding: 20px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .button-group {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .custom-button {
          background-color: #4a90e2;
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 0 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
        }
        .custom-button:hover {
          transform: translateY(-5px);
          background-color: #357ab8;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .custom-input {
          margin: 10px 0;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 250px;
        }
      `}</style>
    </main>
  );
}
