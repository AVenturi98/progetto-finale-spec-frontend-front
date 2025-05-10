export type Travel = {
    id: number,
    title: string,
    category: string,
    image?: string,
    start: string,
    price: number,
    duration: number,
    direct: boolean,
    scale?: number,
    available: boolean
}