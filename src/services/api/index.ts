import { ISubscriptionBody } from "types/ISubscriptionBody";

// this could be an env var
const baseUrl = "https://private-0ced4-pebmeddesafiofrontend.apiary-mock.com";

async function fetchPlans() {
  const response = await fetch(`${baseUrl}/offer`);

  if (!response.ok) {
    throw new Error("api @ fetchPlans >>>>> response not ok");
  }

  return response.json();
}

async function sendSubscription(data: ISubscriptionBody) {
  const response = await fetch(`${baseUrl}/subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("api @ sendSubscription >>>>> response not ok");
  }

  return response.json();
}

export { baseUrl, fetchPlans, sendSubscription };
