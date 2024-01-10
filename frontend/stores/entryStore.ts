import { create } from "zustand";

import { Entry } from "../context/entryContext";

const API_URL = "http://localhost:5001";

interface EntryState {
  entries: Entry[];
  getAllEntries: () => Promise<void>;
  addEntry: (entry: Entry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  updateEntry: (id: string, updatedText: string) => Promise<void>;
}

const useEntryStore = create<EntryState>()((set) => ({
    entries: [],
    getAllEntries: async () => {
        // @TODO: Implement superagent
        const response = await fetch(`${API_URL}/entries`);
        set({ entries: await response.json() });
    },
    addEntry: async (entry) => {
        await fetch(`${API_URL}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
        });
    },
    // TODO: Debug this and implement global error handling
    deleteEntry: async (id) => {
        const response = await fetch(`${API_URL}/entries/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log({response})
    },
    updateEntry: async (id, updatedText) => {
        await fetch(`${API_URL}/entries/:${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({text: updatedText}),
        });
    },
}));

export default useEntryStore;
