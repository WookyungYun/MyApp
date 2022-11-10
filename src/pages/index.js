import Link from "next/link";
import { useRecoilValue } from "recoil";
import { loadingState } from "../state/Login";

export default function Home() {
  const loading = useRecoilValue(loadingState);
  return (
    <>
      {loading === true ? (
        <>
          <Link href="/">
            <div>로그아웃</div>
          </Link>
          <Link href="/mypage">
            <div>마이페이지</div>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login">
            <div>로그인</div>
          </Link>
          <Link href="/register">
            <div>회원가입</div>
          </Link>
        </>
      )}
    </>
  );
}
