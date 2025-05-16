import * as React from 'react';
const URL_API = import.meta.env.VITE_URL_API;

//Types 
import type { Travel, Food } from './types/types';

// Components
import Form from './components/Form';
import List from './components/List';
import SettingModals from './components/SettingModals';
import PopUp from './components/PopUp';
import BtnsFixed from './components/BtnsFixed';
import Favorites from './components/Favorites';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faBars, faX } from '@fortawesome/free-solid-svg-icons';


type Props<T> = {
  URL_fetch: string,
  set: React.Dispatch<React.SetStateAction<T[] | null>>,
  id?: number | null
};

type ResponseData = {
  URL_fetch: string,
  set: React.Dispatch<React.SetStateAction<Travel | Food | null>>,
  id?: number | null
};


const categories = ['travels', 'foods'];

function App() {

  //Category setting
  const [category, setCategory] = React.useState<'travels' | 'foods' | null>(null);

  // Travels / Filtered travels
  const [travels, setTravels] = React.useState<Travel[] | null>(null);
  const [filteredTravels, setFilteredTravels] = React.useState<Travel[] | null>(null);

  // Foods / Filtered foods
  const [foods, setFoods] = React.useState<Food[] | null>(null);
  const [filteredFoods, setFilteredFoods] = React.useState<Food[] | null>(null);

  // set Open Modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);


  // Show setting
  const [getIDs, setGetIDs] = React.useState<number | null>(null); // get  ID travels
  const [record, setRecord] = React.useState<Travel | Food | null>(null);

  const [getIDFoods, setGetIDFoods] = React.useState<number | null>(null); // get ID foods

  // COMPARISON 
  // Comparison setting first
  const [openCompare, setOpenCompare] = React.useState<boolean>(false);
  const [recordCompare, setRecordCompare] = React.useState<Travel | null>(null);
  const [getIDCompare, setGetIDCompare] = React.useState<number | null>(null);

  // Comparison setting second
  const [openCompareSecond, setOpenCompareSecond] = React.useState<boolean>(false);
  const [recordCompareSecond, setRecordCompareSecond] = React.useState<Travel | null>(null);
  const [getIDCompareSecond, setGetIDCompareSecond] = React.useState<number | null>(null);

  // Comparison setting thirty
  const [openCompareThirty, setOpenCompareThirty] = React.useState<boolean>(false);
  const [recordCompareThirty, setRecordCompareThirty] = React.useState<Travel | null>(null);
  const [getIDCompareThirty, setGetIDCompareThirty] = React.useState<number | null>(null);

  // Favorites setting
  const [favorites, setFavorites] = React.useState<Travel[] | null>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : null;
  }); // localStoraga for favorites
  const [filteredFavorites, setFilteredFavorites] = React.useState<Travel[] | Food[] | null>(null);
  const [favoritesModal, setFavoritesModal] = React.useState<boolean>(false);


  // Favorites Foods 
  const [favoritesFoods, setFavoritesFoods] = React.useState<Food[] | null>(null);

  // Pop-up setting
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const [addRemoved, setAddRemoved] = React.useState<'Aggiunto' | 'Rimosso'>('Aggiunto');

  // BtnSwitch setting
  const [selectedBtn, setSelectedBtn] = React.useState<"travels" | "foods" | null>(null);



  // creo una funzione fetch per recuperare i records
  async function fetchURL<T>({ URL_fetch, set }: Props<T>): Promise<T[] | null> {
    try {
      const res: Response = await fetch(URL_fetch);
      if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`);
      const data: T[] = await res.json();
      set(data);
      console.log(data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Errore: ${err.message}`);
      } else {
        console.error(err);
      }
      return [];
    }
  }

  React.useEffect(() => {
    if (category === 'travels') {
      fetchURL<Travel>({ URL_fetch: `${URL_API}travels`, set: setTravels });
    } else if (category === 'foods') {
      fetchURL<Food>({ URL_fetch: `${URL_API}foods`, set: setFoods });
    }

  }, [category]);



  // funzione per recuperare un singolo item
  async function getItem({ URL_fetch, set, id }: ResponseData): Promise<Travel | Food | null> {
    try {
      const res = await fetch(`${URL_fetch}${category}/${id}`);
      if (!res.ok) throw new Error(`Errore: ${res.status} ${res.statusText}`);

      const data: { travel?: Travel; food?: Food } = await res.json();

      const result = data.travel ?? data.food ?? null;

      set(result);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Errore: ${err.message}`);
      } else {
        console.error(err);
      }
      return null;
    }
  }


  React.useEffect(() => {
    openModal && category === 'travels' && getItem({ URL_fetch: URL_API, set: setRecord, id: getIDs });
    openModal && category === 'foods' && getItem({ URL_fetch: URL_API, set: setRecord, id: getIDFoods });

    // openCompare && getItem({ set: setRecordCompare, id: getIDCompare });
    // openCompareSecond && getItem({ set: setRecordCompareSecond, id: getIDCompareSecond });
    // openCompareThirty && getItem({ set: setRecordCompareThirty, id: getIDCompareThirty })
  }, [getIDs, getIDFoods, getIDCompare, getIDCompareSecond, getIDCompareThirty]);//



  // Add favorites elements
  function addFavorites(item: Travel | Food) {
    timing();

    if (category === 'travels') {
      setFavorites((prev: Travel[] | null) => {
        if (!prev) {
          setAddRemoved('Aggiunto');
          return [item as Travel];
        }

        const exists = prev.some(t => t.id === item.id);

        if (!exists) {
          setAddRemoved('Aggiunto');
          return [...prev, item as Travel];
        } else {
          setAddRemoved('Rimosso');
          return prev.filter(t => t.id !== item.id);
        }
      });
    }

    if (category === 'foods') {
      setFavoritesFoods((prev: Food[] | null) => {
        if (!prev) {
          setAddRemoved('Aggiunto');
          return [item as Food];
        }

        const exists = prev.some(t => t.id === item.id);

        if (!exists) {
          setAddRemoved('Aggiunto');
          return [...prev, item as Food];
        } else {
          setAddRemoved('Rimosso');
          return prev.filter(t => t.id !== item.id);
        }
      });
    }
  }

  // Effect for localStorage by favorites
  React.useMemo(() => {
    localStorage.setItem('favorites', favorites ? JSON.stringify(favorites) : '[]')
  }, [favorites])

  // Setting visibility Pop-up
  const timing = () => {
    let timer;
    clearTimeout(timer);
    setTimeout(() => {
      setPopUp(true)
      setTimeout(() => {
        clearTimeout(timer);
        setPopUp(false)
      }, 1200)
    }, 100)
  }

  // Pop-up setting
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (popUp) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [popUp]);


  const [openAside, setOpenAside] = React.useState<boolean>(false);

  console.log(category)
  return (
    <>
      <header className='bg-[#4973fc] shadow-2xl shadow-amber-300'>
        <nav className='mb-3 md:mb-12 p-3 cursor-context-menu mx-20 py-5 flex justify-around'>
          <FontAwesomeIcon icon={faPlaneDeparture} size='2xl' style={{ color: '#ffffff', }} />
          <button
            type="button"
            onClick={() => {
              if (openAside) setOpenAside(false)
              else setOpenAside(true)
            }}>
            <FontAwesomeIcon
              icon={faBars}
              size='2xl'
              style={{ color: !openAside ? '#ffffff' : '#ffff00', }} />
          </button>
        </nav>
      </header>

      <main className='flex flex-col gap-10 cursor-context-menu'>


        <aside className={`fixed top-0.5 right-0 bg-[#000000ef] text-white rounded-l-full h-screen flex items-center transition-all transition-discrete duration-500 ${openAside ? ' translate-0 xl:w-[30%]' : ' translate-100 w-0'}`}>
          <button
            type="button"
            className={`text-[#ffff00] bg-gray-500 hover:bg-gray-400 border-2 border-amber-100 py-1 px-2 rounded-md absolute top-50 right-10 ${openAside ? 'block' : 'hidden'}`}
            onClick={() => setOpenAside(false)}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <ul className='relative  text-center w-full'>
            {categories.map((e, i) =>
              <li key={i} value={e}>
                <button
                  type="button"
                  onClick={() => {
                    if (e === 'travels') {
                      console.log('E', e)
                      setOpenAside(false);
                      setSelectedBtn('travels');
                      return setCategory('travels')
                    } else if (e === 'foods') {
                      setOpenAside(false);
                      setSelectedBtn('foods');
                      return setCategory('foods')
                    }
                  }}
                  className={` hover:text-blue-500 ${category === e ? 'text-blue-400 underline' : 'text-yellow-400'}`}>
                  {e === 'travels' ? 'VIAGGI' : 'ALIMENTI'}
                </button>
              </li>
            )}
          </ul>
        </aside>

        <div className='m-2'>
          <h1>Viaggia oltre meta</h1>



          {/* FORM SEARCH */}
          <Form
            setFilteredTravels={setFilteredTravels}
            travels={category === 'travels' ? travels : category === 'foods' ? foods : null}
            category={category}
            setFilteredFoods={setFilteredFoods} />

          {/* RECORDS LIST */}
          <List
            filteredTravels={category === 'travels' ? filteredTravels : category === 'foods' ? filteredFoods : null}
            travels={category === 'travels' ? travels : category === 'foods' ? foods : null}
            setOpenModal={setOpenModal}
            setGetID={setGetIDs}
            category={category}
            setGetIDFoods={setGetIDFoods}

          />

          {/* SETTING MODALS */}
          <SettingModals
            // Modal settings 
            // --open modal--
            openModal={openModal}
            setOpenModal={setOpenModal}
            // --item modal--
            record={record}
            setRecord={setRecord}
            // --get ID item modal--
            getIDs={getIDs}
            setGetIDs={setGetIDs}

            getIDFoods={getIDFoods} // get id food
            setGetIDFoods={setGetIDFoods} // get id food
            // Comparison settings compare
            // --open modal compare--
            openCompare={openCompare}
            setOpenCompare={setOpenCompare}
            // --item compare--
            recordCompare={recordCompare}
            setRecordCompare={setRecordCompare}
            // --get ID item compare--
            getIDCompare={getIDCompare}
            setGetIDCompare={setGetIDCompare}

            // Comparison settings compare Second
            // --open modal compare second--
            openCompareSecond={openCompareSecond}
            setOpenCompareSecond={setOpenCompareSecond}
            // --item compare second--
            recordCompareSecond={recordCompareSecond}
            setRecordCompareSecond={setRecordCompareSecond}
            // --get ID item compare second--
            getIDCompareSecond={getIDCompareSecond}
            setGetIDCompareSecond={setGetIDCompareSecond}

            // Comparison settings compare Thirty
            // --open modal compare second--
            openCompareThirty={openCompareThirty}
            setOpenCompareThirty={setOpenCompareThirty}
            // --item compare second-
            recordCompareThirty={recordCompareThirty}
            setRecordCompareThirty={setRecordCompareThirty}
            getIDCompareThirty={getIDCompareThirty}
            // --get ID item compare second--
            setGetIDCompareThirty={setGetIDCompareThirty}

            // Travels / Filtered travels
            travels={category === 'travels' ? travels : category === 'foods' ? foods : null}
            filteredTravels={filteredTravels}
            setFilteredTravels={setFilteredTravels}

            // Adding favorites item
            addFavorites={addFavorites}

            // Custom text btn add favorites
            favorites={favorites}

            category={category}
          />

        </div>

        {/* FAVORITES */}
        <Favorites
          favorites={category === 'travels' ? favorites : favoritesFoods}
          setFavorites={setFavorites}
          favoritesModal={favoritesModal}
          setFavoritesModal={setFavoritesModal}
          filteredFavorites={filteredFavorites}
          setFilteredFavorites={setFilteredFavorites}
          setOpenModal={setOpenModal}
          setGetIDs={setGetIDs}
          timing={timing}
          setAddRemoved={setAddRemoved}
          category={category}
          setCategory={setCategory}
          setGetIDFoods={setGetIDFoods}
          setFavoritesFoods={setFavoritesFoods}
          categories={categories}
          selectedBtn={selectedBtn}
          setSelectedBtn={setSelectedBtn}
        />

        {/* BUTTONS */}
        <BtnsFixed setFavoritesModal={setFavoritesModal} />

        {/* POP UP */}
        <PopUp
          isVisible={isVisible}
          popUp={popUp}
          addRemoved={addRemoved} />

      </main>
    </>
  )
}

export default App
