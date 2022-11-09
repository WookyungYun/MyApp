import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/login">
        <div>로그인</div>
      </Link>
      <Link href="/register">
        <div>회원가입</div>
      </Link>
    </>
  );
}
