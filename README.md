# BlockVote DApp

Welcome to **BlockVote**, a decentralized application (DApp) designed to revolutionize the voting process using the power of Blockchain technology. Built on the Ethereum Blockchain and developed with Solidity and AngularJS, BlockVote ensures secure, transparent, and hassle-free electronic voting.

## Features

- **Secure Voting**: Leveraging Ethereum Blockchain to provide immutable and tamper-proof voting records.
- **Decentralized System**: Eliminates the need for central authorities, ensuring transparency and trust.
- **User-friendly Interface**: Developed with AngularJS to offer a seamless and intuitive voting experience.
- **Tested and Reliable**: Comprehensive test case design and unit testing guarantee robust and error-free performance.

## Technologies Used

- **Solidity**: Smart contract development for secure and efficient voting logic.
- **Ethereum Blockchain**: Distributed ledger technology for secure and transparent voting records.
- **AngularJS**: Front-end framework for building a responsive and dynamic user interface.
- **Test Case Design & Unit Testing**: Ensuring reliability and robustness of the application.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Angular CLI** installed globally:
  ```bash
  npm install -g @angular/cli
  ```
- **Truffle Suite** for compiling and deploying smart contracts:
  ```bash
  npm install -g truffle
  ```
- **MetaMask** browser extension for interacting with the Ethereum network.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Darshee-m/BlockVote.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd BlockVote
   ```

### Smart Contract Deployment

1. **Navigate to the smart contract directory:**
   ```bash
   cd contracts
   ```
2. **Compile the smart contracts:**
   ```bash
   truffle compile
   ```
3. **Deploy the smart contracts to the Ethereum network:**
   ```bash
   truffle migrate --network <network-name>
   ```
   Replace `<network-name>` with the target network (e.g., `development` for local testing).

### Front-end Setup

1. **Navigate to the front-end directory:**
   ```bash
   cd client
   ```
2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Run the Angular development server:**
   ```bash
   ng serve
   ```
4. **Open the application** in your browser at `http://localhost:4200`.

## Usage

1. **Connect MetaMask** to the desired Ethereum network.
2. **Register as a voter** through the application interface.
3. **Cast your vote** in a secure and transparent manner.
4. **View real-time results** as votes are tallied on the blockchain.

## Testing

1. **Navigate to the test directory:**
   ```bash
   cd test
   ```
2. **Run the test cases:**
   ```bash
   truffle test
   ```
   This will execute the unit tests to ensure the smart contracts are functioning correctly.

## Contributing

We welcome contributions to enhance BlockVote. To contribute:

1. **Fork the repository.**
2. **Create a new branch** with a descriptive name:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit them with clear messages:
   ```bash
   git commit -m "Add detailed description of your changes"
   ```
4. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request** describing your changes in detail.

Thank you for using BlockVote! We hope this DApp transforms the voting process with the security and transparency of Blockchain technology. Happy voting!
