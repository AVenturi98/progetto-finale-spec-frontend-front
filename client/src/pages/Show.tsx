import * as React from 'react';
import { useParams } from 'react-router';
const URL_API = import.meta.env.VITE_URL_API;

// Types 
import type { Travel } from '../types/types';

// Icons
import airplane from '../assets/airplane.png'

export default function Show() {

    const { id } = useParams();

    const [record, setRecord] = React.useState<Travel | null>(null);

    async function getItem(): Promise<Travel | null> {
        try {
            const res = await fetch(`${URL_API}/${id}`);
            if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`)
            const data = await res.json();
            // console.log(data);
            setRecord(data.travel)
            return data
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Errore: ${err.message}`)
            } else {
                console.error(err)
            }
            return null
        }
    };

    React.useEffect(() => {
        getItem();
    }, [id])


    return (
        <div className='flex justify-center items-center m-3'>
            {record ?
                <div className='w-full sm:w-[90%] md:w-[800px] border-2 border-gray-500 rounded-md flex flex-col gap-2 py-5 px-2 sm:p-10 md:px-8'>
                    <div className='flex flex-wrap md:flex-nowrap justify-between items-center'>
                        <h2 className='md:w-[30%] text-center'><span className='text-sm'>Da:</span> {record.start && record.start}</h2>
                        <div className=''>
                            {record.available ?
                                <p className='text-green-500'>Disponibile</p> :
                                <p className='text-red-500'>Non disponibile</p>}
                        </div>
                        <h2 className='md:w-[30%] text-center'><span className='text-sm'>A:</span> {record.title && record.title}</h2>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='row_prev'></div>
                        <div className='circle flex justify-center items-center'>
                            <div className='flex flex-col justify-center items-center '>
                                <img
                                    src={airplane}
                                    alt="airplane"
                                    className='w-[20px] h-[20px]' />
                                <p>{record.duration && record.duration.toFixed(2)}h</p>
                            </div>
                        </div>
                        <div className='row_next'></div>
                    </div>
                    <p className='flex justify-center items-center italic'><span className='mr-1'>{record.scale ? record.scale : ''}</span> {record.category && record.category}</p>
                    <div className='flex justify-between items-center'>
                        <div className='border-2 border-gray-500 w-[50%] rounded-md p-3 mt-2'>
                            <p className='font-bold text-xl'>Costo <span className='md:hidden'>:</span><span className='hidden md:block'>biglietto sola andata:</span></p>
                            <div className='flex justify-between items-center'>
                                <p className='my-2 italic hidden md:block'>prezzo: </p>
                                <p className='w-full text-center font-extrabold text-2xl'>{record.price && record.price.toFixed(2) + '€'}</p>
                            </div>
                        </div>
                        <div className='border-2 border-gray-500 w-[45%] h-[120px] p-3 mt-2'>
                            <button>
                                Aggiungi ai preferiti
                            </button>
                            <button>
                                UP
                            </button>
                            <button>
                                DEL
                            </button>
                            <button>
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