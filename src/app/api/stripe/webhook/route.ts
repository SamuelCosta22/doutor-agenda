import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key not found");
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature not found");
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice & {
        subscription?: string;
      };

      const subscriptionId = (invoice.subscription ??
        invoice.parent?.subscription_details?.subscription) as string;

      if (!subscriptionId) {
        throw new Error("Subscription ID not found");
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      if (!subscription.metadata.userId) {
        throw new Error("User ID not found in subscription metadata");
      }

      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: subscriptionId,
          stripeCustomerId: invoice.customer as string,
          plan: "essential",
        })
        .where(eq(usersTable.id, subscription.metadata.userId));

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      const userId = subscription.metadata.userId;
      if (!userId) {
        throw new Error("User ID not found in subscription metadata");
      }

      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));

      break;
    }
  }

  return NextResponse.json({
    received: true,
  });
};
