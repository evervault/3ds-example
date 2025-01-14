const appId = process.env.VITE_EVERVAULT_APP_ID;
const apiKey = process.env.EVERVAULT_API_KEY;

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("sessionId");
  const threeDSSession = await fetch(`https://api.evervault.com/payments/3ds-sessions/${sessionId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${btoa(appId + ':' + apiKey)}`,
    }
  });

  return threeDSSession;
}