import Link from "next/link";
import { useRecoilState } from "recoil";
import { logInState } from "../state/LogIn";
import { analyze, loading } from "../state/Analyze";
import { httpApi } from "src/api/http";
import { useMemo, useEffect, useState } from "react";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppInfo from "../components/Card/AppInfo";
import AppReview from "../components/Card/AppReview";
import SimilarApp from "../components/Card/SimilarApp";
import Layout from "../components/layout/Layout";
import { LoadingButton } from "@mui/lab";

export default function Home() {
  const [appName, setAppName] = useState("");
  const [country, setCountry] = useState("");
  const [isLogIn, setIsLogIn] = useRecoilState(logInState);
  const [analyzeResult, setAnalyzeResult] = useRecoilState(analyze); //appInfo에 들어갈내용
  const [isLoading, setIsLoading] = useRecoilState(loading);

  const menuData = useMemo(() => {
    if (isLogIn === null) return [];
    if (isLogIn) return MENU_LOGIN_STATE;
    return MENU;
  }, [isLogIn]);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogIn(true);
  }, [setIsLogIn]);

  //로그아웃
  const onClickLogout = () => {
    localStorage.removeItem("token");
    setIsLogIn(false);
  };

  const handleValue = (e) => {
    setAppName(e.target.value);
  };

  //분석하기
  const analyzeApp = async () => {
    const response = await httpApi.get("/job/appsearch", {
      params: {
        name: `${appName}`,
      },
    });
    const responseId = response.data.result;
    console.log("id 가져오기", responseId);

    setIsLoading(true);
    const res = await httpApi.post("/job/appinfo", {
      country: `${country}`,
      appId: responseId,
    });
    const result = res.data.result;
    console.log(res);
    console.log("타이틀", result.title);
    console.log("이미지", result.icon);
    setIsLoading(false);
    setAnalyzeResult({ result });
    console.log("결과", analyzeResult);
  };

  return (
    <>
      <Layout>
        {menuData.map(({ label, route }) => (
          <Link key={label} href={route}>
            {label === "로그아웃" ? (
              <Typography onClick={onClickLogout}>{label}</Typography>
            ) : (
              <Typography>{label}</Typography>
            )}
          </Link>
        ))}
        <Box sx={{ width: "800px", m: "0 auto" }}>
          <Box display="flex" marginTop="50px">
            <Select defaultValue="apple" sx={{ width: 95, mr: 3 }}>
              <MenuItem value="apple">Apple</MenuItem>
              <MenuItem value="google">Google</MenuItem>
            </Select>
            <Select
              value={country}
              defaultValue="kr"
              onChange={(e) => setCountry(e.target.value)}
              sx={{ width: 90 }}>
              <MenuItem value="kr">Korea</MenuItem>
              <MenuItem value="us">US</MenuItem>
            </Select>
            <TextField
              value={appName}
              fullWidth
              sx={{ ml: 3 }}
              onChange={handleValue}
              placeholder="분석하고 싶은 앱의 이름을 입력해주세요"></TextField>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              sx={{ width: 200, height: 60, ml: 3 }}>
              <Typography
                fontSize="20px"
                color="common.white"
                onClick={() => analyzeApp()}>
                분석하기
              </Typography>
            </LoadingButton>
          </Box>
        </Box>
        <Box width="630px" margin="0 auto">
          <Box display="flex" justifyContent="center" marginTop="50px"></Box>
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
      </Layout>
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
