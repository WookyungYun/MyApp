import { Box, Card, CardContent } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function AppReview() {
  return (
    <Card sx={{ mb: 5 }}>
      <CardContent>
        <Image></Image>
        App Review <br /> 이름: 중고나라 - 국내 최대 중고마켓 <br /> 카테고리:
        쇼핑, 장르 (태그)
        <br /> 가격: 무료(태그)
      </CardContent>
    </Card>
  );
}
