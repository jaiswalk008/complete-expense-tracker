
# Complete Expense Tracker

The Complete Expense Tracker is a full-fledged web application that allows users to efficiently track their expenses, manage budgets, and gain insights into their spending habits. This repository contains the source code for the Expense Tracker, along with the necessary documentation to get started.

## Installation

Follow these steps to set up the Expense Tracker locally:

1. Clone the repository:
```bash
git clone https://github.com/jaiswalk008/complete-expense-tracker.git
```
2. Change into the project directory:
```bash
cd complete-expense-tracker
```
3. Install the required dependencies:
```bash
cd client
npm install
cd server
npm install
```
4. npm start

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
In server: 
### Razorpay keys
`key_id`

`key_secret`

### brevo (formerly sendinblue)
`EMAIL_API_KEY`

### AWS keys
`IAM_USER_ACCESS_KEY`

`IAM_USER_SECRET_ACCESS_KEY`

### some other keys
`JWT_SECRET_KEY`

`MONGODB_SRV`
## Tech Stack

**Client:** React,Redux-toolkit,bootstrap

**Server:** Node, Express, Redis


**Database:** NoSQL, Mongoose
