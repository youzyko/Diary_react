//자식요소
//전체항목 불러오기
import { useEffect, useState } from "react";
import DiaryItem from "./DiaryItem";
const DiaryList = ({ diary, Delete, Edit }) => {
  //함수/변수 다 참조 받을 수 있음

  const removeButton = (e) => {
    //버튼 클릭시 삭제
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
  console.log(change);
  return (
    <div className="DiaryList">
      <div>
        {/* <DiaryItem key={diary.id} {...diary} onDelete={onDelete} onEdit={onEdit}> */}
        <div style={{ display: "none" }}>id:{diary.id}</div>
        <div>작성자: {diary.author}</div>
        <div>
          내용:
          <input
            type="text"
            value={dcontent} /*value={diary.content}를 주면 값이 바뀌지 않음  */
            name="content"
            onChange={changeHandler}
          ></input>
        </div>
        <div>감정: {demotion.value}</div>
        <div>
          변경 할 감정:
          <select onChange={emotionChange}>
            <option value="none" selected>===select===</option>
            <option value={1}>{`\u{1F601}`}</option>
          <option value={2}>{`\u{1F60B}`}</option>
          <option value={3}>{`\u{1F60D}`}</option>
          <option value={4}>{`\u{1F616}`}</option>
          <option value={5}>{`\u{1F621}`}</option>
            
          </select>
        </div>
        <div>작성 시간: {diary.created_date}</div>
        <button onClick={EditButton}>수정</button>
        <button onClick={removeButton}>삭제하기</button>
        {/* </DiaryItem> */}
      </div>
    </div> //DiaryList end
  );
};
export default DiaryList;
