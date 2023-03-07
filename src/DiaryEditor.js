//작성자(input), 일기 본문(textarea), 감정점수(select), 저장하기(button)의 기본 폼
import { useState, useRef } from "react";
/* import { FiAlertCircle } from "react-icons/fi"; */

const DiaryEditor = ({ onAdd }) => {
  //작성자,일기본문,감정점수를 저장할 객체
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: "😀",
  });

  //불필요한 렌더링 제거
  const authorInput = useRef("");
  const contentInput = useRef("");
  /*   const emotionInput = useRef("");
  const created_dateInput = useRef(""); */

  //입력창에 값이 변할 때마다 자동저장
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }; //handleChangeState end


  const addClickSubmit = (e) => {
    e.preventDefault();
    const { author, content } = state;

    const wordRegex = /^[^\s]+$/; //빈칸빼고 모든 문자가능 

    if (!wordRegex.test(author) || !wordRegex.test(content)) {
      alert("제목/내용은 필수 입력사항입니다.");
      return;
    }
  
    onAdd(state);
    alert("저장완료");

    setState({
      author: "",
      content: "",
      emotion: "😀",
    });

   // return state.replaceAll("<br>", "\r\n"); //엔터 클릭시 줄바꿈
  };


  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      
      <form onSubmit={addClickSubmit} name="frm">
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
          placeholder="일기제목"
          type="text"
          ref={authorInput}
     
        /*   required={checkpoint} */
        />
       
      {/*   <span className="notification">
         {notification}
        </span> */}
      </div>

      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleChangeState}
          placeholder="일기본문"
          type="text"
          ref={contentInput}
          
        />
        <span className="notification">
          일기 본문을 입력하세요 (최소 5글자 이상)
        </span>
      </div>
      


      </form>
     
      
      <span>오늘의 감정점수: </span>

      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value="😀">😀</option>
          <option value="😝">😝</option>
          <option value="😡">😡</option>
          <option value="🤯">🤯</option>
          <option value="🥳">🥳</option>
        </select>
        <span className="notification">감정 점수를 선택하세요 (택 1)</span>
      </div>
     <button onClick={addClickSubmit}>일기 저장하기</button> 

    </div>
   
  );
}; //DiaryEditor end
export default DiaryEditor;
