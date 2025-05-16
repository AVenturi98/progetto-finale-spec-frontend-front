export type Base = {
    id: number,
    title: string,
    category: string,
}

export type Travel = Base & {
    start: string,
    image?: string,
    price: number,
    duration: number,
    direct: boolean,
    scale?: number,
    available: boolean
}

export type Food = Base & {
    brand: string,
    price: number,
    available: boolean
}

export type SettingModal = {
    // Modal settings 
    // --open modal--
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    // --item modal--
    record: Travel | Food | null,
    setRecord: React.Dispatch<React.SetStateAction<Travel | Food | null>>,
    // --get ID item modal--
    getIDs: number | null,
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>,

    // --get ID item food--
    getIDFoods: number | null,
    setGetIDFoods: React.Dispatch<React.SetStateAction<number | null>>,

    // Comparison settings compare
    // --open modal compare--
    openCompare: boolean,
    setOpenCompare: React.Dispatch<React.SetStateAction<boolean>>,
    // --item compare--
    recordCompare: Travel | null,
    setRecordCompare: React.Dispatch<React.SetStateAction<Travel | null>>,
    // --get ID item compare--
    getIDCompare: number | null,
    setGetIDCompare: React.Dispatch<React.SetStateAction<number | null>>,

    // Comparison settings compare Second
    // --open modal compare second--
    openCompareSecond: boolean,
    setOpenCompareSecond: React.Dispatch<React.SetStateAction<boolean>>,
    // --item compare second--
    recordCompareSecond: Travel | null,
    setRecordCompareSecond: React.Dispatch<React.SetStateAction<Travel | null>>,
    // --get ID item compare second--
    getIDCompareSecond: number | null,
    setGetIDCompareSecond: React.Dispatch<React.SetStateAction<number | null>>,

    // Comparison settings compare Thirty
    // --open modal compare thirty--
    openCompareThirty: boolean,
    setOpenCompareThirty: React.Dispatch<React.SetStateAction<boolean>>,
    // --item compare thirty--
    recordCompareThirty: Travel | null,
    setRecordCompareThirty: React.Dispatch<React.SetStateAction<Travel | null>>,
    // --get ID item compare thirty--
    getIDCompareThirty: number | null,
    setGetIDCompareThirty: React.Dispatch<React.SetStateAction<number | null>>,

    // Travels / Filtered travels
    travels: Travel[] | Food[] | null,
    filteredTravels: Travel[] | null,
    setFilteredTravels: React.Dispatch<React.SetStateAction<Travel[] | null>>,

    // Adding favorites item
    addFavorites: (favorite: Travel | Food) => void,
    favorites: Travel[] | Food[] | null,

    category: "travels" | "foods" | null
}

export type PopUp = {
    isVisible: boolean,
    popUp: boolean,
    readonly addRemoved: 'Aggiunto' | 'Rimosso'
}

export type Form = {
    setFilteredTravels: (filteredTravels: Travel[] | null) => void,
    travels: (Travel[] | Food[] | null),
    category: "travels" | "foods" | null,
    setFilteredFoods: React.Dispatch<React.SetStateAction<Food[] | null>>
}

export type List = {
    filteredTravels: (Travel[] | Food[] | null),
    travels: (Travel[] | Food[] | null),
    setOpenModal: (isOpen: boolean) => void,
    setGetID: (id: number) => void,
    setGetIDFoods: (id: number) => void,
    gridCols?: string,
    onDelete?: boolean,
    setDeleted?: (items: Travel[] | Food[] | null) => void;
    category: "travels" | "foods" | null
}

export type Modal = {
    isOpen: boolean,
    title: string,
    content?: React.ReactNode,
    onClose: () => void,
    hContent?: string,
    isStatic?: boolean
}

export type Show = {
    item: Travel | Food | null,
    comparison: () => void,
    adding: (data: Travel | Food) => void
    activeComparison: boolean,
    favorites: Travel[] | Food[] | null,
    category: "travels" | "foods" | null
}