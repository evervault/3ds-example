const appId = process.env.VITE_EVERVAULT_APP_ID;
const apiKey = process.env.EVERVAULT_API_KEY;

export async function POST(request: Request) {
  const { number, expiry, brand } = await request.json();

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
      "amount": 19999,
      "currency": "usd"
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
  
  return threeDSSession;
}