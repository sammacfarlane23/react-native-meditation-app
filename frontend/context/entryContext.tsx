import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:5001";

export interface Entry {
  date: string;
  duration: number;
  id: string;
  text?: string;
}

interface EntryContextType {
  entries: Entry[];
  addEntry: (entry: Entry) => void;
  updateEntry: (entry: Entry) => void;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
}

interface EntryContextProviderProps {
  children: React.ReactNode;
}

const EntryContext = createContext<EntryContextType>({
  entries: [],
  addEntry: () => {},
  updateEntry: () => {},
  removeEntry: () => {},
  clearEntries: () => {},
});

const EntryContextProvider = ({ children }: EntryContextProviderProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  // const { getItem, setItem } = useAsyncStorage("MEDITATION_APP::ENTRIES");

  const addEntry = (entry: Entry) => {
    // Post call to /entries endpoint
    fetch(`${API_URL}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    }).then((res) => {
      fetch(`${API_URL}/entries`).then((res) => {
        res.json().then((data) => {
          setEntries(data);
        });
      });
    });
    console.log({ entries });
  };

  const updateEntry = (entry: Entry) => {
    setEntries(
      entries.map((e) => {
        if (e.id === entry.id) {
          return entry;
        }
        return e;
      })
    );
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const clearEntries = () => {
    setEntries([]);
  };

  // const readItemFromStorage = async () => {
  //   const item = (await getItem()) || "[]";
  //   setEntries(JSON.parse(item));
  // };

  useEffect(() => {
    // readItemFromStorage();
    fetch(`${API_URL}/entries`).then((res) => {
      res.json().then((data) => {
        setEntries(data);
      });
    });
  }, []);

  // useEffect(() => {
  //   setItem(JSON.stringify(entries));
  // }, [entries]);

  return (
    <EntryContext.Provider
      value={{ entries, addEntry, updateEntry, removeEntry, clearEntries }}
    >
      {children}
    </EntryContext.Provider>
  );
};

const useEntries = () => useContext(EntryContext);

export { EntryContext, EntryContextProvider };

export default useEntries;
