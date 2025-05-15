import type { SetStateAction } from "react";

export default function BtnsFixed({ setFavoritesModal }: { setFavoritesModal: React.Dispatch<SetStateAction<boolean>> }) {

    return (
        <section className='fixed bottom-20 md:bottom-10 xl:bottom-30 right-10 sm:right-20 xl:right-50 z-99'>
            <div className='flex flex-col items-center gap-2'>
                <button
                    type="button"
                    onClick={() => setFavoritesModal(true)}
                    className='rounded-full min-h-[40px] min-w-[40px] bg-[#4973fc] text-[#ffff00] hover:bg-[#0b43fa] hover:shadow-md shadow-[#4973fc]'>
                    ♥
                </button>
                <button
                    type="button"
                    className='rounded-full min-h-[40px] min-w-[40px] bg-[#4973fc] text-[#ffff00] hover:bg-[#0b43fa] hover:shadow-md shadow-[#4973fc]'>
                    +
                </button>
            </div>
        </section>
    )
}