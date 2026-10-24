import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
  LISTMONK_URL: { schema: (input) => input ?? '' },
  LISTMONK_LIST_UUID: { schema: (input) => input ?? '' },
  PRINTFUL_API_ENDPOINT: { schema: (input) => input ?? '' },
  PRINTFUL_PRIVATE_ACCESS_KEY: { schema: (input) => input ?? '' },
  PRINTFUL_STORE_ID: { schema: (input) => input ?? '' },
  SENDGRID_API_KEY: { schema: (input) => input ?? '' },
  SENDGRID_VERIFIED_SENDER: { schema: (input) => input ?? '' },
  STRIPE_SECRET_KEY: { static: true },
  PUBLIC_SANITY_PROJECT_ID: { public: true, schema: (input) => input ?? '' },
  PUBLIC_SANITY_DATASET: { public: true, schema: (input) => input ?? '' },
  SANITY_TOKEN: { schema: (input) => input ?? '' }
})
