# The seeker
The exercise is to build two services. Which are the responsabilities:
- Seeker: Search for a song based on a query string
    - Once it find at least one register, dispatch a event to kafka topic
- Sender: Read from kafka topic and notify the user

# How to run
You'll need to kafka and zookeeper running, so:
```sh
npm run start:kafka
```
For monitoring you can use Conduktor GUI.

# TO DO
 - Create the consumer
 - Refac the producer
 - Evaluate the fastify-kafka plugin
