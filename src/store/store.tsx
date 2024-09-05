import { create } from 'zustand'

export const globalStore = create((set) => ({
    fillWithSideBar: false,
    setFillWithSideBar: (fillWithSideBar: boolean) => set({ fillWithSideBar }),
}))