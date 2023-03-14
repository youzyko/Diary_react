import React, { useEffect, useState } from "react";
 import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material"; 
/* import {AppBar, Toolbar, Grid, Typography, Button} from "@mui/material"; */
import { Link } from "react-router-dom";


const Header = () => {

  //프로필 사진
  const [profile, setProfile] = useState(null);

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
  };
  const BASE_URL = "http://localhost:8080/auth/load-profile";
  useEffect(()=>{
    const url= BASE_URL;
    const token = localStorage.getItem('ACCESS_TOKEN');
    fetch(url,{
      method:"GET",
      headers: {
        'Authorization': 'Bearer ' + token
    }
    })
    .then(res=>{
      if(res.status===200){
        return res.blob();
      }
      return setProfile(null);
    })
    .then(imageData=>{
      //서버가 보낸 이미지파일 =>url형식으로 변환
      const imgUrl = window.URL.createObjectURL(imageData);
      setProfile(imgUrl);
    });
  },[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          ></IconButton>
            <img className="welcome-profile"
                src={profile ? profile : require('./assets/img/anonymous.jpg')} 
                alt="웰컴 프로필 사진" style={{ width:50, height: 50, marginRight:10, borderRadius:50 }} ></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {userLabel()}
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </Box>



  );
};
export default Header;
