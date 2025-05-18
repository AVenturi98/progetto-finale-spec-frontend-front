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

export type Props<T> = {
    URL_fetch: string,
    set: React.Dispatch<React.SetStateAction<T[] | null>>,
    id?: number | null
};

export type ResponseData = {
    URL_fetch: string,
    set: React.Dispatch<React.SetStateAction<Travel | Food | null>>,
    id?: number | null
};

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
    recordCompare: Travel | Food | null,
    setRecordCompare: React.Dispatch<React.SetStateAction<Travel | Food | null>>,
    // --get ID item compare--
    getIDCompare: number | null,
    setGetIDCompare: React.Dispatch<React.SetStateAction<number | null>>,
    // --get ID item compare food--
    getIDCompareFoods: number | null,
    setGetIDCompareFoods: React.Dispatch<React.SetStateAction<number | null>>,

    // Comparison settings compare Second
    // --open modal compare second--
    openCompareSecond: boolean,
    setOpenCompareSecond: React.Dispatch<React.SetStateAction<boolean>>,
    // --item compare second--
    recordCompareSecond: Travel | Food | null,
    setRecordCompareSecond: React.Dispatch<React.SetStateAction<Travel | Food | null>>,
    // --get ID item compare second--
    getIDCompareSecond: number | null,
    setGetIDCompareSecond: React.Dispatch<React.SetStateAction<number | null>>,
    // --get ID item compare second food--
    getIDCompareSecondFoods: number | null,
    setGetIDCompareSecondFoods: React.Dispatch<React.SetStateAction<number | null>>,

    // Comparison settings compare Thirty
    // --open modal compare thirty--
    openCompareThirty: boolean,
    setOpenCompareThirty: React.Dispatch<React.SetStateAction<boolean>>,
    // --item compare thirty--
    recordCompareThirty: Travel | Food | null,
    setRecordCompareThirty: React.Dispatch<React.SetStateAction<Travel | Food | null>>,
    // --get ID item compare thirty--
    getIDCompareThirty: number | null,
    setGetIDCompareThirty: React.Dispatch<React.SetStateAction<number | null>>,
    // --get ID item compare thirty food--
    getIDCompareThirtyFoods: number | null,
    setGetIDCompareThirtyFoods: React.Dispatch<React.SetStateAction<number | null>>,

    // Travels / Filtered travels
    travels: Travel[] | Food[] | null,
    filteredTravels: Travel[] | null,
    setFilteredTravels: React.Dispatch<React.SetStateAction<Travel[] | null>>,

    // Adding favorites item
    addFavorites: (favorite: Travel | Food) => void,
    favorites: Travel[] | Food[] | null,

    category: "travels" | "foods" | null,
    setFilteredFoods: React.Dispatch<React.SetStateAction<Food[] | null>>
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

export type BtnSwitch = {
    category: "travels" | "foods" | null,
    setCategory: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>,
    categories: string[],
    selectedBtn: "travels" | "foods" | null,
    setSelectedBtn: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>
}

export type Favorites = {
    favorites: Travel[] | Food[] | null,
    setFavorites: React.Dispatch<React.SetStateAction<Travel[] | null>>,
    favoritesModal: boolean,
    setFavoritesModal: React.Dispatch<React.SetStateAction<boolean>>,
    filteredFavorites: Base[] | null,
    setFilteredFavorites: React.Dispatch<React.SetStateAction<Travel[] | Food[] | null>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>,
    setGetIDFoods: React.Dispatch<React.SetStateAction<number | null>>, // get id foods
    timing: () => void,
    setAddRemoved: React.Dispatch<React.SetStateAction<"Rimosso" | "Aggiunto">>,
    category: "travels" | "foods" | null,
    setCategory: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>,
    setFavoritesFoods: React.Dispatch<React.SetStateAction<Food[] | null>>,
    categories: string[],
    selectedBtn: "travels" | "foods" | null,
    setSelectedBtn: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>,
    setFilteredFoods: React.Dispatch<React.SetStateAction<Food[] | null>>
}

export type FoodShow = {
    item: Food | null,
    exists: boolean | undefined,
    activeComparison: boolean,
    comparison: () => void,
    adding: (data: Food) => void
}

export type TravelShow = {
    item: Travel | null,
    exists: boolean | undefined,
    activeComparison: boolean,
    comparison: () => void,
    adding: (data: Travel | Food) => void
}