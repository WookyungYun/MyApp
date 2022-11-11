import Link from "next/link";
import { useRecoilState } from "recoil";
import { logInState } from "../state/LogIn";
import { analyze } from "../state/Analyze";
import { httpApi } from "src/api/http";
import { useMemo, useEffect } from "react";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import AppInfo from "../components/Card/AppInfo";
import AppReview from "../components/Card/AppReview";
import SimilarApp from "../components/Card/SimilarApp";

export default function Home() {
  const [isLogIn, setIsLogIn] = useRecoilState(logInState);
  const [analyzeResult, setAnalyzeResult] = useRecoilState(analyze);

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

  const getId = async () => {
    const result = await httpApi.get("/job/appsearch");
    const list = await result.json();
    console.log(result);
    console.log(list);
    //가져온거 성공하면 alert 띄우기
  };

  const analyzeApp = async () => {
    const result = await httpApi.post("/job/appinfo", {
      country: "kr",
      appId: "896515652",
    });
    console.log(result);
    setAnalyzeResult(result.data);
    console.log(result.data.icon);
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
      <Box maxWidth="630px" margin="auto" marginTop="70px">
        <Select defaultValue="korea" sx={{ width: 90 }}>
          <MenuItem value="korea">Korea</MenuItem>
          <MenuItem value="us">US</MenuItem>
        </Select>
        <TextField
          sx={{ width: 500, ml: 3 }}
          placeholder="분석하고 싶은 앱의 이름을 입력해주세요"></TextField>
        <Box margin="auto" marginTop="70px" marginLeft="85px">
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ width: 200, height: 60, marginRight: 10 }}>
            <Typography fontSize="20px" color="common.white" onClick={getId}>
              앱ID가져오기
            </Typography>
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ width: 200, height: 60 }}>
            <Typography
              fontSize="20px"
              color="common.white"
              onClick={analyzeApp}>
              분석하기
            </Typography>
          </LoadingButton>
        </Box>
      </Box>
      {analyzeResult.length !== 0 && isLogIn && (
        <>
          <Box maxWidth="800px" margin="auto" marginTop="60px">
            <AppInfo />
            <AppReview />
            <SimilarApp />
          </Box>
        </>
      )}
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
    route: "/mypage",
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
