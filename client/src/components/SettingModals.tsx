import * as React from 'react';

// Components
import Show from "./Show";
import Modal from "./Modal";
import Form from "./Form";
import List from "./List";

// Types
import type { Travel } from "../types/types";

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
    adding,
    textBtnFavorite,
    openCompareThirty,
    recordCompareThirty,
    setRecordCompareThirty,
    getIDCompareThirty,
    setGetIDCompareThirty
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
    adding: () => void,

    // Custom text btn add favorites
    textBtnFavorite: string
}) {


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
                                                    travels={travelCompare} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travelCompare}
                                                    setOpenModal={setOpenModal}
                                                    setGetID={setGetIDs}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={record}
                                                comparison={() => setOpenCompare(true)}
                                                adding={adding}
                                                textBtnFavorite={textBtnFavorite}
                                                activeComparison={!openCompare} />}
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
                                                    travels={travelCompare} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travelCompare}
                                                    setOpenModal={setOpenCompare}
                                                    setGetID={setGetIDCompare}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={recordCompare}
                                                comparison={() => setOpenCompareSecond(true)}
                                                adding={adding}
                                                textBtnFavorite={textBtnFavorite}
                                                activeComparison={!openCompareSecond} />
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
                                                    travels={travelCompare} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travelCompare}
                                                    setOpenModal={setOpenCompareSecond}
                                                    setGetID={setGetIDCompareSecond}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={recordCompareSecond}
                                                comparison={() => setOpenCompareThirty(true)}
                                                adding={adding}
                                                textBtnFavorite={textBtnFavorite}
                                                activeComparison={!openCompareThirty} />}
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
                                                    travels={travelCompare} />
                                                <List
                                                    filteredTravels={filteredTravels}
                                                    travels={travelCompare}
                                                    setOpenModal={setOpenCompareThirty}
                                                    setGetID={setGetIDCompareThirty}
                                                    gridCols='grid-cols-2' />
                                            </> :
                                            <Show
                                                item={recordCompareThirty}
                                                comparison={() => setOpenModal(true)}
                                                adding={adding}
                                                textBtnFavorite={textBtnFavorite}
                                                activeComparison={!openModal} />
                                    }
                                />}
                        </div>
                    </div>
                ) : (
                    // Modal singolo
                    <>
                        {/* MODAL */}
                        <Modal
                            isOpen={openModal}
                            title={record ? `Viaggio a ${record?.title}` : 'Confronta viaggi'}
                            onClose={() => {
                                setOpenModal(false);
                                setRecord(null)
                            }}
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
                                            setGetID={setGetIDCompare} />
                                    </> :
                                    <Show
                                        item={record}
                                        comparison={() => setOpenCompare(true)}
                                        adding={adding}
                                        textBtnFavorite={textBtnFavorite}
                                        activeComparison={!openCompare}
                                    />
                            }
                        />
                        {/* MODAL COMPARE */}
                        <Modal
                            isOpen={openCompare}
                            title={recordCompare ? `Viaggio a ${recordCompare?.title}` : 'Confronta viaggi'}
                            onClose={() => {
                                setOpenCompare(false);
                                setRecordCompare(null)
                            }}
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
                                            setGetID={setGetIDCompare} />
                                    </> :
                                    <Show
                                        item={recordCompare}
                                        comparison={() => setOpenModal(true)}
                                        adding={adding}
                                        textBtnFavorite={textBtnFavorite}
                                        activeComparison={!openCompareSecond}
                                    />
                            }
                        />
                        {/* MODAL COMAPRE SECOND */}
                        <Modal
                            isOpen={openCompareSecond}
                            title={recordCompareSecond ? `Viaggio a ${recordCompareSecond?.title}` : 'Confronta viaggi'}
                            onClose={() => {
                                setOpenCompareSecond(false);
                                setRecordCompareSecond(null)
                            }}
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
                                            setGetID={setGetIDCompare} />
                                    </> :
                                    <Show
                                        item={recordCompareSecond}
                                        comparison={() => setOpenCompareThirty(true)}
                                        adding={adding}
                                        textBtnFavorite={textBtnFavorite}
                                        activeComparison={!openCompareThirty}
                                    />}
                        />
                        {/* MODAL COMPARE THIRTY*/}
                        <Modal
                            isOpen={openCompareThirty}
                            title={recordCompareThirty ? `Viaggio a ${recordCompareThirty?.title}` : 'Confronta viaggi'}
                            onClose={() => {
                                setOpenCompareThirty(false);
                                setRecordCompareThirty(null)
                            }}
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
                                            setGetID={setGetIDCompareThirty} />
                                    </> :
                                    <Show
                                        item={recordCompareThirty}
                                        comparison={() => setOpenCompareThirty(true)}
                                        adding={adding}
                                        textBtnFavorite={textBtnFavorite}
                                        activeComparison={!openModal}
                                    />
                            }
                        />
                    </>
                )}
        </>
    )
}