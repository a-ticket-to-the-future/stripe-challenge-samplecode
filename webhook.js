// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require('stripe')('sk_test_51OJs18DeAQc450QQx1df7rQv298LhrEKKTiTXXL5pzC5Wx4HjTQvA7dt3BiD74S5GMBco6bmk0yxc3T1nu8fW47600DijjICiS');
const express = require('express');
const app = express();

const PORT = "4242"


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_2eddd5c14c95da096c3071ce3145f58d74e9d7e7870a583ababd3f662788aa04";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(PORT, () => console.log('Running on port 4242'));