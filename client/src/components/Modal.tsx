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
            className={`text-black  ${isStatic ? '' : 'fixed w-full h-screen inset-0 bg-[#181818] '} flex items-center justify-around transition-opacity duration-500 z-55 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div
                className={`bg-white rounded-lg shadow-lg p-5 transform transition-transform duration-500 ${isOpen ? 'scale-100' : 'scale-90'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="w-full text-center font-bold">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-red-500 hover:text-black">
                        ✕
                    </button>
                </div>
                <div className={`overflow-y-auto overflow-x-hidden ${hContent ? hContent : 'h-[400px]'}`}>{content}</div>
            </div>
        </div>
    )
}