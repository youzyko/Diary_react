import { useRef, useState, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { json, Link, Route, useLocation } from "react-router-dom";
import { List, Paper, Container } from "@mui/material";

const BASE_URL = "http://localhost:8080/api/diary";
//API_BASE_URL=http://localhost:8080
function App() {
  //토큰 가져오기
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [loading, setLoading] = useState(true);

  //새로 작성되는 일기 데이터 저장
  const [data, setData] = useState();

  //고유한 id 생성 +0번부터 index 시작
  //const dataId = useState(1);

  //새로운 일기 추가하는 함수
  /* const onCreate = (author, content, emotion) => {
    //const created_date = new Date().getTime(); //현재시간 구하기+시간객체
    const newItem = {
      author,
      content,
      emotion,
     // created_date,
      id: dataId.current, //현재 1이라는 값 
    };
    dataId.current += 1; //새로운 아이템 생성후 +1 증가
    setData([newItem, ...data]); //최신.ver 제일 위로
  }; //onCreate end
 */

  //DiaryEditor에게 전달하는 함수
  //새로운 일기 추가

  /*   const add=(diray)=>{

    fetch('http://localhost:8080/api/diary',{
      method:"POST",
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify(diray)
    })
    .then(res => res.json())
    .then(json => {
        // console.log(json);
        setData(json.data);
    }); 
  } */

  //시작-끝 담당
  useEffect(() => {
    //다이어리 내용 불러오기
    fetch(BASE_URL, {
      //BASE_URL = API_BASE_URL + "/api/diary";
      method: "GET",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          alert("로그인이 필요한 서비스입니다.");
          window.location.href = "/login";

          return;
        } else {
          return res.json();
        }
      })
      .then((json) => {
        setData(json);
      });
  }, [ACCESS_TOKEN]);
  /*   useEffect(()=>{

  },[]) */

  /*   useEffect(() => {
   setLoading(true);
   fetch(BASE_URL,{
    method:"GET",
    headers:{
      'Authorization': 'Bearer ' + ACCESS_TOKEN 
    }
   })
   .then(res=>{
    if(res.status===403){
      alert("로그인이 필요한 서비스입니다");
      window.location.href="/login"
    }else{
      return res.json();
    }
   })
   .then(json=>{
    setData(json.diarys);
    setLoading(false);
   })
    .catch(error=>{
    alert(error.message);
    setLoading(false);
   }) 

 }, [ACCESS_TOKEN]);
 */

  const onAdd = (diary) => {
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      body: JSON.stringify(diary),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json); // DiaryEditor onAdd 함수 state=diary =>json 형식으로 setData에 담김
      });
  };

  //삭제
  const onDelete = (targetId) => {
    fetch(BASE_URL + `/${targetId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json()) // 파라미터 (res) return res.json()과 같은 말
      .then((json) => {
        setData(json);
        //setData()
      });
  }; //onDelete

  //수정
  const onEdit = (item) => {
    //targetId, newContent
    // console.log(item);
    fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      body: JSON.stringify(item), //List형
    });
    // 파라미터 (res) return res.json()과 같은 말
  };
  //onEdit end

/*  const diarys = data.map(item => (
    <DiaryList key={item.id} diary={item} Delete={onDelete} Edit={onEdit} />
  ))  */
   //onDelete라는 함수 이름이 targetId
  //호출시에는 targetId.~~~라고 해야함
 /*  const diary=data.diarys.map(item=>{
    <DiaryList key={item.ACCESS_TOKEN} diary={item} Delete={onDelete} Edit={onEdit}></DiaryList>
  })
  const viewPage=(
    <Container maxWidth="md" style={{marginTop: 100}}>
    <DiaryEditor onAdd={onAdd} />
    <List>
    {diary}
    </List>
   
  </Container>
  ) */
  return (
    <div className="App">
      <DiaryEditor onAdd={onAdd} />
{/*       <h3>{diarys.length}개의 일기가 있습니다</h3> */}
      <h2>일기리스트</h2>
{/*       {diarys} */}

      {/*     방법1
      <div className="diarys">
        {diarys && diarys.diarys.map(item=>{
          return <p> <DiaryList diary={item} Delete={onDelete} Edit={onEdit} /></p>
        })}
     </div> */}
<div className="die">
     {data && data.diarys.map(item =>{
      return <p><DiaryList key={item.id} diary={item}Delete={onDelete} Edit={onEdit}></DiaryList></p>
     })}
</div>

    </div>
  );
}

export default App;
