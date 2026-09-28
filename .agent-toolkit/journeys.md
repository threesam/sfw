# Journeys — skeletonflowersandwater.com

Declared UX journeys for `/drive`. Every step must complete with no console error,
no unexpected same-origin failed request, and the stated expectation present.

**Do not complete a purchase or submit the subscribe form.** Checkout hits live
Stripe and the form hits a live mailing list. Journeys stop at the boundary.

## 1. Shop path from the homepage

The regression this file exists for: `/merch` used to 404 while the homepage
linked to it, so the whole browse-the-store path dead-ended.

- go to /
- expect a link with text "all" pointing at /merch
- click "all"
- expect heading "Merch"
- expect at least one product tile linking to /merch/{id}

## 2. Product detail

- go to /merch
- click the first product tile
- expect a product name heading
- expect a price
- expect an "add to cart" control to be present and enabled
- do NOT add to cart

## 3. Films index and detail

- go to /projects
- expect heading "Films"
- expect at least one film linking to /projects/{slug}
- click the first film
- expect the film title as a heading

## 4. Homepage hero renders a readable title

Guards the contrast floor: the banner title is set in the poster's dominant
colour, which is unbounded content data.

- go to /
- expect an h1 with non-empty text
- expect the h1 computed colour to differ from the page background

## 5. Subscribe form is present and reachable

- go to /
- expect an email input inside #subscribe or the newsletter section
- expect a submit control that is enabled
- do NOT submit

## 6. Cart (LOCAL ONLY, Stripe TEST keys)

Run only against a local server whose `.env` has a `sk_test_` key. Never against
prod or a preview. Stops at the Stripe redirect; no payment is ever entered.

- go to /merch, open the first product that has more than one size
- expect a size group whose buttons expose aria-pressed; select the second size
- click "add to cart"
- expect the cart dialog open with focus inside it
- click "add one" → expect quantity 2 and subtotal = 2 × unit price
- expect the header cart button to be named "cart, 2 items"
- click "remove one" → expect quantity 1
- press Escape → expect the dialog gone and focus back on "add to cart"
- reopen the cart, click "checkout" → expect POST /checkout/payment-intent 200 and a
  navigation to checkout.stripe.com/c/pay/cs_test_… (abort it there)
- go to /merch (the cart is not persisted) and open the cart → expect "Your cart is empty."

## Notes

- `/merch` and `/merch/[id]` are server-rendered (Printful data).
- `/api/subscribe` and the checkout endpoints are the only write paths; journeys
  never exercise them.
