import { Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRecoilValue } from "recoil";
import { appReview } from "../../state/Analyze";
import WordCloud from "react-d3-cloud";


export default function AppReview() {
  const review = useRecoilValue(appReview);
  console.log("리뷰결과", review);

// const picked = Math.floor(Math.random()*review.length)
// console.log('?',review[picked])
// if(review[picked]){
//   const c=review[picked].map((item)=>({text:item.text}))
//   console.log('c',c)
// }else {
//   alert('기다려')
// }
const c= review.map((item)=>item.map((item)=>item.text))
//   const c = review.map((item) => item.map((item)=>({ text: item.text,value: Math.random() * 1000})))
//  console.log('c',c)
 const d=c.join('').split(" ")
 console.log('d',d)
 
 const filtered = d.filter((ele,idx)=>{
  return d.indexOf(ele) === idx
 }).filter((item)=>item.length>1)

 console.log("중복값+한 글자수 제거", filtered)
const mapped = filtered.map((item)=>({text:item , value: 500}))
console.log("객체로",mapped)


  return (

  <WordCloud
      data={mapped}
      />
  )
}

 