import * as React from 'react';

// Types
import type { Travel } from '../types/types';

export default function List({
    filteredTravels,
    travels,
    setOpenModal,
    setGetID,
    gridCols
}: {
    filteredTravels: (Travel[] | null),
    travels: (Travel[] | null),
    setOpenModal: (isOpen: boolean) => void,
    setGetID: (id: number) => void,
    gridCols?: string
}) {

    const [order, setOrder] = React.useState<"A-Z" | "Z-A" | undefined>(undefined);


    // order by selected 
    const sorted: Travel[] | null = React.useMemo(() => {
        const arrayToSort = filteredTravels || travels;
        if (!arrayToSort) return null; // Controlla che l'array non sia null

        return [...arrayToSort].sort((a: Travel, b: Travel) => {
            if (order === "A-Z") {
                return a.title.localeCompare(b.title); // Ordine alfabetico crescente
            } else if (order === "Z-A") {
                return b.title.localeCompare(a.title); // Ordine alfabetico decrescente
            }
            return 0; // Nessun ordinamento se `order` non è definito
        });
    }, [filteredTravels, travels, order])

    function getID(id: number) {
        setOpenModal(true);
        setGetID(id)
    }

    return (
        <>
            {/* ALPHABETIC ORDER */}
            <div className='mx-5 flex items-center gap-2'>
                <label htmlFor="sorted">Ordina</label>
                <select
                    name="sorted"
                    id="sorted"
                    value={order}
                    onChange={e => setOrder(e.target.value as "A-Z" | "Z-A" | undefined)}
                    className='border-2 border-gray-700 rounded-sm my-1'>

                    <option
                        value=""
                        className='bg-[rgb(20,20,20)]'
                        disabled={!!order}>Seleziona</option>
                    <option
                        value="A-Z"
                        className='bg-[rgb(20,20,20)]'>A-Z</option>
                    <option
                        value="Z-A"
                        className='bg-[rgb(20,20,20)]'>Z-A</option>

                </select>
            </div>

            {/* RECORDS LIST */}
            <ul className={`grid ${gridCols ? gridCols : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'}`}>
                {sorted === null ? (
                    // sorted è null
                    <div className='flex justify-center items-center'>
                        Caricamento...
                    </div>
                ) : Array.isArray(sorted) && sorted.length === 0 ? (
                    // sorted è un array vuoto
                    <div className='flex justify-center items-center my-5'>
                        Nessun risultato trovato
                    </div>
                ) : (
                    // sorted va a buon fine
                    sorted.map((e: Travel) => (
                        <li
                            key={e.id}
                            onClick={() => getID(e.id)}
                            className='border-4 border-gray-300 rounded-md p-3 m-2 min-w-[250px]'>
                            <div className='flex justify-between'>
                                <h2>{e.title}</h2>
                                <p className='text-gray-500 italic'>{e.category}</p>
                            </div>
                            <div>
                                <p className='italic text-gray-400'>partenza:
                                    <span className='text-white'>{' ' + e.start}</span>
                                </p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </>
    )
}