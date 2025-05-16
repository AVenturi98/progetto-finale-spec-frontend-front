import * as React from 'react';

// Types
import type { Travel, Food, List } from '../types/types';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List({
    filteredTravels,
    travels,
    setOpenModal,
    setGetID,
    setGetIDFoods,
    gridCols,
    onDelete,
    setDeleted,
    category
}: List) {

    const [order, setOrder] = React.useState<"A-Z" | "Z-A" | undefined>(undefined);


    // order by selected 
    const sorted = React.useMemo(() => {
        const arrayToSort = filteredTravels || travels;
        if (!arrayToSort) return null;

        const sortedArray = [...arrayToSort].sort((a, b) => {
            if (order === "A-Z") {
                return a.title.localeCompare(b.title);
            } else if (order === "Z-A") {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

        // Tipizza correttamente in base alla categoria
        if (category === 'travels') return sortedArray as Travel[];
        if (category === 'foods') return sortedArray as Food[];

        return sortedArray;
    }, [filteredTravels, travels, order, category]);

    function getID({ item, id }: { item: Travel | Food, id: number }) {
        if (category === 'travels') {
            if (!onDelete) {
                setOpenModal(true);
                setGetID(id);
                // console.log('travel', item)
                return item as Travel
            } else {
                setGetID(id)
            }
        } else if (category === 'foods') {
            if (!onDelete) {
                setOpenModal(true);
                setGetIDFoods(id);
                // console.log('foods', item)
                return item as Food
            } else {
                setGetID(id)
            }
        }
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
                    className='border-2 border-gray-700 hover:bg-yellow-100 rounded-sm my-1'>

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
                    <div className='text-center my-5'>
                        Nessun risultato trovato
                    </div>
                ) : (
                    // sorted va a buon fine
                    sorted.map((e: Travel | Food) => (
                        <li
                            key={e.id}
                            onClick={() => getID({ item: e, id: e.id })}
                            className='cursor-pointer border-4 border-[#727fa8] hover:bg-yellow-100 transition-all duration-300 rounded-md p-3 m-2 min-w-[250px]'>
                            <div className='flex justify-between'>
                                <h2>{e.title}</h2>
                                <p className='text-gray-500 italic'>{e.category}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='italic text-gray-400 hidden'>partenza:
                                    <span className='text-black'>{' '}</span>
                                </p>
                                {onDelete &&
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!setDeleted) return;

                                            if (category === 'travels') {
                                                const filtered = (travels as Travel[])?.filter(t => t.id !== e.id) || null;
                                                setDeleted(filtered);
                                            } else if (category === 'foods') {
                                                const filtered = (travels as Food[])?.filter(t => t.id !== e.id) || null;
                                                setDeleted(filtered);
                                            }
                                        }}
                                        className='rounded-md bg-red-400 px-2 hover:bg-red-500 hover:shadow-md shadow-red-300'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>}
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </>
    )
}