import { convertToPascalCase, convertToCamelCase } from "../utils/caseConverters";

const API_BASE = "https://localhost:7225/api";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorResponse = await response.text();
    throw new Error(errorResponse);
  }
  const data = await response.json();
  return convertToCamelCase(data);
};

export const updateSurnameApi = async (userId: number, surname: string) => {
  const payload = convertToPascalCase({ id: userId, surname });
  const response = await fetch(`${API_BASE}/users/update-surname`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const updateAddressApi = async (userId: number, address: string) => {
  const payload = convertToPascalCase({ id: userId, address });
  const response = await fetch(`${API_BASE}/users/update-address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const updatePaymentApi = async (userId: number, paymentMethod: string) => {
  const payload = convertToPascalCase({ id: userId, paymentMethod });
  const response = await fetch(`${API_BASE}/users/update-payment-method`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const updatePaymentInfoApi = async (userId: number, paymentInfo: string) => {
  const payload = convertToPascalCase({ id: userId, paymentInfo });
  const response = await fetch(`${API_BASE}/users/update-payment-info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const fetchAdvancedInfo = async (userId: number): Promise<any> => {
  const payload = convertToPascalCase({ id: userId });
  const response = await fetch(`${API_BASE}/users/advanced-info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const updateNameApi = async (userId: number, name: string): Promise<any> => {
  const payload = convertToPascalCase({ id: userId, name });
  const response = await fetch(`${API_BASE}/users/update-name`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};
