"use server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51NGzLXEci2BhCmahOqk0E5cmoGICoF9g1l8oLHNCjM5fW41SB2Y5hpYdQsV6Gw5U3q79HEPwZJFZH7wOzWoNkDil00hB7sy5b5",
  { apiVersion: "2022-11-15" }
);
export async function createAccount() {
  const newAccount = await stripe.accounts.create({
    type: "custom",
    country: "US",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  if (newAccount.email === "noelvegacodes@gmail.com") {
    return false;
  } else {
    await prisma.connectAccount.create({
      data: {
        id: newAccount.id,
        company: "Acidform",
        email: "noelvegacodes@gmail.com",
        phone: "9082681076",
      },
    });
    const accountLink = await stripe.accountLinks.create({
      account: newAccount.id,
      refresh_url: "http://localhost:3000",
      return_url:
        "http://localhost:3000/sandbox/noel/stripeconnect/new-account",
      type: "account_onboarding",
      collect: "eventually_due",
    });
    return accountLink.url;
  }
}

export async function createCheckoutSession() {
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: { allowed_countries: ["US"] },
    payment_method_types: ["card"],
    payment_intent_data: {
      transfer_data: { destination: "acct_1NOqa0Igy3XLDpCk" },
      application_fee_amount: 0.02 * 1000,
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 500,
          product_data: {
            name: "Snickers Icecream",
            images: [
              "https://scene7.samsclub.com/is/image/samsclub/0004767725486_A",
            ],
          },
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/sandbox/noel/stripe/successurl",
    cancel_url: "http://localhost:3000/sandbox/noel/stripe/cancelurl",
  });
  return session.url;
}
