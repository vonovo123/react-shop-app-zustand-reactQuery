import { useAppSelector } from "./reduct";

export function useAuth() {
  const { email, token, id } = useAppSelector((state) => state.userSlice);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
