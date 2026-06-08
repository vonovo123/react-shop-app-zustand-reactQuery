import { useUserStore } from "../store/user/user.store";
export function useAuth() {
  const {user} = useUserStore();
  return {
    isAuth: !!user.email,
    email: user.email,
    token: user.token,
    id: user.id,
  };
}
