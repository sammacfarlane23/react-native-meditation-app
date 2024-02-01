import { create } from 'zustand'
import superagent, { type Response } from 'superagent'

import type Entry from '../types/entry'

const API_URL = 'http://localhost:5001'

interface EntryState {
  entries: Entry[]
  error: string
  loading: boolean
  getAllEntries: () => Promise<void>
  addEntry: (entry: Entry) => Promise<Response | undefined>
  deleteEntry: (id: string) => Promise<Response | undefined>
  updateEntry: (id: string, updatedEntry: { text: string }) => Promise<Response | undefined>
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
      const response = await superagent.post(`${API_URL}/entries`).send(entry)
      return response
    } catch (err) {
      set({ error: 'Uh oh! An unexpected error occured. Please try that again.' })
    }
  },
  deleteEntry: async (id) => {
    try {
      const response = await superagent.delete(`${API_URL}/entries/${id}`)
      return response
    } catch (err) {
      set({ error: 'Uh oh! An unexpected error occured. Please try that again.' })
    }
  },
  updateEntry: async (id, updatedEntry: { text: string }) => {
    try {
      const response = await superagent.put(`${API_URL}/entries/${id}`).send(updatedEntry)
      return response
    } catch (err) {
      set({ error: 'Uh oh! An unexpected error occured. Please try that again.' })
    }
  }
}))

export default useEntryStore
