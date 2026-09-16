const DRIP_API_BASE_URL = "https://api.getdrip.com/v2";

function required(value, name) {
  if (!value) {
    throw new Error(`Missing required value: ${name}`);
  }

  return value;
}

function createBasicAuthHeader(apiToken) {
  return `Basic ${Buffer.from(`${apiToken}:`).toString("base64")}`;
}

export function createProofPayload(subscriberId, now = new Date()) {
  required(subscriberId, "subscriberId");

  return {
    subscribers: [
      {
        id: subscriberId,
        custom_fields: {
          council_interest: "sidecar",
          sidecar_custom_variable_test: "sidecar test value",
          ab_sidecar_test_updated_at: now.toISOString()
        },
        tags: ["AU_PROCESS_SS_ONBOARDING", "sidecar-test-tag"],
        remove_tags: ["Welcome popup"]
      }
    ]
  };
}

export async function updateDripSubscriber({
  apiToken,
  accountId,
  subscriberId,
  customFields,
  tags,
  removeTags
}) {
  required(apiToken, "apiToken");
  required(accountId, "accountId");
  required(subscriberId, "subscriberId");

  const payload = {
    subscribers: [
      {
        id: subscriberId,
        ...(customFields ? { custom_fields: customFields } : {}),
        ...(tags ? { tags } : {}),
        ...(removeTags ? { remove_tags: removeTags } : {})
      }
    ]
  };

  const response = await fetch(`${DRIP_API_BASE_URL}/${accountId}/subscribers`, {
    method: "POST",
    headers: {
      authorization: createBasicAuthHeader(apiToken),
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const responseText = await response.text();
  let responseBody = null;

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }
  }

  if (!response.ok) {
    const error = new Error(`Drip API update failed with HTTP ${response.status}`);
    error.status = response.status;
    error.responseBody = responseBody;
    throw error;
  }

  return {
    status: response.status,
    body: responseBody
  };
}

export async function pushProofUpdate({
  apiToken,
  accountId,
  subscriberId,
  now = new Date()
}) {
  const proofPayload = createProofPayload(subscriberId, now);
  const proofSubscriber = proofPayload.subscribers[0];

  return updateDripSubscriber({
    apiToken,
    accountId,
    subscriberId: proofSubscriber.id,
    customFields: proofSubscriber.custom_fields,
    tags: proofSubscriber.tags,
    removeTags: proofSubscriber.remove_tags
  });
}
