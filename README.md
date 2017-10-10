# MyExplorer

A JavaScript project with the stack Mongo, Meteor and React.
Have a first glance here: https://www.youtube.com/watch?v=t7cu9TOkMrM

# Installation

1. Install meteor: `curl https://install.meteor.com/ | sh`
1. Clone the repo: `git clone https://github.com/PeterMerkert/MyExplorer.git`
1. Install the project: `meteor npm install`
1. Start the project: `meteor run`
1. Visit `http://localhost:3000`

# Features

* Add users with BTC and ETH volume
* Add transactions for users
* View history transactions
* Filter transactions for users
* Admin functions like for clearing database from the web
* Transaction processor
  * Process transactions in order
  * Full transaction validation
  * Transaction committing and logging
* REACTive update of website with Meteor