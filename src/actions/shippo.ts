"use server";

import Shippo from "shippo";

// const shippo = new Shippo(process.env.SHIPPO_TEST_TOKEN as string);
const shippo = new Shippo(
  "shippo_live_916841fcfc760e0ffd1984fce371cd59ab08bf54"
);

type AddressMin = {
  name: string;
  street1: string;
  state: string;
  city: string;
  zip: string;
  country: string;
};

export async function createAddress(address: AddressMin) {
  console.log(address.name, " trying to get address");
  try {
    const addressFrom = await shippo.address.create({
      ...address,
      validate: true,
    });
    return addressFrom.validation_results;
  } catch (err) {
    console.log(err);
    return { message: "🦛🦛🦛🔥🔥🔥" };
  }
}
