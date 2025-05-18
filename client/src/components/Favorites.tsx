// Types
import type { Travel, Food, Favorites } from "../types/types";

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
    setSelectedBtn,
    setFilteredFoods
}: Favorites) {


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
                                    category={category}
                                    setFilteredFoods={setFilteredFoods}
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