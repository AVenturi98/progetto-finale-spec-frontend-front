// Components
import Show from "./Show";
import Modal from "./Modal";
import Form from "./Form";
import List from "./List";

// Types
import type { Travel, Base, SettingModal } from "../types/types";



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
    getIDCompare,
    setGetIDCompare,
    getIDCompareSecond,
    setGetIDCompareSecond,
    addFavorites,
    openCompareThirty,
    recordCompareThirty,
    setRecordCompareThirty,
    getIDCompareThirty,
    setGetIDCompareThirty,
    favorites
}:
    SettingModal
) {

    // filtered travel comparison
    // const travelCompare: Travel[] | null = travels?.filter(t => {
    //     return t.id !== getIDs &&
    //         t.id !== getIDCompare &&
    //         t.id !== getIDCompareSecond &&
    //         t.id !== getIDCompareThirty

    // }) || null

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
            comparison: () => setOpenModal(true),
            activeComparison: !openModal,
        },
    ];

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
                                    title={record ? `Viaggio a ${record?.title}` : 'Confronta viaggi'}
                                    onClose={() => {
                                        setOpenModal(false);
                                        setRecord(null);
                                        setGetIDs(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        record === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travels}
                                                    setOpenModal={setOpenModal}
                                                    setGetID={setGetIDs}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={record}
                                                comparison={() => setOpenCompare(true)}
                                                adding={(item: Base) => {
                                                    addFavorites(item);
                                                    return item;
                                                }}
                                                activeComparison={!openCompare}
                                                favorites={favorites}
                                            />
                                    }
                                />}
                            {/* OPEN MODAL COMPARE FIST*/}
                            {openCompare &&
                                <Modal
                                    isOpen={openCompare}
                                    isStatic={true}
                                    title={recordCompare ? `Viaggio a ${recordCompare?.title}` : 'Confronta viaggi'}
                                    onClose={() => {
                                        setOpenCompare(false);
                                        setRecordCompare(null);
                                        setGetIDCompare(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        recordCompare === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travels}
                                                    setOpenModal={setOpenCompare}
                                                    setGetID={setGetIDCompare}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={recordCompare}
                                                comparison={() => setOpenCompareSecond(true)}
                                                adding={(item: Base) => {
                                                    addFavorites(item);
                                                    return item;
                                                }}
                                                activeComparison={!openCompareSecond}
                                                favorites={favorites}
                                            />
                                    }
                                />}
                            {/* OPEN MODAL COMPARE SECOND*/}
                            {openCompareSecond &&
                                <Modal
                                    isOpen={openCompareSecond}
                                    isStatic={true}
                                    title={recordCompareSecond ? `Viaggio a ${recordCompareSecond?.title}` : 'Confronta viaggi'}
                                    onClose={() => {
                                        setOpenCompareSecond(false);
                                        setRecordCompareSecond(null);
                                        setGetIDCompareSecond(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        recordCompareSecond === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travels}
                                                    setOpenModal={setOpenCompareSecond}
                                                    setGetID={setGetIDCompareSecond}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={recordCompareSecond}
                                                comparison={() => setOpenCompareThirty(true)}
                                                adding={(item: Base) => {
                                                    addFavorites(item);
                                                    return item;
                                                }}
                                                activeComparison={!openCompareThirty}
                                                favorites={favorites} />
                                    }
                                />}
                            {/* OPEN MODAL COMPARE THIRTY*/}
                            {openCompareThirty &&
                                <Modal
                                    isOpen={openCompareThirty}
                                    isStatic={true}
                                    title={recordCompareThirty ? `Viaggio a ${recordCompareThirty?.title}` : 'Confronta viaggi'}
                                    onClose={() => {
                                        setOpenCompareThirty(false);
                                        setRecordCompareThirty(null);
                                        setGetIDCompareThirty(null)
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        recordCompareThirty === null ?
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travels} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travels}
                                                    setOpenModal={setOpenCompareThirty}
                                                    setGetID={setGetIDCompareThirty}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={recordCompareThirty}
                                                comparison={() => setOpenModal(true)}
                                                adding={(item: Base) => {
                                                    addFavorites(item);
                                                    return item;
                                                }}
                                                activeComparison={!openModal}
                                                favorites={favorites} />
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
                                // modal.setRecord(null);
                            }}
                            content={
                                modal.record === null ?
                                    <>
                                        <Form
                                            setFilteredTravels={setFilteredTravels}
                                            travels={travels} />
                                        <List
                                            filteredTravels={filteredTravels}
                                            travels={travels}
                                            setOpenModal={modal.setIsOpen}
                                            setGetID={modal.setGetID} />
                                    </> :
                                    <Show
                                        item={modal.record}
                                        comparison={modal.comparison}
                                        adding={(item: Base) => {
                                            addFavorites(item);
                                            return item;
                                        }}
                                        activeComparison={modal.activeComparison}
                                        favorites={favorites}
                                    />
                            }
                        />
                    )

                )}
        </>
    )
}