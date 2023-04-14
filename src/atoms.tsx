import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState[]>({
  key: "toDo",
  default: [{ "To do": [] }, { Doing: [] }, { Done: [] }],

  // effects_UNSTABLE: [persistAtom],
});
