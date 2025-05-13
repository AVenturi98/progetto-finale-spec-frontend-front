import * as React from 'react';

// Types
import type { Travel } from '../types/types'

export default function Form({
    setFilteredTravels,
    travels
}: {
    setFilteredTravels: (filteredTravels: Travel[] | null) => void,
    travels: (Travel[] | null)
}) {

    const search = React.useRef<HTMLInputElement>(null);
    const scaloRef = React.useRef<HTMLInputElement>(null);
    const direttoRef = React.useRef<HTMLInputElement>(null);

    // handle submit to Form
    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setFilteredTravels(
            travels?.filter(t =>
                search.current && t.title.toLowerCase().trim().includes(search.current.value.toLowerCase().trim()) &&
                (scaloRef.current?.checked || direttoRef.current?.checked ? t.category === (scaloRef.current?.checked ? 'scalo' : 'diretto') : true)
            ) || null
        )
    }

    // handle change for Category
    function handleCheckboxChange(selected: 'scalo' | 'diretto'): void {
        if (selected === 'scalo' && scaloRef.current) {
            scaloRef.current.checked = true; // Seleziona "scalo"
            if (direttoRef.current) direttoRef.current.checked = false; // Deseleziona "diretto"
        } else if (selected === 'diretto' && direttoRef.current) {
            direttoRef.current.checked = true; // Seleziona "diretto"
            if (scaloRef.current) scaloRef.current.checked = false; // Deseleziona "scalo"
        }
    }

    return (
        <>
            {/* FILTER BY QUERY/CATEGORY */}
            <form
                onSubmit={handleSubmitSearch}
                className='my-5 flex flex-wrap items-center sm:flex-nowrap gap-3 '>

                <input
                    type="text"
                    placeholder='Cerca..'
                    ref={search}
                    className='w-full md:w-[40%] -outline-offset-2 outline-[#4973fc] border-2 border-gray-500 rounded-sm px-1 mx-3' />

                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <label htmlFor="scalo" className='mx-2 pb-1'>scalo</label>
                        <input
                            type="checkbox"
                            name="scalo"
                            ref={scaloRef}
                            onChange={() => handleCheckboxChange('scalo')} />
                    </div>

                    <div className='flex items-center'>
                        <label htmlFor="diretto" className='mx-2 pb-1'>diretto</label>
                        <input
                            type="checkbox"
                            name="diretto"
                            ref={direttoRef}
                            onChange={() => handleCheckboxChange('diretto')} />
                    </div>

                </div>
                <button type="submit" className='px-5 py-1 rounded-md bg-[#4973fc] text-[#ffff00] hover:bg-[#0b43fa] hover:shadow-md shadow-[#4973fc]'>Cerca</button>
            </form>
        </>
    )
}