// Types
import type { Food, FoodShow } from '../types/types';

export default function FoodShow({
    item,
    exists,
    activeComparison,
    comparison,
    adding
}: FoodShow
) {

    return (
        <>
            {item ?
                <div className='w-full border-2 border-gray-500 rounded-md flex flex-col gap-2 py-5 px-2 sm:p-8 md:px-8'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='md:w-[30%] text-center'>{item.title && item.title}</h2>
                            <p className='text-xl font-semibold'>{item.brand}</p>
                        </div>
                        <div className='flex flex-wrap md:flex-nowrap justify-between items-center'>
                            <div className=''>
                                {item.available ?
                                    <p className='text-green-500'>Disponibile</p> :
                                    <p className='text-red-500'>Non disponibile</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='border-2 border-gray-500 w-[50%] rounded-md p-3 mt-2'>
                            <p className='font-bold text-xl'>Costo prodotto</p>
                            <div className='flex justify-between items-center'>
                                <p className='my-2 italic opacity-0 md:block'>prezzo: </p>
                                <p className='w-full text-center font-extrabold text-2xl'>{item.price && item.price.toFixed(2) + '€'}</p>
                            </div>
                        </div>
                        <div className='w-[45%] p-3 mt-2 flex flex-wrap justify-between items-center gap-2'>
                            <button
                                type='button'
                                onClick={() => adding({ id: item?.id!, title: item?.title!, category: item?.category! } as Food)}
                                className='w-full py-2 rounded-xl bg-[#4973fc] text-[#ffff00] hover:bg-[#0b43fa] hover:shadow-md shadow-[#4973fc]'>
                                {`${exists ? 'Rimuovi dai' : 'Aggiungi ai'} preferiti`}
                            </button>
                            {activeComparison &&
                                <button
                                    type="button"
                                    onClick={comparison}
                                    className='w-full py-2 rounded-xl bg-green-300 text-[#4973FC] hover:bg-green-400 hover:shadow-md shadow-green-300'>
                                    CONFRONTA
                                </button>}
                        </div>

                    </div>
                </div> :
                <div className='flex justify-center items-center'>
                    Nessun elemento trovato
                </div>
            }
        </>
    )
}