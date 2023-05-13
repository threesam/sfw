import { env } from '$env/dynamic/private'
import Stripe from "stripe";

type CustomerDetails = {
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string | null;
    postal_code: string;
    state: string;
  };
  email: string;
  name: string;
  phone: string | null;
  tax_exempt: string;
  tax_ids: string[];
};

type LineItem = {
  id: string;
  object: "price";
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: string | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: any;
  nickname: string | null;
  product: string;
  recurring: null;
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
  quantity: number;
};

export async function POST({request}) {
  // @ts-expect-error it is what it is
  const stripe = new Stripe(env.STRIPE_TEST_SECRET_KEY);

  // get stripe signature
  const signature = request.headers.get("Stripe-Signature") ?? "";

  // validate that the webhook originated from Stripe
  const { data } = await stripe.webhooks.constructEventAsync(
    await request.text(), // raw request body
    signature, // signature header
    env.STRIPE_WEBHOOK_SECRET
  );

  // set customer info
  const customer = data?.object?.customer_details as CustomerDetails;

  // get checkout line items
  const { data: lineItems } = await stripe.checkout.sessions.listLineItems(
    id: data?.object?.id
  );

  // get price for each line item, include quantity
  const items = (await Promise.all(
    lineItems.map(
      (item) =>
        item.price?.id &&
        stripe.prices.retrieve(item.price?.id).then((result) => {
          return {
            ...result,
            quantity: item.quantity,
          };
        })
    )
  )) as LineItem[];

  // pass line items and customer details to printful order api
  const printfulOrderRes = await fetch("https://api.printful.com/orders", {
    headers: {
      Authorization: "Bearer " + env.PRINTFUL_PRIVATE_ACCESS_KEY,
    },
    method: "POST",
    body: JSON.stringify({
      recipient: {
        name: customer.name,
        address1: customer.address.line1,
        city: customer.address.city,
        state_code: customer.address.state,
        country_code: customer.address.country,
        zip: customer.address.postal_code,
      },
      items: items.map((item) => ({
        external_variant_id: item.product.split("_").pop(),
        quantity: item.quantity,
      })),
    }),
  });

  // get result of order request
  const { result } = await printfulOrderRes.json();

  console.log({ data, result, customer, items });

  return new Response("ok");
}
