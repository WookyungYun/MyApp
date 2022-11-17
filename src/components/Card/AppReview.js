import { Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactWordcloud from "react-wordcloud";
import { useRecoilValue } from "recoil";
import { appReview } from "../../state/Analyze";

export default function AppReview() {
  const review = useRecoilValue(appReview);
  console.log("리뷰결과", review);

  const c = review.map((item) => item.map((item) => item.text));
  const d = c.join("");

  // console.log(d);
  const e = d.split(" ");
  console.log("e", e);

  return (
    <>
      <Card sx={{ mb: 5 }}>
        <CardContent>
          App Review <br /> 이름: 중고나라 - 국내 최대 중고마켓 <br /> 카테고리:
          쇼핑, 장르 (태그)
          <br /> 가격: 무료(태그)
        </CardContent>
      </Card>
    </>
  );
}
