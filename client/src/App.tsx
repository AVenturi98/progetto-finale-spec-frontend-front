import * as React from 'react';
const URL_API = import.meta.env.VITE_URL_API;

//Types 
import type { Travel, Base } from './types/types';

// Components
import Form from './components/Form';
import List from './components/List';
import SettingModals from './components/SettingModals';
import Modal from './components/Modal';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [travels, setTravels] = React.useState<Travel[] | null>(null);
  const [filteredTravels, setFilteredTravels] = React.useState<Travel[] | null>(null);

  // set Open Modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);


  // Show setting
  const [getIDs, setGetIDs] = React.useState<number | null>(null);
  const [record, setRecord] = React.useState<Travel | null>(null);

  // Comparison setting
  const [openCompare, setOpenCompare] = React.useState<boolean>(false);
  const [recordCompare, setRecordCompare] = React.useState<Travel | null>(null);
  const [getIDCompare, setGetIDCompare] = React.useState<number | null>(null);

  // Favorites setting
  const [favorites, setFavorites] = React.useState<Base[] | null>(null);
  const [filteredFavorites, setFilteredFavorites] = React.useState<Base[] | null>(null);
  const exists = favorites?.find(t => t.id === record?.id || t.id === recordCompare?.id);
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

  React.useEffect(() => {
    fetchURL();
  }, [record, recordCompare]);




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
    openCompare && getItem({ set: setRecordCompare, id: getIDCompare })
  }, [getIDs, getIDCompare]);



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

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (popUp) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [popUp]);


  return (
    <>
      <header className='bg-[#4973fc] shadow-2xl shadow-amber-300'>
        <nav className='mb-3 md:mb-12 p-3 cursor-context-menu mx-20 py-5'>
          <FontAwesomeIcon icon={faPlaneDeparture} size='2xl' style={{ color: '#ffffff', }} />
        </nav>
      </header>

      <main className='flex flex-col gap-10 cursor-context-menu'>
        <div className='m-2'>
          <h1>Viaggia oltre meta</h1>

          {/* FORM SEARCH */}
          <Form
            // form search
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
            openModal={openModal}
            setOpenModal={setOpenModal}
            openCompare={openCompare}
            setOpenCompare={setOpenCompare}
            record={record}
            recordCompare={recordCompare}
            setRecord={setRecord}
            setRecordCompare={setRecordCompare}
            filteredTravels={filteredTravels}
            setFilteredTravels={setFilteredTravels}
            travels={travels}
            setGetIDs={setGetIDs}
            setGetIDCompare={setGetIDCompare}
            adding={() => {
              if (record && record.id !== undefined) {
                addFavorites({ id: record.id, title: record.title, category: record.category, start: record.start });
              } else if (recordCompare && recordCompare.id !== undefined) {
                addFavorites({ id: recordCompare.id, title: recordCompare.title, category: recordCompare.category, start: recordCompare.start });
              }
            }}
            textBtnFavorite={`${exists ? 'Rimuovi dai' : 'Aggiungi ai'} preferiti`} />

        </div>

        {/* FAVORITES */}
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

        {/* BUTTONS */}
        <section className='fixed bottom-20 md:bottom-10 right-10 sm:right-20 xl:right-50 z-99'>
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

        {isVisible &&
          <aside
            className={`absolute top-5 z-99 transition-all duration-500 ease-in-out ${isVisible && popUp ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-90 -translate-y-5 invisible'}`}>
            <div className={`${addRemoved === 'Aggiunto' ? 'bg-green-400' : 'bg-red-400'} text-white font-bold h-[50px] w-[300px] rounded-md px-3 py-2 flex items-center justify-center`}>
              {addRemoved === 'Aggiunto' ? addRemoved + ' ai' : addRemoved + ' dai'} preferiti
            </div>
          </aside>
        }
      </main>
    </>
  )
}

export default App
