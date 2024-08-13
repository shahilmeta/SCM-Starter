## Next.js DApp Starter with Hardhat

This starter project provides a foundation for building decentralized applications (dApps) using Next.js and Hardhat. It integrates a basic Solidity smart contract with a React-based front-end that interacts with the Ethereum blockchain via ethers.js.

**Features:**

- Next.js framework for building dynamic and SEO-friendly front-ends.
- Hardhat development environment for writing, testing, and deploying smart contracts.
- Included example smart contract demonstrating basic interaction functionalities.
- React front-end ready to communicate with deployed contracts.

**Getting Started:**

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

   Open two additional terminal windows:

   - In the second terminal, start a local Ethereum node using Hardhat:

     ```bash
     npx hardhat node
     ```

   - In the third terminal, deploy the smart contract to the local network:

     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Run the Front-End:**

   In the first terminal, launch the Next.js development server:

   ```bash
   npm run dev
   ```

5. **Access the Application:**

   Open your web browser and navigate to:

   ```
   http://localhost:3000/
   ```

**Project Structure:**

- `contracts/`: Directory containing Solidity smart contract files.
- `artifacts/`: Stores compiled contract artifacts generated by Hardhat.
- `scripts/`: Houses scripts for deployment and other tasks.
- `frontend/`: Holds the Next.js React front-end code.
- `hardhat.config.js`: Hardhat configuration file for development environment.
- `next.config.js`: Next.js configuration file for the front-end application.
- `package.json`: Project dependencies and configuration.
- `README.md`: Project documentation (you are reading this!).

**Prerequisites:**

- Node.js and npm installed on your machine.
- MetaMask browser extension for interacting with the Ethereum blockchain (available for Chrome, Firefox, and Brave).
