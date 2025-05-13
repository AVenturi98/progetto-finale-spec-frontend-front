import type { Travel, Base } from '../types/types';

export default function Card({
    item,
    onDelete
}: {
    item: Travel | Base,
    onDelete?: () => void
}) {

    const { title, category, start } = item;

    return (
        <>
            <div className='cursor-pointer border-4 border-gray-300 rounded-md p-3 m-2 min-w-[250px]'>
                <div className='flex justify-between'>
                    <h2>{title}</h2>
                    <p className='text-gray-500 italic'>{category}</p>
                </div>
                <div>
                    <p className='italic text-gray-400'>partenza:
                        <span className='text-white'>{' ' + start}</span>
                    </p>
                    <button
                        type="button"
                        onClick={onDelete}>DEL</button>
                </div>
            </div>
        </>
    )
}