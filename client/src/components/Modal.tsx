import * as React from 'react';

export default function Modal({
    isOpen,
    title,
    content,
    onClose,
    hContent,
    isStatic
}: {
    isOpen: boolean,
    title: string,
    content?: React.ReactNode,
    onClose: () => void,
    hContent?: string,
    isStatic?: boolean
}) {

    React.useEffect(() => {
        scrollTo(0, 0)
    }, [])

    return (
        <div
            className={`text-black  ${isStatic ? '' : 'fixed w-full h-screen inset-0 bg-[#000000ef] '} flex items-center justify-around transition-opacity duration-500 z-55 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div
                className={`bg-white rounded-lg shadow-lg p-5 transform transition-transform duration-500 ${isOpen ? 'scale-100' : 'scale-90'}`}>
                <div className="flex justify-center items-center mb-4">
                    <h2 className="w-full text-center font-bold">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-3 absolute top-1 right-1 rounded-xl bg-[#c4c4c4] text-[#4973fc] hover:text-[#ffff00] hover:bg-[#0b43fa] hover:shadow-md shadow-[#4973fc]">
                        ✕
                    </button>
                </div>
                <div
                    className={`overflow-y-auto overflow-x-hidden ${hContent ? hContent : 'h-[400px]'}`}>
                    {content}
                </div>
            </div>
        </div>
    )
}