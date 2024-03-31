import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SolidFundrABI from "../artifacts/contracts/SolidFundr.sol/SolidFundr.json"; // Import contract ABI

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [funds, setFunds] = useState([]);
  const [fundIdInput, setFundIdInput] = useState("");
  const [contributors, setContributors] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with contract address
  const contractABI = SolidFundrABI.abi; // Replace with contract ABI

  // Function to initialize Metamask wallet
  const initWallet = async () => {
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
    }
    else {
      console.log("No account found");
    }
  }


  // Function to connect Metamask account
  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    const provider = new ethers.providers.Web3Provider(ethWallet);
    // Initialize contract instance
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contractInstance);

    // Update balance
    updateBalance();
  };

  // Function to update user balance
  const updateBalance = async () => {
    if (contract && account) {
      const userBalance = await contract.getContributions(account);
      setBalance(userBalance);
    }
  };

  // Function to donate to a fund
  const donateToFund = async (fundId) => {
    const amount = ethers.utils.parseEther("200"); // Amount set to 200 ETH

    try {
      const donationTx = await contract.donate(fundId, { value: amount });
      await donationTx.wait();
      updateBalance();
      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating to fund:", error);
      alert("Failed to donate to fund. Please try again.");
    }
  };


  // Function to create a new fund (campaign)
  const createFund = async () => {
    const targetAmount = ethers.utils.parseEther("200"); // Target amount set to 200 ETH
    const targetAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Target address
    const title = "Study"; // Campaign name set to "Study"
    const description = "Donation for child studies"; // Description

    try {
      const createFundTx = await contract.createFund(targetAmount, targetAddress, title, description);
      await createFundTx.wait();
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
    }
  };

  // Function to fetch list of funds
  const fetchFunds = async () => {
    try {
      const funds = await contract.getFunds();
      setFunds(funds);
    } catch (error) {
      console.error("Error fetching funds:", error);
      alert("Failed to fetch funds. Please try again.");
    }
  };

  const fetchContributors = async () => {
    try {
      const fundId = parseInt(fundIdInput);
      const fundContributors = await contract.getDonations(fundId);
      setContributors(fundContributors);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      alert("Failed to fetch contributors. Please try again.");
    }
  };

  const donateToLastFund = async () => {
    if (funds.length === 0) {
      alert("No funds available to donate to.");
      return;
    }

    const lastFundId = funds[funds.length - 1].id; // Get the ID of the last fund
    const amount = ethers.utils.parseEther("100"); // Amount set to 100 ETH

    try {
      const donationTx = await contract.donate(lastFundId, { value: amount });
      await donationTx.wait();
      updateBalance();
      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating to fund:", error);
      alert("Failed to donate to fund. Please try again.");
    }
  };

  useEffect(() => {
    initWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the SolidFundr Platform!</h1></header>
      <section>
        <h2>User Information</h2>
        <p>Account: {account}</p>
        <p>Balance: {balance}</p>
      </section>
      <section>
        <h2>Actions</h2>
        <button onClick={connectAccount}>Connect Wallet</button>
        <button onClick={() => donateToFund(0, ethers.utils.parseEther("1"))}>Donate to Fund 0</button>
        <button onClick={() => createFund(ethers.utils.parseEther("10"), "0x...", "Title", "Description")}>Create Fund</button>
        <button onClick={fetchFunds}>Fetch Funds</button>
        <button onClick={donateToLastFund}>Donate to Last Fund</button>
        <div>
          <label htmlFor="fundIdInput">Fund ID:</label>
          <input
            type="text"
            id="fundIdInput"
            value={fundIdInput}
            onChange={(e) => setFundIdInput(e.target.value)}
          />
          <button onClick={fetchContributors}>Fetch Contributors</button>
        </div>

      </section>
      <section>
        <h2>Funds</h2>
        <ul>
          {funds.map((fund, index) => (
            <li key={index}>
              <p>Title: {fund.title}</p>
              <p>Description: {fund.description}</p>
              <p>Amount: {ethers.utils.formatEther(fund.amount)} ETH</p>
              <p>Target Amount: {ethers.utils.formatEther(fund.targetAmount)} ETH</p>
              <p>Completed: {fund.completed.toString()}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Contributors</h2>
        <ul>
          {contributors.map((contributor, index) => (
            <li key={index}>
              <p>Address: {contributor.author}</p>
              <p>Amount: {ethers.utils.formatEther(contributor.amount)} ETH</p>
            </li>
          ))}
        </ul>
      </section>
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}
      </style>
    </main>
  );
}
