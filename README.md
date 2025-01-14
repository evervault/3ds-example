# Evervault 3D-Secure Example

This is an example of how to use Evervault's 3D-Secure (3DS) API. It contains a simple form that allows you to create a 3DS session and mount the 3DS UI. The backend is implemented in Vercel's Edge Functions. All 3DS response data received by the backend is logged in the browser console for demo purposes.

![CleanShot 2025-01-14 at 18 02 55@2x](https://github.com/user-attachments/assets/df209729-4366-490b-8a1c-b832fbc0da33)

## Prerequisites

- [Evervault Account](https://app.evervault.com)
- [Evervault API Key](https://app.evervault.com/settings/api)
- Install [Vercel CLI](https://vercel.com/docs/cli)

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/evervault/3ds-example.git
```

2. **Install dependencies with `pnpm install`**

> [!IMPORTANT]  
> Make sure to use `pnpm` instead of `npm` or `yarn` as this project uses `pnpm` workspaces.

3. **Create a `.env` file with the following variables:**

> [!IMPORTANT]  
> Make sure the API key has permissions to create 3DS sessions.

```
EVERVAULT_API_KEY=
VITE_EVERVAULT_APP_ID=
VITE_EVERVAULT_TEAM_ID=
```

4. **Run the application using `vercel dev`**

> [!NOTE]  
> Using the `vercel dev` command is required to enable the API routes.
