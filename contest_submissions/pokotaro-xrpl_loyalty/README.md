# XRPL LOYALTY

An Employee Reward Management System Powered by XRP Ledger 🎯

## Project Overview 📖

XRPL LOYALTY is an innovative system that manages employee IDs on the blockchain using XRP Ledger's **URIToken**.
By tokenizing employee IDs as NFTs, we achieve tamper-proof verification and real-time employment status confirmation, streamlining corporate HR management.

By setting the URIToken purchase price to 0 XRP, we enable its pure use as an employee ID, enhancing its practicality as a corporate HR management system.
This system pioneers blockchain adoption in the enterprise market and materializes XRP Ledger's business use cases.

### Key Features

- **Blockchain-based Employee ID Management** 🔐
  - Unique employee ID issuance using URIToken
  - Tamper-proof record of employment information
  - Real-time employment status verification

- **High Compatibility with Hooks** 🔄
  - Employee onboarding and offboarding processing
  - Employee ID issuance and invalidation
  - Permanent transaction history retention
  - XRP staking-based retirement benefit system (planned)

- **Dynamic URIToken Management** 🎨
  - Flexible attribute information manipulation through direct API server integration
  - Infinite variations through dynamic SVG image generation
  - Highly scalable design independent of StorageServer

### Future Development Plans 🚀

- **XRP Staking System** 💰
  - Companies can stake XRP against URITokens
  - Staking amounts can be set based on years of service and contributions
  - Automatic operation through smart contracts

- **Automatic Retirement Payment System** 💸
  - Automatic payment of staked XRP as retirement benefits upon URIToken burn
  - Transparent retirement benefit management
  - Secure fund management through smart contracts

## Usage 🚀

The system provides two interfaces: one for employees and one for company administrators:

1. Employee Screen (`/employee`)
   - Display employee ID and QR code
   - Claim employee ID
   - Invalidate employee ID

2. Company Management Screen (`/company`)
   - Issue and invalidate employee IDs
   - Manage employee information
   - Manage system settings

### Usage Scenarios

1. Employee ID Issuance and Acquisition
   - Company: Issue employee ID for new hire
   - Employee: Claim issued employee ID
   - Employee: Query employee ID via QR code (Scanning the QR code accesses the URIToken page on Xahau Explorer to verify employee ID information on the blockchain)

2. Employee ID Invalidation
   - Employee: Invalidate own employee ID upon resignation
   - Company: Invalidate employee ID as needed

> Note: The current version is a Proof of Concept, allowing operation verification with Alice account and company account.

## Setup Instructions 🚀

### 1. Environment Setup

First, start the Docker container and prepare the necessary environment:

```bash
# Start Docker container
docker compose up -d

# Initialize database
yarn db:init
```

### 2. Launch Frontend

Start the frontend development server:

```bash
# Start frontend development server
yarn dev:fe
```

### 3. Access Method

After starting the frontend development server, access the following URLs:

- Employee Screen: `http://localhost:3000/employee`
- Company Management Screen: `http://localhost:3000/company`

> Note: In the development environment, operation verification is possible with Alice account and company account.

## License

MIT
