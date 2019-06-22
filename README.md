# Webhook Server
This is a  process to run on a application server to receive POST messages from remote GIT repositories (or other webhook-style sources). It can be used as a CI enabling function where commits to a centralized repo will cause the server to pull the updated code and perform a number of other actions as defined by the user.

## Example flow

* User sets up the webhook server (See below)
* User points their github.com repo webhook to post to the configured server
* Once a commit is made to the repo it POSTs to the server and the server runs the defined scripts as a result

## Setup
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

* Clone this repo
* Make a copy of the file [config.json.sample] (config.json.sample) and call it config.json
* Update the contents specifying a port number and at least one webhook defining a server-path and its associated bash script to be executed.

## Authors

* **Brenton O'Callaghan** - *Initial work* - [bocallaghan](https://github.com/bocallaghan)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
