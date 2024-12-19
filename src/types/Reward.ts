export type Reward = {
    rewardId?: number;
    title: string;
    price: number;
    contents: boolean;
    description?: string;
    imageURL?: string | null;
    count?: number;
    deadline?: string;
}