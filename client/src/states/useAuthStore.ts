import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

type TState = {};

type TAction = {};

const useAuthStore = create<TState & TAction>()(immer(devtools(set => ({}))));

export default useAuthStore;
