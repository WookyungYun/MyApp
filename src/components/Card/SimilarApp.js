import { Box, Card, CardContent } from "@mui/material";
import React from "react";

export default function SimilarApp() {
  return (
    <Card>
      <CardContent sx={{ display: "flex" }}>Similar App</CardContent>
      <CardContent sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }} border="1px solid black">
          {/* {analyzeResult.title} */}
          Similar App <br />
          이름: 중고나라 - 국내 최대 중고마켓 <br /> 카테고리: 쇼핑, 장르 (태그)
          <br /> 가격: 무료(태그)
        </Box>
        <Box sx={{ flexGrow: 1 }} border="1px solid black">
          {/* {analyzeResult.title} */}
          Similar App <br />
          이름: 중고나라 - 국내 최대 중고마켓 <br /> 카테고리: 쇼핑, 장르 (태그)
          <br /> 가격: 무료(태그)
        </Box>
        <Box sx={{ flexGrow: 1 }} border="1px solid black">
          {/* {analyzeResult.title} */}
          Similar App <br />
          이름: 중고나라 - 국내 최대 중고마켓 <br /> 카테고리: 쇼핑, 장르 (태그)
          <br /> 가격: 무료(태그)
        </Box>
        <Box sx={{ flexGrow: 1 }} border="1px solid black">
          {/* {analyzeResult.title} */}
          Similar App <br />
          이름: 중고나라 - 국내 최대 중고마켓 <br /> 카테고리: 쇼핑, 장르 (태그)
          <br /> 가격: 무료(태그)
        </Box>
      </CardContent>
    </Card>
  );
}
