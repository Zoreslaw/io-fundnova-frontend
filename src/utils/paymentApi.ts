export const processPaymentApi = async ({
    paymentMethod,
    paymentInfo,
    pledgeAmount,
    rewardId,
    userId,
    projectId,
  }: {
    paymentMethod: string | null;
    paymentInfo: string | null;
    pledgeAmount: number | null;
    rewardId: number | null;
    userId: string | null; // Add user ID from context
    projectId: string | null; // Add project ID from context
  }): Promise<void> => {
    const endpoint = "https://localhost:7225/api/transactions/make";
  
    // Prepare the payload
    const payload: Record<string, any> = {
      UserId: userId,
      ProjectId: projectId,
    };
  
    if (rewardId) {
      payload.RewardId = rewardId.toString();
    } else if (pledgeAmount) {
      payload.Amount = pledgeAmount.toString();
    } else {
      throw new Error("Either RewardId or Amount must be provided.");
    }
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Replace with actual token logic
        },
        body: JSON.stringify(payload),
      });
  
      if (response.status === 403) {
        const errorData = await response.json();
        throw new Error(errorData.Error || "Unauthorized Access.");
      }
  
      if (!response.ok) {
        throw new Error(`Unexpected Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      throw error;
    }
  };
  