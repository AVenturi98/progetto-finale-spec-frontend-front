import React, { createContext } from "react";
const URL_API = import.meta.env.VITE_URL_API;

// Types
import type { Travel } from "../types/types";

// tipo di contenuto che viene esportato
type ContextValues = {
    getIDs,
    setGetIDs,
    record: Travel | null,
    setRecord: () => void,
    getItem: () => void
}

// creo un context tipizzato 
const GlobalContext = createContext<ContextValues | null>(null);

// tipizzo le props children del context
type ContextProps = {
    children: React.ReactNode
}

export function GlobalProvider({ children }: ContextProps) {

    // Show setting
    const [getIDs, setGetIDs] = React.useState<number | null>(null);
    const [record, setRecord] = React.useState<Travel | null>(null);

    async function getItem(): Promise<Travel | null> {
        try {
            const res = await fetch(`${URL_API}/${getIDs}`);
            if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`)
            const data = await res.json();
            // console.log(data);
            setRecord(data.travel)
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

    return (
        <GlobalContext.Provider value={{
            getIDs,
            setGetIDs,
            record,
            setRecord,
            getItem
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext