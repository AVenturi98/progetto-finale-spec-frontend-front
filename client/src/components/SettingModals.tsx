import * as React from 'react';

// Components
import Show from "./Show";
import Modal from "./Modal";
import Form from "./Form";
import List from "./List";

import type { Travel, Base } from "../types/types";



export default function SettingModals({
    openModal,
    openCompare,
    record,
    setOpenModal,
    setFilteredTravels,
    travels,
    setGetIDs,
    filteredTravels,
    setOpenCompare,
    recordCompare,
    setGetIDCompare,
    setFavorites,
    textBtnFavorite
}: {
    openModal: boolean,
    openCompare: boolean,
    record: Travel | null,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setFilteredTravels: React.Dispatch<React.SetStateAction<Travel[] | null>>
    travels: Travel[] | null,
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>,
    filteredTravels: Travel[] | null
    setOpenCompare: React.Dispatch<React.SetStateAction<boolean>>,
    recordCompare: Travel | null,
    setGetIDCompare: React.Dispatch<React.SetStateAction<number | null>>,
    setFavorites: React.Dispatch<React.SetStateAction<Base[] | null>>,
    textBtnFavorite: string
}) {




    function addFavorites(item: Base) {
        setFavorites((prev: Base[] | null) => {

            if (!prev) {
                alert('Aggiunto');
                return [item];
            }

            const idExist = prev.find(t => t.id === item.id);
            if (!idExist) {
                alert('Aggiunto');
                return [...prev, item];
            } else {
                alert('Rimosso');
                return prev.filter(t => t.id !== item.id);
            }
        });
    }



    return (
        <>
            {openModal && openCompare ? (
                // Modal doppio
                <div className="fixed inset-0 bg-[#181818] z-50 flex items-center justify-center">
                    <div className='grid grid-cols-2 gap-4 p-4'>
                        {/* OPEN MODAL */}
                        <Modal
                            isOpen={true}
                            isStatic={true}
                            title={`Viaggio a ${record?.title}`}
                            onClose={() => { setOpenModal(false) }}
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
                                        adding={() => record && addFavorites({ id: record.id, title: record.title, category: record.category, start: record.start })}
                                        textBtnFavorite={textBtnFavorite} />}
                        />
                        {/* OPEN MODAL COMPARE */}
                        <Modal
                            isOpen={true}
                            isStatic={true}
                            title={recordCompare ? `Viaggio a ${recordCompare?.title}` : 'Confronta viaggi'}
                            onClose={() => { setOpenCompare(false) }}
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
                                        comparison={() => setOpenCompare(true)}
                                        adding={() => recordCompare && addFavorites({ id: recordCompare.id, title: recordCompare.title, category: recordCompare.category, start: recordCompare.start })}
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
                            isOpen={true}
                            title={`Viaggio a ${record?.title}`}
                            onClose={() => { setOpenModal(false) }}
                            content={<Show
                                item={record}
                                comparison={() => setOpenCompare(true)}
                                adding={() => record && addFavorites({ id: record.id, title: record.title, category: record.category, start: record.start })}
                                textBtnFavorite={textBtnFavorite}
                            />}
                        />
                    }
                    {/* MODAL COMPARE */}
                    {openCompare &&
                        <Modal
                            isOpen={true}
                            title={recordCompare ? `Viaggio a ${recordCompare?.title}` : 'Confronta viaggi'}
                            onClose={() => { setOpenCompare(false) }}
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
                                        adding={() => recordCompare && addFavorites({ id: recordCompare.id, title: recordCompare.title, category: recordCompare.category, start: recordCompare.start })}
                                        textBtnFavorite={textBtnFavorite} />
                            }
                        />
                    }
                </>
            )}
        </>
    )
}