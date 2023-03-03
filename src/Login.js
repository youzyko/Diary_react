import React from "react";
import { Grid, Button, Container, Typography, TextField } from "@mui/material";

const API_BASE_URL = "http://localhost:8080";
//api_base_url :http://localhost:8080

//app.js에서 넘어옴
const Login = () => {
  //로그인 서브밋 이벤트 핸들러
  const submitHandler = (e) => {
    e.preventDefault();

    //아이디 입력란,패스워드 데이터 가져옴
    const $id = document.getElementById("id");
    const $pwd = document.getElementById("pwd");
    const username=document.getElementById("username");


    fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        //json형식으로 넘겨주겠다.
        id: $id.value,
        pwd: $pwd.value,
        username:username.value
      
      }),
    })
      .then((res) => {
       // console.log("res.json==>" + res.json);
        return res.json();
      })
      .then((loginUserData) => {
      //  console.log("==>loginUserData" + loginUserData);
        if (loginUserData.message) {
         // console.log("로그인에 실패하셨습니다.");
          alert(loginUserData.message);
        } else {
          localStorage.setItem('ACCESS_TOKEN', loginUserData.token);
          localStorage.setItem('LOGIN_USERNAME', loginUserData.username);
        
          // 할일 목록 보여주기
          window.location.href = "/";
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "200px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={submitHandler}>
        {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="id"
              label="id"
              name="id"
              autoComplete="id"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="pwd"
              label="password"
              type="password"
              id="pwd"
              autoComplete="current-password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default Login;
