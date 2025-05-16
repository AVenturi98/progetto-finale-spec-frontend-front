import * as React from 'react';

export default function BtnSwitch({
    category,
    setCategory,
    categories,
    selectedBtn,
    setSelectedBtn
}: {
    category: "travels" | "foods" | null,
    setCategory: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>,
    categories: string[],
    selectedBtn: "travels" | "foods" | null,
    setSelectedBtn: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>
}) {


    function handleSelectedBtn(e: string) {
        if (e === 'travels') {
            setCategory('travels');
            setSelectedBtn('travels')
            return
        } else if (e === 'foods') {
            setCategory('foods')
            setSelectedBtn('foods')
            return
        }
        return null
    }

    return (
        <div className="flex justify-around">
            {categories.map((e, i) =>
                <button
                    key={i}
                    type="button"
                    onClick={() => { console.log('E', e); return handleSelectedBtn(e) }}
                    className={`px-5 py-1 rounded-md bg-[#4973fc] hover:text-[#ffff00] hover:bg-[#0b43fa] hover:shadow-md shadow-[#4973fc] ${selectedBtn === category && category === e ? 'bg-[#fff000] border-2 border-[#0b43fa] text-[#0b43fa]' : 'bg-blue-500 text-[#ffff00]'}`}>
                    {e}
                </button>
            )}
        </div>
    )
}