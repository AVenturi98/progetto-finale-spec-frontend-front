import * as React from 'react';
const URL_API = import.meta.env.VITE_URL_API;

//Types 
import type { Travel, Base } from './types/types';

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

function App() {
  // Travels / Filtered travels
  const [travels, setTravels] = React.useState<Travel[] | null>(null);
  const [filteredTravels, setFilteredTravels] = React.useState<Travel[] | null>(null);

  // set Open Modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);


  // Show setting
  const [getIDs, setGetIDs] = React.useState<number | null>(null);
  const [record, setRecord] = React.useState<Travel | null>(null);

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
  const [favorites, setFavorites] = React.useState<Base[] | null>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : null;
  }); // localStoraga for favorites
  const [filteredFavorites, setFilteredFavorites] = React.useState<Base[] | null>(null);
  const [favoritesModal, setFavoritesModal] = React.useState<boolean>(false);

  // Pop-up setting
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const [addRemoved, setAddRemoved] = React.useState<'Aggiunto' | 'Rimosso'>('Aggiunto');


  // creo una funzione fetch per recuperare i records
  async function fetchURL(): Promise<Travel[]> {
    try {
      const res: Response = await fetch(URL_API);
      if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`)
      const data = await res.json();
      setTravels(data);
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Errore: ${err.message}`)
      } else {
        console.error(err)
      }
      return []
    }
  }

  React.useMemo(() => {
    fetchURL();
  }, [record, recordCompare]);



  // funzione per recuperare un singolo item
  async function getItem({ set, id }: { set: (travel: Travel) => void, id: number | null }): Promise<Travel | null> {
    try {
      const res = await fetch(`${URL_API}/${id}`);
      if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`)
      const data = await res.json();
      // console.log(data);
      set(data.travel)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Errore: ${err.message}`)
      } else {
        console.error(err)
      }
      return null
    }
  };


  React.useEffect(() => {
    openModal && getItem({ set: setRecord, id: getIDs });
    openCompare && getItem({ set: setRecordCompare, id: getIDCompare });
    openCompareSecond && getItem({ set: setRecordCompareSecond, id: getIDCompareSecond });
    openCompareThirty && getItem({ set: setRecordCompareThirty, id: getIDCompareThirty })
  }, [getIDs, getIDCompare, getIDCompareSecond, getIDCompareThirty]);



  // Add favorites elements
  function addFavorites(item: Base) {

    timing();

    setFavorites((prev: Base[] | null) => {

      if (!prev) {
        setAddRemoved('Aggiunto');
        return [item];
      }

      const idExist = prev.find(t => t.id === item.id);
      if (!idExist) {
        setAddRemoved('Aggiunto');
        return [...prev, item];
      } else {
        setAddRemoved('Rimosso');
        return prev.filter(t => t.id !== item.id);
      }
    });
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

        <aside className={`fixed right-0 bg-[#000000ef] text-white rounded-l-full h-screen flex items-center transition-all transition-discrete duration-500 ${openAside ? ' translate-0 xl:w-[30%]' : ' translate-100 w-0'}`}>
          <button
            type="button"
            className={`text-[#ffff00] bg-gray-500 hover:bg-gray-400 border-2 border-amber-100 py-1 px-2 rounded-md absolute top-50 right-10 ${openAside ? 'block' : 'hidden'}`}
            onClick={() => setOpenAside(false)}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <ul className='relative  text-center w-full'>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </aside>

        <div className='m-2'>
          <h1>Viaggia oltre meta</h1>

          {/* FORM SEARCH */}
          <Form
            setFilteredTravels={setFilteredTravels}
            travels={travels} />

          {/* RECORDS LIST */}
          <List
            filteredTravels={filteredTravels}
            travels={travels}
            setOpenModal={setOpenModal}
            setGetID={setGetIDs} />

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
            travels={travels}
            filteredTravels={filteredTravels}
            setFilteredTravels={setFilteredTravels}

            // Adding favorites item
            addFavorites={addFavorites}

            // Custom text btn add favorites
            favorites={favorites}
          />

        </div>

        {/* FAVORITES */}
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          favoritesModal={favoritesModal}
          setFavoritesModal={setFavoritesModal}
          filteredFavorites={filteredFavorites}
          setFilteredFavorites={setFilteredFavorites}
          setOpenModal={setOpenModal}
          setGetIDs={setGetIDs}
          timing={timing}
          setAddRemoved={setAddRemoved}
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
