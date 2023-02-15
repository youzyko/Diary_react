import { useRef, useState, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  
  //새로 작성되는 일기 데이터 저장
  const [data, setData] = useState([]);

  //고유한 id 생성 +0번부터 index 시작
  const dataId = useState(1);

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
  //삭제
  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  }; //onDelete

  //수정
  const onEdit = (targetId, newContent) => {
    //새로운 데이터로 수정
    setData(
      data.map(
        (it) =>
          it.id === targetId ? { ...it, content: newContent } : { ...it }
        //수정된 배열로 교체
      )
    );
  }; //onEdit end

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
  useEffect(() => {
    fetch('http://localhost:8080/api/diary')
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      setData(json);     
    });

  }, []);

  const onAdd = (diary) => { //버튼눌렸을떄만 
    //const created_date = new Date().getTime(); //현재시간 구하기+시간객체
      
    fetch("http://localhost:8080/api/diary",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"  
      },
      body:JSON.stringify(diary)
    })
    .then(res => res.json())
    .then(json=>{
      setData(json);
    }) ;  


  }; //onCreate end

/*   const diaryList=data.map(item=>
    <DiaryList key={item.id} {...item}/>
  )//diaryList={diaryList}
 */

  const diarys = data.map((item) => 
  <DiaryList diary={item} onDelete={onDelete} onEdit={onEdit}/>); 

  return (
    <div className="App">
      <DiaryEditor onAdd={onAdd}/>
      <h3>{diarys.length}개의 일기가 있습니다</h3>
      <h2>일기리스트</h2>
      {diarys}
    </div>
  );
};

export default App;
