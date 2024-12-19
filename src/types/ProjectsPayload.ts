import { Reward } from "./Reward";

export type ProjectEditPayload = {
    projectId: number;
    description?: string;
    imageURL?: string;
    tags?: string[];
    story?: string; //Maybe our own type for that??
    paymentInfo?: {
        cardNumber?: string;
        paymentMethod?: string;
    };
    rewards?: Reward;
}

export type ProjectCreatePayload = {
    title: string;
    description: string;
    imageURL: string;
    tags?: string[];
    category: string;
    story: string; //Maybe our own type for that??
    fundingGoal: number;
    deadline: string;
    paymentInfo: {
        cardNumber: string;
        paymentMethod: string;
    };
    rewards?: Reward;
}