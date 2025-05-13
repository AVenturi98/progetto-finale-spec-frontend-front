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
    recordCompare,
    setRecordCompare,
    filteredTravels,
    setFilteredTravels,
    travels,
    setGetIDs,
    setGetIDCompare,
    adding,
    textBtnFavorite
}: {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    openCompare: boolean,
    setOpenCompare: React.Dispatch<React.SetStateAction<boolean>>,
    record: Travel | null,
    setRecord: React.Dispatch<React.SetStateAction<Travel | null>>,
    recordCompare: Travel | null,
    setRecordCompare: React.Dispatch<React.SetStateAction<Travel | null>>,
    filteredTravels: Travel[] | null
    setFilteredTravels: React.Dispatch<React.SetStateAction<Travel[] | null>>
    travels: Travel[] | null,
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>,
    setGetIDCompare: React.Dispatch<React.SetStateAction<number | null>>,
    adding: () => void,
    textBtnFavorite: string
}) {


    return (
        <>
            {openModal && openCompare ? (
                // Modal doppio
                <div className="fixed inset-0 bg-[#181818] z-50 flex items-center justify-center">
                    <div className='grid grid-cols-2 gap-4 p-4'>
                        {/* OPEN MODAL */}
                        <Modal
                            isOpen={openModal}
                            isStatic={true}
                            title={`Viaggio a ${record?.title}`}
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
                                            setGetID={setGetIDs}
                                            gridCols='grid-cols-2' />
                                    </> :
                                    <Show
                                        item={record}
                                        comparison={() => setOpenCompare(true)}
                                        adding={adding}
                                        textBtnFavorite={textBtnFavorite} />}
                        />
                        {/* OPEN MODAL COMPARE */}
                        <Modal
                            isOpen={openCompare}
                            isStatic={true}
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
                                            setGetID={setGetIDCompare}
                                            gridCols='grid-cols-2' />
                                    </> :
                                    <Show
                                        item={recordCompare}
                                        comparison={() => setOpenModal(true)}
                                        adding={adding}
                                        textBtnFavorite={textBtnFavorite} />
                            }
                        />
                    </div>
                </div>
            ) : (
                // Modal singolo
                <>
                    {/* MODAL */}
                    {openModal &&
                        <Modal
                            isOpen={openModal}
                            title={`Viaggio a ${record?.title}`}
                            onClose={() => { setOpenModal(false) }}
                            content={record &&
                                <Show
                                    item={record}
                                    comparison={() => setOpenCompare(true)}
                                    adding={adding}
                                    textBtnFavorite={textBtnFavorite}
                                />}
                        />
                    }
                    {/* MODAL COMPARE */}
                    {openCompare &&
                        <Modal
                            isOpen={openCompare}
                            title={recordCompare ? `Viaggio a ${recordCompare?.title}` : 'Confronta viaggi'}
                            onClose={() => setOpenCompare(false)}
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
                                        textBtnFavorite={textBtnFavorite} />
                            }
                        />
                    }
                </>
            )}
        </>
    )
}