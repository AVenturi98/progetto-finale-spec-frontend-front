export type Base = {
    id: number,
    title: string,
    category: string,
    start: string
}

export type Travel = Base & {
    image?: string,
    price: number,
    duration: number,
    direct: boolean,
    scale?: number,
    available: boolean
}
