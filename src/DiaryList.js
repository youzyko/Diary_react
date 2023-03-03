//자식요소
//전체항목 불러오기
import { useState } from "react";

const DiaryList = ({ diary, Delete, Edit }) => {
  //함수/변수 다 참조 받을 수 있음

  //버튼 클릭시 삭제
  const removeButton = (e) => {
    console.log("TargetId를 삭제합니다");
    Delete(diary.id);
  };

  const [dcontent, setDcontent] = useState(diary.content);
  const [demotion,setDemotion]=useState(diary.emotion);


  const [change, setChange] = useState({
    id: diary.id,
    author: diary.author,
    content: diary.content,
    emotion: diary.emotion,
  });
  //console.log(diary.created_date) //2023-02-17T04:32:04.000+00:00
  




  const EditButton = (e) => {
    //수정버튼 클릭시 수정
    console.log("TargetId의 content를 수정합니다");
    Edit(change);
    
  };

  const changeHandler = (e) => {
    setDcontent(e.target.value);
    setChange({
      ...change,
      content: e.target.value,
    });
    
  };

  const emotionChange=e=>{  //감정변화
    setDemotion(e.target.value);
    setChange({
      ...change,
      emotion: e.target.value,
    })
  };
  /* console.log(demotion.value); */
/*   dayjs.locale('ko'); */

/*   const timeZone=e=>{
    console.log(dayjs().format("YYYY.MM.DD. HH:mm:ss"))

  } */
 /*  const currentTime =new Date();
  console.log(currentTime) */

//console.log(diary.created_date)



  return (
    <div className="DiaryList">
      <div>
        <div>작성자: {diary.author}</div>
        
        <div>
          내용:
         
          <textarea  type="text" rows="10" cols="20" value={dcontent} name="content"
            onChange={changeHandler}></textarea>
        </div>
        <div>감정: {demotion}</div>

        <div>
          변경 할 감정:
          <select onChange={emotionChange}>
            <option value="none" selected>===select===</option>
 
     <option value="😀">😀</option>
          <option value="😝">😝</option>
          <option value="😡">😡</option>
          <option value="🤯">🤯</option>
          <option value="🥳">🥳</option> 
          </select>
        </div>

        <div>작성 시간: { diary.created_date }</div>
        <button onClick={EditButton}>수정</button>
        <button onClick={removeButton}>삭제하기</button>
     
      </div>
    </div> //DiaryList end
  );
};
export default DiaryList;
