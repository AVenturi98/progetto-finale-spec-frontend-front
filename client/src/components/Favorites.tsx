// Types
import type { Travel, Base } from "../types/types";

// Components
import Modal from "./Modal";
import List from "./List";
import Form from "./Form";

export default function Favorites({
    favorites,
    setFavorites,
    favoritesModal,
    setFavoritesModal,
    filteredFavorites,
    setFilteredFavorites,
    setOpenModal,
    setGetIDs,
    timing,
    setAddRemoved
}: {
    favorites: Base[] | null,
    setFavorites: React.Dispatch<React.SetStateAction<Base[] | null>>,
    favoritesModal: boolean,
    setFavoritesModal: React.Dispatch<React.SetStateAction<boolean>>,
    filteredFavorites: Base[] | null,
    setFilteredFavorites: React.Dispatch<React.SetStateAction<Base[] | null>>
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>
    timing: () => void,
    setAddRemoved: React.Dispatch<React.SetStateAction<"Rimosso" | "Aggiunto">>
}) {

    return (
        <section>
            <Modal
                isOpen={favoritesModal}
                title={'PREFERITI'}
                content={favorites && favorites.length > 0 ?
                    <>
                        <Form
                            // form search
                            setFilteredTravels={setFilteredFavorites}
                            travels={favorites as unknown as Travel[]} />
                        <List
                            filteredTravels={filteredFavorites as unknown as Travel[] | null}
                            travels={[...favorites] as unknown as Travel[] | null}
                            setOpenModal={setOpenModal}
                            setGetID={setGetIDs}
                            gridCols={'grid-cols-1'}
                            onDelete={true}
                            setDeleted={(updatedFavorites) => {
                                timing()
                                setAddRemoved('Rimosso');
                                return setFavorites(updatedFavorites);
                            }} />
                    </>
                    :
                    <div className='flex justify-center items-center'>
                        Nessun elemento tra i Preferiti
                    </div>}
                onClose={() => setFavoritesModal(false)}
            />

        </section>
    )
}