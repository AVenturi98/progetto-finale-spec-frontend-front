import * as React from 'react';

export default function Modal({
    isOpen,
    title,
    content,
    onClose
}: {
    isOpen: boolean,
    title: string,
    content?: React.ReactNode,
    onClose: () => void
}) {

    return (
        <>
            {isOpen &&
                <div className="fixed top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center z-50">
                    <div className='bg-white text-black h-[75%] w-[75%] rounded-md relative'>
                        <button
                            type="button"
                            onClick={onClose}
                            className='text-red-500 border-2 border-red-500 rounded-md absolute top-0 right-0 m-3'>X</button>
                        <h2>{title}</h2>
                        <div>{content}</div>
                    </div>
                </div>}
        </>
    )
}