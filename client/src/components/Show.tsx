// Types 
import type { Travel } from '../types/types';

// Icons
import airplane from '../assets/airplane.png'

export default function Show({
    item,
    comparison
}: {
    item: Travel | null,
    comparison: () => void
}) {


    return (
        <div className='flex justify-center items-center m-3'>
            {item ?
                <div className='w-full border-2 border-gray-500 rounded-md flex flex-col gap-2 py-5 px-2 sm:p-10 md:px-8'>
                    <div className='flex flex-wrap md:flex-nowrap justify-between items-center'>
                        <h2 className='md:w-[30%] text-center'><span className='text-sm'>Da:</span> {item.start && item.start}</h2>
                        <div className=''>
                            {item.available ?
                                <p className='text-green-500'>Disponibile</p> :
                                <p className='text-red-500'>Non disponibile</p>}
                        </div>
                        <h2 className='md:w-[30%] text-center'><span className='text-sm'>A:</span> {item.title && item.title}</h2>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='row_prev'></div>
                        <div className='circle flex justify-center items-center'>
                            <div className='flex flex-col justify-center items-center '>
                                <img
                                    src={airplane}
                                    alt="airplane"
                                    className='w-[20px] h-[20px]' />
                                <p>{item.duration && item.duration.toFixed(2)}h</p>
                            </div>
                        </div>
                        <div className='row_next'></div>
                    </div>
                    <p className='flex justify-center items-center italic'><span className='mr-1'>{item.scale ? item.scale : ''}</span> {item.category && item.category}</p>
                    <div className='flex justify-between items-center'>
                        <div className='border-2 border-gray-500 w-[50%] rounded-md p-3 mt-2'>
                            <p className='font-bold text-xl'>Costo <span className='md:hidden'>:</span><span className='hidden md:block'>biglietto sola andata:</span></p>
                            <div className='flex justify-between items-center'>
                                <p className='my-2 italic hidden md:block'>prezzo: </p>
                                <p className='w-full text-center font-extrabold text-2xl'>{item.price && item.price.toFixed(2) + '€'}</p>
                            </div>
                        </div>
                        <div className='w-[45%] p-3 mt-2 flex flex-wrap justify-between items-center gap-2'>
                            <button className='w-full'>
                                Aggiungi ai preferiti
                            </button>
                            <button>
                                UP
                            </button>
                            <button>
                                DEL
                            </button>
                            <button
                                type="button"
                                onClick={comparison}
                                className='bg-green-300'>
                                COMP
                            </button>
                        </div>

                    </div>
                </div> :
                <div className='flex justify-center items-center'>
                    Nessun elemento trovato
                </div>
            }
        </div>
    )
}