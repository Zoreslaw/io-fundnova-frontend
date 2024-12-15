const API_BASE = "https://localhost:7225/api";


export const updateSurnameApi = async (userId: string, surname: string) => {
  const response = await fetch(`${API_BASE}/Users/update-surname`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, surname }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update surname");
  }

  return response.json();
};

export const updateAddressApi = async (userId: string, address: string) => {
  const response = await fetch(`${API_BASE}/Users/update-address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, address }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update address");
  }

  return response.json();
};

export const updatePaymentApi = async (userId: string, paymentMethod: string) => {
  const response = await fetch(`${API_BASE}/Users/update-payment-method`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, paymentMethod }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update payment method");
  }

  return response.json();
};

export const updatePaymentInfoApi = async (userId: string, paymentInfo: string) => {
  const response = await fetch(`${API_BASE}/Users/update-payment-info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, paymentInfo }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update payment info");
  }

  return response.json();
};

export const fetchAdvancedInfo = async (userId: string): Promise<any> => {
  

  const response = await fetch(`${API_BASE}/Users/advanced-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch advanced info");
  }

  return response.json();
};

export const updateNameApi = async (userId: string, name: string): Promise<any> => {
  const response = await fetch(`${API_BASE}/Users/update-name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, name }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to update name");
  }

  return response.json();
};
