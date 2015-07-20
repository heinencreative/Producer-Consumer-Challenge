# Producer/Consumer System Challenge

The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

## Requirements

At a minimum, we would like to see the following implemented:

* The Producer and Consumer as separate NodeJS services.
* The Producer generating random addition expressions of two positive integers, e.g. "2+3="
* The Consumer computing and returning the correct mathematical result for the each expression it receives
* The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
* The Consumer and Producer should log all messages they generate and receive.
* You are free to support more than simple addition, but it is not required.

The end product should:

* Be built in strict JavaScript and run with NodeJS
* NOT rely on any external services like Redis, ZeroMQ or similar technologies
* NOT use Express (Connect is Ok)
* Include UML Activity Diagram and UML Sequence Diagram documenting the business logic
* Include Unit tests

----

## UML Diagrams

### Activty Diagram

![UML Activity Diagram](https://github.com/heinencreative/producer-consumer-challenge/raw/master/assets/images/producer_consumer_activity_diagram.png "UML Activity Diagram")

### Sequence Diagram

![UML Sequence Diagram](https://github.com/heinencreative/producer-consumer-challenge/raw/master/assets/images/producer_consumer_sequence.png "UML Sequence Diagram")

----

## Installation

1. `$ git clone git@github.com:heinencreative/producer-consumer-challenge.git && cd producer-consumer-challenge`
2. `$ npm install`

## Running the Challenge

Once installed, you must start each NodeJS service in a separate terminal window. Execute the following in this order:

1. `$ npm start`
2. `$ npm run producer`
3. `$ npm run producer`

### Bonus

The NodeJS services above also accept arguments. Intead of using the NPM build described in the Execute Challenge section, you can execute them manually.

#### server.js

`$ node server --port=1337`

* **--port** Set port number (Integer)

#### producer.js

`$ node producer.js --port=1337 --integer=false --lowerLimit=900 --upperLimit=1000 --requestDelay=250`

* **--port** Set port number (Integer)
* **--integer** Force numbers in expression to be integers (Boolean)
* **--lowerLimit** Set lower limit of random numbers (Integer)
* **--upperLimit** Set upper limit of random numbers (Integer)
* **--requestDelay** Adjust milisecond delay between requests (Integer)

----

## Testing

Unit testing is accomplished using Mocha, Chai and Sinon. To run tests simply execute:

`$ npm test`

----

## License

This challenge is released under the [MIT License](http://www.opensource.org/licenses/MIT).
