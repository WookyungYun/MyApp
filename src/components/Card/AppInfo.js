import { Card, CardContent } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { analyze } from "../../state/Analyze";

export default function AppInfo() {
  const analyzeResult = useRecoilValue(analyze);
  console.log("appinfo", analyzeResult.title);
  return (
    <Card sx={{ mb: 5 }}>
      <CardContent>
        AppInfo
        <br />
        {/* {analyzeResult.title} */}
        이름: 중고나라 - 국내 최대 중고마켓 <br /> 카테고리: 쇼핑, 장르 (태그)
        {/* {analyzeResult.price} */}
        <br /> 가격: 무료(태그)
      </CardContent>
    </Card>
  );
}
