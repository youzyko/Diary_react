import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import Login from "./Login";

const Header = () => {
  const USERNAME = localStorage.getItem("LOGIN_ID");

  //로그아웃 버튼
  const logoutHandler = (e) => {
    //로컬스토리지 데이터 제거
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("LOGIN_ID");
    window.location.href = "/login";
  };

  const button = USERNAME ? (
    <Button color="inherit" onClick={logoutHandler}>
      로그아웃
    </Button>
  ) : (
    <>
      <Link
        to="/login"
        style={{ color: "#fff", marginRight: 20, textDecoration: "none" }}
      >
        로그인
      </Link>

      <Link to="/join" style={{ color: "#fff", textDecoration: "none" }}>
        회원가입
      </Link>
    </>
  );
  function userLabel(){
    if(USERNAME==null){
        return <p>로그인 후 이용해주세요</p>
    }else{
      return <p>{USERNAME}님 환영합니다 </p>
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {userLabel()}
           {/*  {USERNAME}의 일기장 */}
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
