const { Kafka } = require('kafkajs');

const fastify = require('fastify')({
  logger: true
});

const kafka = new Kafka({
  clientId: 'seeker',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

fastify.get('/', async () => {

  await producer.connect();
  await producer.send({
    topic: 'ISSUE_SONG',
    messages: [
      { key: 'key1', value: 'Hello KafkaJS user!' }
    ]
  });
  await producer.disconnect();

  return { 'hello': 'world' };
});

const start = async () => {

  try {
    await fastify.listen(3000);
  } catch (err) {

    fastify.log.error(err);
    process.exit(1);
  }
};

start();
