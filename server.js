const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Twilio setup for alerts
const TWILIO_SID = 'YOUR_TWILIO_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';
const TWILIO_PHONE_NUMBER = 'YOUR_TWILIO_PHONE_NUMBER';
const client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

// Emergency alert route
app.post('/api/emergency', (req, res) => {
  const { phoneNumber, location, severity, images } = req.body;
  const messageBody = `Emergency Alert from ${phoneNumber}. Severity: ${severity}. Location: ${location}. Images captured.`;

  client.messages.create({
    body: messageBody,
    from: TWILIO_PHONE_NUMBER,
    to: '+1234567890' // Admin's number
  })
    .then(() => res.status(200).send('Emergency alert sent successfully'))
    .catch(err => res.status(500).send(err.message));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
