import Link from "next/link";
import { useRecoilState } from "recoil";
import { logInState } from "../state/LogIn";
import {
  analyze,
  appId,
  loading,
  selectCountry,
  similarInfo,
} from "../state/Analyze";
import { httpApi } from "src/api/http";
import { useMemo, useEffect, useState } from "react";
import { Card, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppInfo from "../components/Card/AppInfo";
import AppReview from "../components/Card/AppReview";
import SimilarApp from "../components/Card/SimilarApp";
import Layout from "../components/layout/Layout";
import { LoadingButton } from "@mui/lab";

export default function Home() {
  const [appName, setAppName] = useState("");
  const [isLogIn, setIsLogIn] = useRecoilState(logInState);
  const [info, setInfo] = useRecoilState(similarInfo);
  const [Id, setId] = useRecoilState(appId);
  const [country, setCountry] = useRecoilState(selectCountry);
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
  //Id받아오기+분석하기
  const analyzeApp = async () => {
    //id 받아오기
    const response = await httpApi.get("/job/appsearch", {
      params: {
        name: `${appName}`,
      },
    });
    // console.log(appName);
    const responseId = response.data.result;
    setIsLoading(true);

    //기존앱 받아오기
    const res = await httpApi.post("/job/appinfo", {
      country: `${country}`,
      appId: responseId,
    });
    const result = res.data.result;
    // console.log("------기존앱----", result);
    // console.log("------기존앱 id----", result.id);
    setId(result.id);
    // console.log("저장된id", Id);
    setIsLoading(false);
    setAnalyzeResult({ result });

    //유사앱 받아오기
    const getSimilar = await httpApi.post("/job/similarappinfo", {
      country: `${country}`,
      appId: "Id",
    });
    console.log("------유사앱----", getSimilar);
    console.log("배열", getSimilar.data.result);
    setInfo(getSimilar.data.result);
    console.log("info", info);
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
              sx={{ width: 200, height: 55, ml: 3 }}>
              <Typography
                fontSize="20px"
                color="common.white"
                onClick={() => analyzeApp()}>
                분석하기
              </Typography>
            </LoadingButton>
          </Box>
        </Box>
        <Box width="630px" m="0 auto">
          <Box display="flex" justifyContent="center" mt="50px"></Box>
        </Box>
        <Box maxWidth="800px" margin="auto" mt="60px">
          <Box display="flex" height="250px" mt="100px">
            <Box
              flexGrow="1"
              width="210px"
              mr="20px"
              borderRadius="20px"
              bgcolor="white">
              유튜브 <br />
              관련 동영상 App 분석보기
            </Box>
            <Box
              flexGrow="1"
              width="210px"
              mr="20px"
              borderRadius="20px"
              bgcolor="white">
              카카오톡
              <br />
              관련 동영상 App 분석보기
            </Box>
            <Box flexGrow="1" width="210px" borderRadius="20px" bgcolor="white">
              인스타그램 <br />
              관련 동영상 App 분석보기
            </Box>
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
