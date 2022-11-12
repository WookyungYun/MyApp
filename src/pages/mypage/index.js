import React from "react";

export default function MyPage({ list }) {
  //token 유무에 따라서 다른 페이지로 가게 할 예정
  return (
    <>
      <div>MyPage</div>
    </>
  );
}

export async function getServerSideProps() {
  const result = await fetch("http://15.164.230.202:3011/Moapp/all"); //주소 추후 바꿀예정
  const list = await result.json();
  if (list.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      list,
    },
  };
}
