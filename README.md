# Welcome to EasyRide 👋

This is an [Expo](https://expo.dev) ride booking mobile application, that allows users to select different drivers and book them for a ride anywhere!

![EasyRide](/assets/images/thumbnail.png)

## Features

-   [x] Easy authentication for users, including Google sign-in.
-   [x] A wonderful UI with a map and map markers for indicating rides.
-   [x] Location based ride suggestions
-   [x] Preferred driver selection and booking
-   [x] Autocomplete location searchbar
-   [x] Distance and price calculation
-   [x] Seemless payment with Stripe
-   [x] User information update feature
-   [x] Multi-step onboarding screen

## Get started

Follow these steps to set up the project locally on your machine.

Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/thecybermaniac/easyride.git
cd easyride
```

**Installation**

```bash
npm install
```

**Setup Environment Variables**

This application was built with multiple third-party services including [Clerk](https://clerk.com) for authentication, [Neon](https://neon.tech) for database, and [Stripe](https://stripe.com) as the payment gateway. To make sure it works properly, you need to get the API keys as specificied below. Then, create a new file named `.env.local` in the root of your project and add them:

```ini
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=p
DATABASE_URL=
EXPO_PUBLIC_SERVER_URL=https://uber.dev/
EXPO_PUBLIC_GEOAPIFY_API_KEY=
EXPO_PUBLIC_GOOGLE_API_KEY=
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
EXPO_PUBLIC_OPENROUTE_KEY=
```

Replace the placeholder values with your actual API credentials.

**Running the Project**

```bash
npx expo start
```

View the application using an emulator or your device with Expo Go.