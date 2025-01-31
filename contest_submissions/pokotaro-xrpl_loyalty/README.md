# XRPL LOYALTY

An Employee Reward Management System Powered by XRP Ledger 🎯

## Project Overview 📖

XRPL LOYALTY is an innovative system that manages employee ID cards on the blockchain using XRP Ledger's **URIToken**. 
By converting employee ID cards into NFTs, we achieve tamper-proof verification and real-time employment status confirmation, streamlining corporate HR management.

By setting the URIToken purchase price to 0 XRP, we enable its use as a pure employee ID card system, enhancing its practicality for corporate HR management.
This system has the potential to pioneer blockchain adoption in the enterprise market, exemplifying XRP Ledger's business use cases.

### Key Features

- **Blockchain-Based ID Card Management** 🔐
  - Unique employee ID card issuance using URIToken
  - Tamper-proof record of employment information
  - Real-time employment status verification

- **High Compatibility with Hooks** 🔄
  - Employee onboarding and offboarding processes
  - ID card issuance and invalidation
  - Permanent transaction history retention

- **Dynamic URIToken Management** 🎨
  - Flexible attribute information management through direct API server integration
  - Infinite variations through dynamic SVG image generation
  - Highly extensible design without Storage Server dependency

## Usage Guide 🚀

The system provides two interfaces for employees and company administrators:

1. Employee Portal (`/employee`)
   - View ID card and QR code
   - Claim ID card
   - Invalidate ID card

2. Company Admin Portal (`/company`)
   - Issue and invalidate ID cards
   - Manage employee information
   - System settings management

### Usage Scenarios

1. ID Card Issuance and Acquisition
   - Company: Issue ID card for new employees
   - Employee: Claim issued ID card
   - Employee: View ID card via QR code (Scanning the QR code provides access to the URIToken page on Xahau Explorer, enabling verification of ID card information on the blockchain)

2. ID Card Invalidation
   - Employee: Self-invalidate ID card upon resignation
   - Company: Invalidate ID card as needed

> Note: Current version is a Proof of Concept, configured for testing with Alice account and company account.

## Xahau Hooks Integration 🔗

Our project utilizes Xahau Hooks in the following ways:

### URIToken Management

- **ID Card Issuance** 🎫
  - Embedding employee information as metadata
  - Instant verification via QR code
  - Dynamic attribute information configuration

- **ID Card Invalidation** 🔒
  - Token burn processing
  - Permanent history retention

- **ID Card Update** 🔄
  - Metadata updates
  - History recording
  - SVG image regeneration

## License

MIT
