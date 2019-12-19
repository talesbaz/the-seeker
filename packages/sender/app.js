const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: ['localhost:9092', 'localhost:9093'],
  clientId: 'seeker-consumer'
});

const topic = 'ISSUE_SONG';
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {

  await consumer.connect();
  await consumer.subscribe({ topic, 'fromBeginning': true });
  await consumer.run({

    eachMessage: async ({ topic, partition, message }) => {

      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
    }
  });
};

run().catch(e => console.error(`[example/consumer] ${e.message}`, e));


// Handle Error
const errorTypes = ['unhandledRejection', 'uncaughtException'];
errorTypes.map(type => {
  process.on(type, async e => {

    try {

      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
  return false;
});

// When signal gets trapped
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});
