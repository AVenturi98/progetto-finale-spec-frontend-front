export default function PopUp({
    isVisible,
    popUp,
    addRemoved
}: {
    isVisible: boolean,
    popUp: boolean,
    addRemoved: 'Aggiunto' | 'Rimosso'
}) {

    return (
        <>
            {isVisible &&
                <aside
                    className={`absolute top-5 z-99 transition-all duration-500 ease-in-out ${isVisible && popUp ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-90 -translate-y-5 invisible'}`}>
                    <div className={`${addRemoved === 'Aggiunto' ? 'bg-green-400' : 'bg-red-400'} text-white font-bold h-[50px] w-[300px] rounded-md px-3 py-2 flex items-center justify-center`}>
                        {addRemoved === 'Aggiunto' ? addRemoved + ' ai' : addRemoved + ' dai'} preferiti
                    </div>
                </aside>
            }
        </>
    )
}