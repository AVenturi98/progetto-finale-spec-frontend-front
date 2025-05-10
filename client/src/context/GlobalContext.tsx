import React, { createContext } from "react";
const URL_API = import.meta.env.VITE_URL_API;

// Types
import type { Travel } from "../types/types";

// tipo di contenuto che viene esportato
type ContextURL = {
    URL_API: string,
    fetchURL: (url: string) => Promise<Travel[]>
}

// creo un context tipizzato 
const GlobalContext = createContext<ContextURL | null>(null);

// tipizzo le props children del context
type ContextProps = {
    children: React.ReactNode
}

export function GlobalProvider({ children }: ContextProps) {

    // creo una funzione fetch per recuperare il contenuto sotto formato json e utilizzarlo in tutto il progetto
    async function fetchURL(url: string): Promise<Travel[]> {
        try {
            const res: Response = await fetch(url);
            if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`)
            const data = await res.json();
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

    return (
        <GlobalContext.Provider value={{ URL_API, fetchURL }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext