import { Link, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/system';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { httpApi } from 'src/api/http';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/LogIn';
import { useMutation } from 'react-query';

export default function LoginPage() {
  const router = useRouter();

  const [logIn, setIsLogIn] = useRecoilState(logInState);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  const email = useRef({});
  password.current = watch('password', '');
  email.current = watch('email', '');

  const emailRegRex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const LoginFn = async () => {
    const result = await httpApi.post('/auth/login', {
      email: email.current,
      password: password.current,
    });
    localStorage.setItem('token', result.data.result.access_token);
  };

  const { mutate, isLoading } = useMutation(LoginFn, {
    onSuccess: () => {
      setIsLogIn(true);
      router.push('/');
    },
    onError: () => {
      console.log('로그인 에러');
    },
  });
  console.log(isLoading);

  const handleClickLogin = () => {
    mutate({ email: email.current, password: password.current });
  };

  const onSubmit = async () => {
    handleClickLogin();
    setIsLogIn(true);
  };

  return (
    <Box
      position="relative"
      top="30px"
      borderRadius="10px"
      backgroundColor="common.white"
      padding="36px"
      boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
      autoComplete="off"
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 20 }}>
        <Typography variant="h4" fontWeight="900">
          LogIn
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          autoFocus
          label="Email Address"
          name="email"
          sx={{ marginBottom: 10 }}
          {...register('email', {
            required: '이메일은 필수입니다.',
            validate: (value) =>
              emailRegRex.test(value) || '이메일 형식에 맞게 입력해주세요.',
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        ></TextField>
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          sx={{ marginBottom: 10 }}
          {...register('password', {
            required: '비밀번호는 필수입니다.',
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        ></TextField>

        <Box>
          <LoadingButton
            fullWidth
            loading={logIn}
            type="submit"
            variant="contained"
            sx={{ marginBottom: 10 }}
            onClick={handleClickLogin}
          >
            Sign In
          </LoadingButton>
        </Box>
        <Box display="flex">
          <Typography>App Review가 처음이신가요?</Typography>
          <Link href="/register">
            <Typography
              ml="5px"
              borderBottom="1px solid"
              borderBottomColor="primary.main"
              color="primary.main"
            >
              회원가입
            </Typography>
          </Link>
        </Box>
      </form>
    </Box>
  );
}
