export const processPaymentApi = async ({
    paymentMethod,
    paymentInfo,
    pledgeAmount,
    rewardId,
  }: {
    paymentMethod: string | null;
    paymentInfo: string | null;
    pledgeAmount: number | null;
    rewardId: number | null;
  }): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success or failure
        const isSuccess = Math.random() > 0.2; // 80% success rate
        isSuccess ? resolve() : reject(new Error("Payment failed"));
      }, 3000); // Simulate server delay
    });
  };