import * as React from 'react';

// Types
import type { Travel, Food, Form } from '../types/types';

// Debounce Function
function debounce<T>(callback: (value: T) => void, delay: number) {
    let timer: NodeJS.Timeout;
    return (value: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value)
        }, delay);
    };
}

export default function Form({
    setFilteredTravels,
    travels,
    category,
    setFilteredFoods
}: Form) {

    const [search, setSearch] = React.useState<string>(''); // set Input query
    const [checkValue, setCheckValue] = React.useState<'scalo' | 'diretto' | null>(null); // set Checkbox value
    const [suggest, setSuggest] = React.useState<Travel[] | Food[] | null>(null); // set Suggestion


    // submit travels
    function handleSubmitTravel(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const filteredTravels = travels
            ?.filter(t => {
                const matchesSearch = search ? t.title.toLowerCase().trim().includes(search.toLowerCase().trim()) : true;
                const matchesCategory = checkValue ? t.category === checkValue : true;
                return matchesSearch && matchesCategory
            }) || null;
        setFilteredTravels(filteredTravels as Travel[]);

        setCheckValue(null);
        setSuggest(null)
    }

    // submit foods
    function handleSubmitFood(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const filteredTravels = travels
            ?.filter(t => {
                const matchesSearch = search ? t.title.toLowerCase().trim().includes(search.toLowerCase().trim()) : true;
                return matchesSearch
            }) || null;
        setFilteredFoods(filteredTravels as Food[]);

        setSuggest(null);
        setSearch('')
    }

    // handle change for Category
    function handleCheckboxChange(selected: 'scalo' | 'diretto'): void {
        setCheckValue(prevValue => (prevValue === selected ? null : selected)); // Deseleziona se già selezionato, altrimenti seleziona
    }

    // Suggestion function Debounce
    const suggestion = React.useCallback(debounce((searchValue: string) => {

        const filteredTitleTravel = travels
            ?.filter(t => searchValue.length > 0 && t.title.toLowerCase().trim().includes(searchValue.toLowerCase().trim()))
        return setSuggest(filteredTitleTravel)


    }, 500), [search])

    React.useEffect(() => {
        suggestion(search)
    }, [search]);

    window.addEventListener('click', () => setSuggest(null))

    return (
        <>
            {/* FILTER BY QUERY/CATEGORY */}
            <form
                onSubmit={category === 'travels' ? handleSubmitTravel : category === 'foods' ? handleSubmitFood : undefined}
                className='my-5 flex flex-wrap items-center sm:flex-nowrap gap-3 '>

                <div className='flex flex-col relative'>
                    <input
                        type="text"
                        placeholder='Cerca..'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className='w-full -outline-offset-2 outline-[#4973fc] border-2 border-gray-500 rounded-sm px-1 mx-3' />

                    {/* SUGGEST */}
                    <div className={`absolute top-full left-3 w-full rounded-b-md ${search && suggest !== null ? ' bg-gray-400' : 'hidden'} py-1 px-2 z-50 shadow-lg`}>
                        {search && search?.length > 0 && suggest && suggest.length > 0 ?
                            suggest?.map(e =>
                                <div
                                    key={e.id}
                                    onClick={() => {
                                        setSearch(e.title);
                                        if (e.category === 'scalo' || e.category === 'diretto') {
                                            setCheckValue(e.category);
                                        };
                                    }}
                                    className='px-1.5 py-1 rounded-sm flex items-center justify-between hover:bg-gray-300 cursor-pointer'>
                                    <p>{e.title}</p>
                                    <p className='italic text-gray-700'>{e.category}</p>
                                </div>
                            ) : search &&
                            <div className={suggest === null ? 'hidden' : ''}>Nessun risultato</div>}
                    </div>
                </div>

                {/* CHECKBOX */}
                {category === 'travels' ?
                    <div className='flex items-center'>
                        <div className='flex items-center gap-0.5'>
                            <label htmlFor="scalo" className='ml-2 pb-0.5'>scalo</label>
                            <input
                                type="checkbox"
                                name="scalo"
                                checked={checkValue === 'scalo'}
                                onChange={() => handleCheckboxChange('scalo')} />
                        </div>

                        <div className='flex items-center gap-0.5'>
                            <label htmlFor="diretto" className='ml-2 pb-0.5'>diretto</label>
                            <input
                                type="checkbox"
                                name="diretto"
                                checked={checkValue === 'diretto'}
                                onChange={() => handleCheckboxChange('diretto')} />
                        </div>

                    </div> : ''}

                <button type="submit" className='px-5 py-1 rounded-md bg-[#4973fc] text-[#ffff00] hover:bg-[#0b43fa] hover:shadow-md shadow-[#4973fc]'>Cerca</button>
            </form>
        </>
    )
}