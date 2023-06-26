import {create} from 'zustand';

interface MinonState {
	minon: number;
	increase: (by: number) => void;
	decrease: (by: number) => void;
}

export const MinonStore = create<MinonState>()((set) => ({
	minon: 0,
	increase: (by) => set((state) => ({minon: state.minon + by})),
	decrease: (by) => set((state) => ({minon: state.minon === 0 ? (state.minon = 0) : state.minon - by})),
}));
