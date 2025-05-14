import * as React from 'react';

// Components
import Show from "./Show";
import Modal from "./Modal";
import Form from "./Form";
import List from "./List";

// Types
import type { Travel, Base } from "../types/types";

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
}: {
    // Modal settings 
    // --open modal--
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    // --item modal--
    record: Travel | null,
    setRecord: React.Dispatch<React.SetStateAction<Travel | null>>,
    // --get ID item modal--
    getIDs: number | null,
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>,

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
    travels: Travel[] | null,
    filteredTravels: Travel[] | null,
    setFilteredTravels: React.Dispatch<React.SetStateAction<Travel[] | null>>,

    // Adding favorites item
    addFavorites: (favorite: Base) => void,
    favorites: Base[] | null,
}) {


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


    // filtered travel comparison
    const travelCompare: Travel[] | null = travels?.filter(t => {
        return t.id !== getIDs &&
            t.id !== getIDCompare &&
            t.id !== getIDCompareSecond &&
            t.id !== getIDCompareThirty

    }) || null

    const conditions = [openModal, openCompare, openCompareSecond, openCompareThirty];

    return (
        <>
            {
                openModal && openCompare ||
                    openCompare && openCompareSecond ||
                    openCompareSecond && openCompareThirty ||
                    openCompareThirty && openModal ? (
                    // Modal doppio
                    <div className="fixed inset-0 bg-[#181818] z-50 flex items-center justify-center">
                        <div className={`grid grid-cols-2 gap-4 p-4`}>
                            {modalsConfig.map((modal, index) => (
                                <Modal
                                    key={index}
                                    isOpen={modal.isOpen}
                                    title={modal.record ? `Viaggio a ${modal.record?.title}` : 'Confronta viaggi'}
                                    onClose={() => {
                                        modal.setIsOpen(false);
                                        conditions.filter(Boolean).length >= 3 && modal.setRecord(null);
                                        modal.setGetID(null);
                                    }}
                                    hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                    content={
                                        modal.record === null ? (
                                            <>
                                                <Form
                                                    setFilteredTravels={setFilteredTravels}
                                                    travels={travelCompare}
                                                />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travelCompare}
                                                    setOpenModal={modal.setIsOpen}
                                                    setGetID={modal.setGetID}
                                                    gridCols="grid-cols-2"
                                                />
                                            </>
                                        ) : (
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
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    // Modal singolo
                    <>
                        {modalsConfig.map((modal, index) => (
                            <Modal
                                key={index}
                                isOpen={modal.isOpen}
                                title={modal.record ? `Viaggio a ${modal.record?.title}` : 'Confronta viaggi'}
                                onClose={() => {
                                    modal.setIsOpen(false);
                                    conditions.filter(Boolean).length >= 3 && modal.setRecord(null);
                                }}
                                hContent={conditions.filter(Boolean).length >= 3 ? 'h-[350px]' : ''}
                                content={
                                    modal.record === null ? (
                                        <>
                                            <Form
                                                setFilteredTravels={setFilteredTravels}
                                                travels={travelCompare}
                                            />
                                            <List
                                                filteredTravels={filteredTravels}
                                                travels={travelCompare}
                                                setOpenModal={modal.setIsOpen}
                                                setGetID={modal.setGetID}
                                                gridCols="grid-cols-2"
                                            />
                                        </>
                                    ) : (
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
                                    )
                                }
                            />
                        ))}
                    </>
                )}
        </>
    )
}