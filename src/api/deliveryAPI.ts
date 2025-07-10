export type Step = {
  address: string;
  action: "pickup" | "dropoff" | null;
};

export type ErrorResponse = {
  status: "error";
  error_code: string;
  error_message: string;
};

export type SuccessResponse = {
  status: "success";
  steps: Step[];
};

export function deliveryCheck(
  deliveries: [string, string][],
  path: string[]
): string {

  if ((deliveries.length == 0) || (path.length == 0)) {
    const error: ErrorResponse = {
      status: "error",
      error_code: "input_null",
      error_message: `The deliveries or the path is not set. Please check your inputs.`
    };
    return JSON.stringify(error);
  }
    
  
  // Used to keep track of pickup and dropoff addresses
  const pickupSet = new Set<string>();
  const dropoffSet = new Set<string>();
  const pickupToDropoff = new Map<string, string>();
  const dropoffToPickup = new Map<string, string>();

  for (const [pickup, dropoff] of deliveries) {
    pickupSet.add(pickup);
    dropoffSet.add(dropoff);
    pickupToDropoff.set(pickup, dropoff);
    dropoffToPickup.set(dropoff, pickup);
  }

  // Checking if there are any missing addresses in the path
  const pathSet = new Set(path);
  const missingAddresses = Array.from(new Set([...pickupSet, ...dropoffSet]))
    .filter(addr => !pathSet.has(addr));

  if (missingAddresses.length > 0) {
    const error: ErrorResponse = {
      status: "error",
      error_code: "delivery_address_not_in_path",
      error_message: `The following delivery addresses are missing from the path: ${JSON.stringify(missingAddresses.sort())}`
    };
    return JSON.stringify(error);
  }

  const pickedUp = new Set<string>();
  const dropoffs = new Set<string>();
  const steps: Step[] = [];

  for (const addr of path) {
    // Case 1: addr is a pickup address
    if (pickupSet.has(addr)) {
      pickedUp.add(addr);
      steps.push({ address: addr, action: "pickup" });
      continue;
    }

    // Case 2: addr is a dropoff address
    if (dropoffSet.has(addr)) {
      // Need to check if pick up happened
      const pickupAddr = dropoffToPickup.get(addr)!;
      if (!pickedUp.has(pickupAddr)) {
        const error: ErrorResponse = {
          status: "error",
          error_code: "delivery_dropoff_before_pickup",
          error_message: `Dropoff at address ${addr} occurred before its pickup at address ${pickupAddr}`
        };
        return JSON.stringify(error);
      }
      dropoffs.add(addr);
      steps.push({ address: addr, action: "dropoff" });
      continue;
    }

    // Case 3: addr is not a dropoff nor a pickup address
    steps.push({ address: addr, action: null });
  }

  const success: SuccessResponse = {
    status: "success",
    steps: steps
  };
  return JSON.stringify(success, null, 2);
}
