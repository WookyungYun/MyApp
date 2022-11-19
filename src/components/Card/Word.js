import React from "react";
import { useRecoilValue } from "recoil";
import { appReview } from "../../state/Analyze";
import WordCloud from "react-d3-cloud";


export default function AppReview() {
  const review = useRecoilValue(appReview);
  console.log("리뷰결과", review);


const filteredReview= review.map((item)=>item.map((item)=>item.text));
const filteredWords=filteredReview.join('').split(" ");

 console.log('result',filteredWords)
 
 const filteredDuplicateWord = filteredWords.filter((ele,idx)=>{
  return filteredWords.indexOf(ele) === idx
 }).filter((item)=>item.length>1)

 console.log("중복값+한 글자수 제거", filteredWords)
const words = filteredDuplicateWord.map((item)=>({text:item , value: 500}))
console.log("객체로",words)


  return (

  <WordCloud
      data={words}
      />
  )
}

 