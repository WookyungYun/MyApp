import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { httpApi } from "src/api/http";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  console.log(router);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  const email = useRef({});
  password.current = watch("password", "");
  email.current = watch("email", "");

  const emailRegRex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleClickLogin = async () => {
    const result = await httpApi.post("/auth/login", {
      email: email.current,
      password: password.current,
    });
    if (result.status === 201) {
      router.push("/");
    }
    console.log(result.status, "결과");
  };

  const onSubmit = async () => {
    handleClickLogin();
  };

  return (
    <Box
      position="relative"
      top="30px"
      borderRadius="10px"
      backgroundColor="common.white"
      padding="36px"
      boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
      autoComplete="off">
      <Box display="flex" justifyContent="center" mt="20px" mb="70px">
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
          {...register("email", {
            required: "이메일은 필수입니다.",
            validate: (value) =>
              emailRegRex.test(value) || "이메일 형식에 맞게 입력해주세요.",
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}></TextField>
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          sx={{ marginBottom: 10 }}
          {...register("password", {
            required: "비밀번호는 필수입니다.",
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}></TextField>

        <div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginBottom: 10 }}
            onClick={handleClickLogin}>
            Sign In
          </Button>
        </div>
      </form>
    </Box>
  );
}
