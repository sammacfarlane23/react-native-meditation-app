import { create } from 'zustand'
import superagent from 'superagent'

import type Entry from '../types/entry'

const API_URL = 'http://localhost:5001'

interface EntryState {
  entries: Entry[]
  error: string
  loading: boolean
  getAllEntries: () => Promise<void>
  addEntry: (entry: Entry) => Promise<void>
  deleteEntry: (id: string) => Promise<void>
  updateEntry: (id: string, updatedEntry: { text: string }) => Promise<void>
}

const useEntryStore = create<EntryState>()((set) => ({
  entries: [],
  error: '',
  loading: false,
  getAllEntries: async () => {
    set({ loading: true, error: '' })
    try {
      const response = await superagent.get(`${API_URL}/entries`)
      set({ entries: response.body })
    } catch (err) {
      set({ error: 'Uh oh! An unexpected error occured.' })
    } finally {
      set({ loading: false })
    }
  },
  addEntry: async (entry) => {
    try {
      await superagent.post(`${API_URL}/entries`).send(entry)
    } catch (err) {
      set({ error: 'Uh oh! An unexpected error occured.' })
    }
  },
  deleteEntry: async (id) => {
    try {
      await superagent.delete(`${API_URL}/entries/${id}`)
    } catch (err) {
      set({ error: 'Uh oh! An unexpected error occured.' })
    }
  },
  // @TODO: Implement implement superagent and test
  updateEntry: async (id, updatedEntry: Entry) => {
    // await fetch(`${API_URL}/entries/:${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ text: updatedEntry.text })
    // })
    try {
      await superagent.put(`${API_URL}/entries/${id}`).send(updatedEntry)
    } catch (err) {
      set({ error: 'Uh oh! An unexpected error occured.' })
    }
  }
}))

export default useEntryStore
