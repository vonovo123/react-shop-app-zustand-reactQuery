import {create} from "zustand";
import { persist } from "zustand/middleware";

export interface UserStore {
  user:{
    email: string;
    token: string;
    id: string;
  };
  setUser: (user: {email: string, token: string, id: string}) => void;
  removeUser: () => void;
}

// export const useUserStore = create<UserStore>((set) => ({
//   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) :
//   {
//     email: "",
//     token: "",
//     id: "",
//   },
//   setUser: (user) => {
//     localStorage.setItem("user",JSON.stringify(user))
//     set({ user })
//   },
//   removeUser: () => {
//     set({ user: { email: "", token: "", id: "" } });
//     localStorage.removeItem("user");
//   }
// }));

export const useUserStore = create<UserStore>()(
  persist((set) => ({
    user:{email: "", token: "", id: ""},
    setUser: (user) => set({user}),
    removeUser: () => set({user:{email: "", token: "", id: ""}}),
  }),
  {
    name: "user",
    partialize: (state) => ({user: state.user}),
  }
))