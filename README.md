# README

This project requires [Node.js](https://nodejs.org/en/).
Installation instructions are provided in the given link.

## Setup
Clone the repository.
```sh
git clone https://github.com/LeviMWilliamson/SENG480C_A1.git
```

Upload the sketch provided in the `arduino/` folder to your Uno board.

Next, navigate to the project directory.
```sh
cd SENG480C_A1
```
Install dependencies.
```
npm i
```

## Run
Set required environment variables:
```sh
export PORT=8080
export WEBSOCKET_PORT=5000
export SERIAL_PORT=9600
export SERIAL_FILE='/dev/ttyACM0'
```
Start the server.
```sh
npm start
```
