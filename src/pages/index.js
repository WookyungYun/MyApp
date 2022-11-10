import Link from "next/link";
import { useRecoilState } from "recoil";
import { logInState } from "../state/LogIn";
import { useMemo, useEffect } from "react";
import { Typography } from "@mui/material";

export default function Home() {
  const [isLogIn, setIsLogIn] = useRecoilState(logInState);

  const menuData = useMemo(() => {
    if (isLogIn === null) return [];
    if (isLogIn) return MENU_LOGIN_STATE;
    return MENU;
  }, [isLogIn]);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogIn(true);
  }, [setIsLogIn]);

  const onClickLogout = () => {
    localStorage.removeItem("token");
    setIsLogIn(false);
  };

  return (
    <>
      {menuData.map(({ label, route }) => (
        <Link key={label} href={route}>
          {label === "로그아웃" ? (
            <Typography onClick={onClickLogout}>{label}</Typography>
          ) : (
            <Typography>{label}</Typography>
          )}
        </Link>
      ))}
    </>
  );
}

const MENU_LOGIN_STATE = [
  {
    label: "로그아웃",
    route: "/",
  },
  {
    label: "마이페이지",
    route: "/maypage",
  },
];

const MENU = [
  {
    label: "로그인",
    route: "/login",
  },
  {
    label: "회원가입",
    route: "/register",
  },
];
