# The seeker
The challenge is build two services, which are the responsabilities:
- Seeker: Search for a song based on a query string
    - Once it find at least one register, dispatch a event to kafka topic
- Sender: Read from kafka topic and notify the user
