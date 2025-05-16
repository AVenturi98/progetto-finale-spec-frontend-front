// Components
import Show from "./Show";
import Modal from "./Modal";
import Form from "./Form";
import List from "./List";

// Types
import type { Travel, SettingModal, Food } from "../types/types";



export default function SettingModals({
    openModal,
    setOpenModal,
    openCompare,
    setOpenCompare,
    record,
    setRecord,
    setRecordCompare,
    recordCompare,
    openCompareSecond,
    recordCompareSecond,
    setRecordCompareSecond,
    setOpenCompareSecond,
    setOpenCompareThirty,
    filteredTravels,
    setFilteredTravels,
    travels,
    getIDs,
    setGetIDs,
    getIDFoods,
    setGetIDFoods,
    getIDCompare,
    setGetIDCompare,
    getIDCompareFoods,
    setGetIDCompareFoods,
    getIDCompareSecond,
    setGetIDCompareSecond,
    getIDCompareSecondFoods,
    setGetIDCompareSecondFoods,
    addFavorites,
    openCompareThirty,
    recordCompareThirty,
    setRecordCompareThirty,
    getIDCompareThirty,
    setGetIDCompareThirty,
    getIDCompareThirtyFoods,
    setGetIDCompareThirtyFoods,
    favorites,
    category,
    setFilteredFoods
}:
    SettingModal
) {

    // filtered travel / food comparison
    const travelCompare: (Travel | Food)[] | null = travels?.filter(t => {
        return t.id !== getIDs &&
            t.id !== getIDCompare &&
            t.id !== getIDCompareSecond &&
            t.id !== getIDCompareThirty

    }) || null

    const foodCompare: (Travel | Food)[] | null = travels?.filter(t => {
        return t.id !== getIDFoods &&
            t.id !== getIDCompareFoods &&
            t.id !== getIDCompareSecondFoods &&
            t.id !== getIDCompareThirtyFoods
    }) || null

    const conditions = [openModal, openCompare, openCompareSecond, openCompareThirty];


    // Modal config array
    const modalsConfig = [
        {
            isOpen: openModal,
            setIsOpen: setOpenModal,
            record: record,
            setRecord: setRecord,
            getID: getIDs,
            setGetID: setGetIDs,
            getIDFoods: getIDFoods,// get id foods
            setGetIDFoods: setGetIDFoods,// get id foods
            comparison: () => setOpenCompare(true),
            activeComparison: !openCompare,
        },
        {
            isOpen: openCompare,
            setIsOpen: setOpenCompare,
            record: recordCompare,
            setRecord: setRecordCompare,
            getID: getIDCompare,
            setGetID: setGetIDCompare,
            getIDCompareFoods: getIDCompareFoods,// get id foods
            setGetIDCompareFoods: setGetIDCompareFoods,// get id foods
            comparison: () => setOpenCompareSecond(true),
            activeComparison: !openCompareSecond,
        },
        {
            isOpen: openCompareSecond,
            setIsOpen: setOpenCompareSecond,
            record: recordCompareSecond,
            setRecord: setRecordCompareSecond,
            getID: getIDCompareSecond,
            setGetID: setGetIDCompareSecond,
            getIDCompareSecondFoods: getIDCompareSecondFoods,// get id foods
            setGetIDCompareSecondFoods: setGetIDCompareSecondFoods,// get id foods
            comparison: () => setOpenCompareThirty(true),
            activeComparison: !openCompareThirty,
        },
        {
            isOpen: openCompareThirty,
            setIsOpen: setOpenCompareThirty,
            record: recordCompareThirty,
            setRecord: setRecordCompareThirty,
            getID: getIDCompareThirty,
            setGetID: setGetIDCompareThirty,
            getIDCompareThirtyFoods: getIDCompareThirtyFoods,// get id foods
            setGetIDCompareThirtyFoods: setGetIDCompareThirtyFoods,// get id foods
            comparison: () => setOpenModal(true),
            activeComparison: !openModal,
        },
    ];

    console.log('ID', getIDFoods)
    console.log('IDSSSS', getIDCompareFoods)

    return (
        <>
            {
                conditions.filter(Boolean).length >= 2 ? (
                    // Modal doppio
                    <div className="fixed inset-0 bg-[#181818] z-50 flex items-center justify-center">
                        <div className={`grid grid-cols-2 gap-4 p-4`}>
                            {/* OPEN MODAL */}
                            {openModal &&
                                <Modal
                                    isOpen={openModal}
                                    isStatic={true}
                                    title={
                                        category === 'travels' && record ?
                                            `Viaggio a ${record?.title}` :
                                            !record && category === 'travels' ? 'Confronta viaggi' :
                                                category !== 'travels' && record ?
                                                    `Food & Beverage` : 'Confronta alimenti'}
                                    onClose={() => {
                                        setOpenModal(false);
                                        setRecord(null);
                                        if (category === 'travels') {
                                            setGetIDs(null)
                                        } else setGetIDFoods(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        record === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels}
                                                    category={category}
                                                    setFilteredFoods={setFilteredFoods}
                                                />
                                                <List
                                                    filteredTravels={category === 'travels' ? travelCompare as Travel[] : foodCompare as Food[]}
                                                    travels={travels}
                                                    setOpenModal={setOpenModal}
                                                    setGetID={setGetIDs}
                                                    gridCols='grid-cols-2'
                                                    category={category}
                                                    setGetIDFoods={setGetIDFoods}
                                                />
                                            </> :
                                            <Show
                                                item={record}
                                                comparison={() => setOpenCompare(true)}
                                                adding={(item: Travel | Food) => {
                                                    addFavorites(item);
                                                    if (category === 'travels') return item as Travel
                                                    else if (category === 'foods') return item as Food
                                                }}
                                                activeComparison={!openCompare}
                                                favorites={favorites}
                                                category={category}
                                            />
                                    }
                                />}
                            {/* OPEN MODAL COMPARE FIST*/}
                            {openCompare &&
                                <Modal
                                    isOpen={openCompare}
                                    isStatic={true}
                                    title={
                                        category === 'travels' && recordCompare ?
                                            `Viaggio a ${recordCompare?.title}` :
                                            !recordCompare && category === 'travels' ? 'Confronta viaggi' :
                                                category !== 'travels' && recordCompare ?
                                                    `Food & Beverage` : 'Confronta alimenti'}
                                    onClose={() => {
                                        setOpenCompare(false);
                                        setRecordCompare(null);
                                        if (category === 'travels') {
                                            setGetIDCompare(null)
                                        } else setGetIDCompareFoods(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        recordCompare === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels}
                                                    category={category}
                                                    setFilteredFoods={setFilteredFoods}
                                                />
                                                <List
                                                    filteredTravels={category === 'travels' ? travelCompare as Travel[] : foodCompare as Food[]}
                                                    travels={travels}
                                                    setOpenModal={setOpenCompare}
                                                    setGetID={setGetIDCompare}
                                                    gridCols='grid-cols-2'
                                                    category={category}
                                                    setGetIDFoods={setGetIDCompareFoods}
                                                />
                                            </> :
                                            <Show
                                                item={recordCompare}
                                                comparison={() => setOpenCompareSecond(true)}
                                                adding={(item: Travel | Food) => {
                                                    addFavorites(item);
                                                    if (category === 'travels') return item as Travel
                                                    else if (category === 'foods') return item as Food
                                                }}
                                                activeComparison={!openCompareSecond}
                                                favorites={favorites}
                                                category={category}
                                            />
                                    }
                                />}
                            {/* OPEN MODAL COMPARE SECOND*/}
                            {openCompareSecond &&
                                <Modal
                                    isOpen={openCompareSecond}
                                    isStatic={true}
                                    title={
                                        category === 'travels' && recordCompareSecond ?
                                            `Viaggio a ${recordCompareSecond?.title}` :
                                            !recordCompareSecond && category === 'travels' ? 'Confronta viaggi' :
                                                category !== 'travels' && recordCompareSecond ?
                                                    `Food & Beverage` : 'Confronta alimenti'}
                                    onClose={() => {
                                        setOpenCompareSecond(false);
                                        setRecordCompareSecond(null);
                                        if (category === 'travels') {
                                            setGetIDCompareSecond(null)
                                        } else setGetIDCompareSecondFoods(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        recordCompareSecond === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels}
                                                    category={category}
                                                    setFilteredFoods={setFilteredFoods}
                                                />
                                                <List
                                                    filteredTravels={category === 'travels' ? travelCompare as Travel[] : foodCompare as Food[]}
                                                    travels={travels}
                                                    setOpenModal={setOpenCompareSecond}
                                                    setGetID={setGetIDCompareSecond}
                                                    gridCols='grid-cols-2'
                                                    category={category}
                                                    setGetIDFoods={setGetIDCompareSecondFoods}
                                                />
                                            </> :
                                            <Show
                                                item={recordCompareSecond}
                                                comparison={() => setOpenCompareThirty(true)}
                                                adding={(item: Travel | Food) => {
                                                    addFavorites(item);
                                                    if (category === 'travels') return item as Travel
                                                    else if (category === 'foods') return item as Food
                                                }}
                                                activeComparison={!openCompareThirty}
                                                favorites={favorites}
                                                category={category}
                                            />
                                    }
                                />}
                            {/* OPEN MODAL COMPARE THIRTY*/}
                            {openCompareThirty &&
                                <Modal
                                    isOpen={openCompareThirty}
                                    isStatic={true}
                                    title={
                                        category === 'travels' && recordCompareThirty ?
                                            `Viaggio a ${recordCompareThirty?.title}` :
                                            !recordCompareThirty && category === 'travels' ? 'Confronta viaggi' :
                                                category !== 'travels' && recordCompareThirty ?
                                                    `Food & Beverage` : 'Confronta alimenti'}
                                    onClose={() => {
                                        setOpenCompareThirty(false);
                                        setRecordCompareThirty(null);
                                        if (category === 'travels') {
                                            setGetIDCompareThirty(null)
                                        } else setGetIDCompareThirtyFoods(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        recordCompareThirty === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels}
                                                    category={category}
                                                    setFilteredFoods={setFilteredFoods}
                                                />

                                                <List
                                                    filteredTravels={category === 'travels' ? travelCompare as Travel[] : foodCompare as Food[]}
                                                    travels={travels}
                                                    setOpenModal={setOpenCompareThirty}
                                                    setGetID={setGetIDCompareThirty}
                                                    gridCols='grid-cols-2'
                                                    category={category}
                                                    setGetIDFoods={setGetIDCompareThirtyFoods}
                                                />
                                            </> :
                                            <Show
                                                item={recordCompareThirty}
                                                comparison={() => setOpenModal(true)}
                                                adding={(item: Travel | Food) => {
                                                    addFavorites(item);
                                                    if (category === 'travels') return item as Travel
                                                    else if (category === 'foods') return item as Food
                                                }}
                                                activeComparison={!openModal}
                                                favorites={favorites}
                                                category={category}
                                            />
                                    }
                                />}
                        </div>
                    </div>
                ) : (
                    // Modal singolo
                    modalsConfig.map((modal, index) =>
                        <Modal
                            key={index}
                            isOpen={modal.isOpen}
                            title={modal.record ? `Viaggio a ${modal.record?.title}` : 'Confronta viaggi'}
                            onClose={() => {
                                modal.setIsOpen(false);
                                conditions.filter(Boolean).length >= 2 && modal.setRecord(null);
                            }}
                            content={
                                modal.record === null ?
                                    <>
                                        <Form
                                            setFilteredTravels={setFilteredTravels}
                                            travels={travels}
                                            category={category}
                                            setFilteredFoods={setFilteredFoods}
                                        />
                                        <List
                                            filteredTravels={filteredTravels}
                                            travels={travels}
                                            setOpenModal={modal.setIsOpen}
                                            setGetID={modal.setGetID}
                                            category={category}
                                            setGetIDFoods={setGetIDFoods} />
                                    </> :
                                    <Show
                                        item={modal.record}
                                        comparison={modal.comparison}
                                        adding={(item: Travel | Food) => {
                                            addFavorites(item);
                                            if (category === 'travels') return item as Travel
                                            else if (category === 'foods') return item as Food
                                        }}
                                        activeComparison={modal.activeComparison}
                                        favorites={favorites}
                                        category={category}
                                    />
                            }
                        />
                    )

                )}
        </>
    )
}