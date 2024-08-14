# Next.js DApp Starter with Hardhat

This starter project provides a foundation for building decentralized applications (dApps) using Next.js and Hardhat. It integrates a basic Solidity smart contract with a React-based front-end that interacts with the Ethereum blockchain via ethers.js.

## Description

This project is designed to help developers get started with building decentralized applications (dApps) by providing a pre-configured environment using Next.js for the front-end and Hardhat for smart contract development. The starter kit includes a basic smart contract, setup for testing, and deployment scripts, along with a React-based front-end that communicates with the Ethereum blockchain.

## Getting Started

### Installing

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   ```

   Replace `<your-username>` and `<your-repo>` with your GitHub username and repository name.

2. **Install Dependencies:**

   Navigate to the project directory and run:

   ```bash
   cd <your-repo>
   npm install
   ```

3. **Start Development Environment:**

   - Open a terminal and start a local Ethereum node using Hardhat:

     ```bash
     npx hardhat node
     ```

   - In another terminal, deploy the smart contract to the local network:

     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Run the Front-End:**

   Launch the Next.js development server:

   ```bash
   npm run dev
   ```

5. **Access the Application:**

   Open your web browser and navigate to:

   ```
   http://localhost:3000/
   ```

### Executing program

* How to run the program
  * Clone the repository as shown above.
  * Install dependencies using `npm install`.
  * Start the local Ethereum node and deploy the smart contract using the Hardhat commands.
  * Run the Next.js development server to launch the front-end.

```
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
npm run dev
```

## Help

If you encounter any issues, ensure that all dependencies are installed correctly, and that your local Ethereum node is running.

```
npx hardhat help
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
