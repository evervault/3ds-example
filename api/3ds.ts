const appId = process.env.EV_APP_ID;
const apiKey = process.env.EV_API_KEY;

export async function POST(request: Request) {
  console.log(appId, apiKey);
  const { number, expiry, brand } = await request.json();

  console.log(number, expiry, brand);

  const threeDSPayload = {
    "merchant": {
      "name": "Everair",
      "website": "https://evervault.com",
      "categoryCode": "4511",
      "country": "us"
    },
    "card": {
      number,
      expiry
    },
    "payment": {
      "type": "one-off",
      "amount": 8607,
      "currency": "usd"
    },
    "challenge": {
      "preference": "challenge-mandated"
    }
  };

  const threeDSSession = await fetch("https://api.evervault.com/payments/3ds-sessions", {
    method: 'POST',
    body: JSON.stringify(threeDSPayload),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(appId + ':' + apiKey)}`,
    }
  });

  console.log(threeDSSession);
  return threeDSSession;
}