import Show from "./Show";
import Modal from "./Modal";
import Form from "./Form";
import List from "./List";

import type { Travel } from "../types/types";

export default function SettingModals({
    openModal,
    openCompare,
    record,
    setOpenModal,
    setRecord,
    setFilteredTravels,
    travels,
    setGetIDs,
    filteredTravels,
    setOpenCompare,
    recordCompare,
    setRecordCompare,
    setGetIDCompare,

}: {
    openModal: boolean,
    openCompare: boolean,
    record: Travel | null,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setRecord: React.Dispatch<React.SetStateAction<Travel | null>>
    setFilteredTravels: React.Dispatch<React.SetStateAction<Travel[] | null>>
    travels: Travel[] | null,
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>,
    filteredTravels: Travel[] | null
    setOpenCompare: React.Dispatch<React.SetStateAction<boolean>>,
    recordCompare: Travel | null,
    setRecordCompare: React.Dispatch<React.SetStateAction<Travel | null>>,
    setGetIDCompare: React.Dispatch<React.SetStateAction<number | null>>
}) {

    return (
        <>
            {openModal && openCompare ? (
                // Modal doppio
                <div className="fixed inset-0 bg-[#181818] z-50 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-4">
                        {/* OPEN MODAL */}
                        <Modal
                            isOpen={true}
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
                                    <Show item={record} comparison={() => setOpenCompare(true)} />}
                        />
                        {/* OPEN MODAL COMPARE */}
                        <Modal
                            isOpen={true}
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
                                    <Show item={recordCompare} comparison={() => setOpenCompare(true)} />
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
                            onClose={() => {
                                setOpenModal(false);
                                setRecord(null)
                            }}
                            content={<Show item={record} comparison={() => setOpenCompare(true)} />}
                        />
                    }
                    {/* MODAL COMPARE */}
                    {openCompare &&
                        <Modal
                            isOpen={true}
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
                                    <Show item={recordCompare} comparison={() => setOpenModal(true)} />
                            }
                        />
                    }
                </>
            )}
        </>
    )
}