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




  async function getItem({ set }: { set: (travel: Travel) => void }): Promise<Travel | null> {
    try {
      const res = await fetch(`${URL_API}/${getIDs}`);
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
    openModal && getItem({ set: setRecord });
    openCompare && getItem({ set: setRecordCompare })
  }, [getIDs, getIDCompare, favorites]);




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
            openCompare={openCompare}
            record={record}
            setOpenModal={setOpenModal}
            setFilteredTravels={setFilteredTravels}
            travels={travels}
            setGetIDs={setGetIDs}
            filteredTravels={filteredTravels}
            setOpenCompare={setOpenCompare}
            recordCompare={recordCompare}
            setGetIDCompare={setGetIDCompare}
            setFavorites={setFavorites}
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
                  setDeleted={setFavorites} />
              </>
              :
              <div className='flex justify-center items-center'>
                Nessun elemento tra i Preferiti
              </div>}
            onClose={() => setFavoritesModal(false)}
          />

        </section>

        {/* BUTTONS */}
        <section className='fixed bottom-20 md:bottom-40 right-10 sm:right-20 xl:right-50 z-99'>
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
      </main>
    </>
  )
}

export default App
