# **Starter Next/Hardhat Project**

## **Project Title: Next.js & Hardhat Ethereum DApp Starter Kit**

### **Description**
The Next.js & Hardhat Ethereum DApp Starter Kit is a foundational template designed to help developers quickly set up a decentralized application (DApp) environment. It integrates the power of Next.js for the front-end and Hardhat for Ethereum smart contract development. This project includes a basic Solidity smart contract and a React-based front-end that interacts with the Ethereum blockchain using ethers.js, making it easier to develop, test, and deploy decentralized applications.

### **Overview**
This starter kit serves as a comprehensive boilerplate for blockchain developers. It combines the modern React framework (Next.js) with Hardhat, an Ethereum development environment, to offer a smooth development experience. Whether you're new to Ethereum development or a seasoned developer, this project provides the essential tools to start building decentralized applications on the Ethereum network. The project demonstrates how to deploy smart contracts, interact with them via a React front-end, and test the entire setup in a local blockchain environment.

## **Getting Started**

Follow these steps to set up and run the project on your local machine:

### **Installing**

1. **Clone the GitHub repository to your local machine:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo
   ```

3. **Install the project dependencies:**

   ```bash
   npm install
   ```

### **Executing Program**

1. **Open two additional terminals in your VS Code.**

2. **In the second terminal, start a local Ethereum node using Hardhat:**

   ```bash
   npx hardhat node
   ```

3. **In the third terminal, deploy the smart contract to the local network:**

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

4. **In the first terminal, launch the front-end:**

   ```bash
   npm run dev
   ```

5. **Access the project in your web browser at [http://localhost:3000/](http://localhost:3000/).**

### **Project Structure**

- **`contracts/`**: Contains Solidity smart contract files.
- **`artifacts/`**: Stores compiled contract artifacts.
- **`scripts/`**: Includes scripts for deploying contracts.
- **`frontend/`**: Holds the Next.js React front-end code.
- **`hardhat.config.js`**: Hardhat configuration file.
- **`next.config.js`**: Next.js configuration file.
- **`package.json`**: Project configuration and dependencies.
- **`README.md`**: Project documentation.

### **Help**

If you encounter any issues or have questions, here are a few resources:

- **Ethereum Documentation**: [Ethereum Docs](https://ethereum.org/en/developers/docs/)
- **Hardhat Documentation**: [Hardhat Docs](https://hardhat.org/getting-started/)
- **Next.js Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Ethers.js Documentation**: [Ethers.js Docs](https://docs.ethers.io/v5/)

Feel free to modify and extend this project for your Ethereum decentralized application (DApp) development.

### **Notes**

- Ensure you have Node.js and npm installed on your machine before proceeding.
- Make sure you have the MetaMask extension installed in your browser for Ethereum wallet interaction.
