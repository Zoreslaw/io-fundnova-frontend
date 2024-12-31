export type Reward = {
    rewardId?: number;
    title: string;
    price: number;
    contents: boolean | string;
    description?: string;
    imageUrl?: string | null;
    count?: number;
    deadline?: string;
}