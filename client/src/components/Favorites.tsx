// Types
import type { Travel, Food, Base } from "../types/types";

// Components
import Modal from "./Modal";
import List from "./List";
import Form from "./Form";
import BtnSwitch from "./BtnSwitch";

export default function Favorites({
    favorites,
    setFavorites,
    favoritesModal,
    setFavoritesModal,
    filteredFavorites,
    setFilteredFavorites,
    setOpenModal,
    setGetIDs,
    setGetIDFoods,
    timing,
    setAddRemoved,
    category,
    setCategory,
    setFavoritesFoods,
    categories,
    selectedBtn,
    setSelectedBtn
}: {
    favorites: Travel[] | Food[] | null,
    setFavorites: React.Dispatch<React.SetStateAction<Travel[] | null>>,
    favoritesModal: boolean,
    setFavoritesModal: React.Dispatch<React.SetStateAction<boolean>>,
    filteredFavorites: Base[] | null,
    setFilteredFavorites: React.Dispatch<React.SetStateAction<Travel[] | Food[] | null>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setGetIDs: React.Dispatch<React.SetStateAction<number | null>>,
    setGetIDFoods: React.Dispatch<React.SetStateAction<number | null>>, // get id foods
    timing: () => void,
    setAddRemoved: React.Dispatch<React.SetStateAction<"Rimosso" | "Aggiunto">>,
    category: "travels" | "foods" | null,
    setCategory: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>,
    setFavoritesFoods: React.Dispatch<React.SetStateAction<Food[] | null>>,
    categories: string[],
    selectedBtn: "travels" | "foods" | null,
    setSelectedBtn: React.Dispatch<React.SetStateAction<"travels" | "foods" | null>>
}) {


    return (
        <section>
            <Modal
                isOpen={favoritesModal}
                title={'PREFERITI'}
                content={
                    <>
                        <BtnSwitch
                            category={category}
                            setCategory={setCategory}
                            selectedBtn={selectedBtn}
                            setSelectedBtn={setSelectedBtn}
                            categories={categories}

                        />
                        {favorites && favorites.length > 0 ? (
                            <>
                                <Form
                                    // form search
                                    setFilteredTravels={setFilteredFavorites}
                                    travels={favorites as unknown as Travel[] | Food[]}
                                />
                                <List
                                    filteredTravels={filteredFavorites as unknown as Travel[] | Food[] | null}
                                    travels={[...favorites] as unknown as Travel[] | Food[] | null}
                                    setOpenModal={setOpenModal}
                                    setGetID={setGetIDs}
                                    setGetIDFoods={setGetIDFoods}
                                    gridCols={'grid-cols-1'}
                                    onDelete={true}
                                    setDeleted={(updatedFavorites) => {
                                        timing();
                                        setAddRemoved('Rimosso');

                                        if (category === 'travels') {
                                            setFavorites(updatedFavorites as Travel[] | null);
                                        } else {
                                            setFavoritesFoods(updatedFavorites as Food[] | null);
                                        }
                                    }}
                                    category={category}
                                />
                            </>
                        ) : (
                            <div className='flex justify-center items-center'>
                                Nessun elemento tra i Preferiti
                            </div>
                        )}
                    </>
                }
                onClose={() => setFavoritesModal(false)}
            />

        </section>
    )
}