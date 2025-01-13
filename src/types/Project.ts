import { Reward } from "./Reward";

export type Project = {
    projectId?: number;
    title: string;
    description: string;
    imageUrl: string;
    tags?: string[];
    category: string;
    fundingGoal: number;
    fundsRaised?: number;
    views?: number;
    backers?: number;
    deadline: string;
    story: string;
    rewards?: Reward[];
    paymentInfo: {
      cardNumber: string;
      paymentMethod: string;
  };
  };