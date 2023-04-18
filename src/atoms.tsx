import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export type BoardKey = "card" | "board";

export const BoardType = atom<BoardKey>({
  key: "boardType",
  default: "card",
});

export const toDoState = atom<IToDoState[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
