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

  //입력버튼 클릭 이벤트핸들러

  /*   const handleSubmit = (e) => { */

  /*  console.log("저장버튼 클릭");
    add(state);
    
   setState({...state}); */

  /*   fetch("http://localhost:8080/api/diary",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"  
      },
      body:JSON.stringify(state)
    }) */
  /* .then(res=>res.json())
    .then(json=>{
      setState(json);
    })
 */

  /*      if (state.author.length < 1) {
      authorInput.current.focus();
      //alert("작성자는 최소 1글자 이상 입력");
      //focus

      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      //alert("본문은 최소 5글자 이상으로 입력해주세요");
      //focus
      contentInput.current.focus();
      return;
    }
    // console.log(state);
    //prop로 받아온 onCreate 출력
    onCreate(state.author, state.content, state.emotion);
    alert("저장성공!");

    //저장 후 작성폼을 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    }); */
  //}; //handleSubmit end
  const addClickSubmit = (e) => {
    onAdd(state);
    setState({
      author: "",
      content: "",
      emotion: "😀",
    });

    return state.replaceAll("<br>", "\r\n"); //엔터 클릭시 줄바꿈
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
          placeholder="일기제목"
          type="text"
          ref={authorInput}
        />
        <span className="notification">
          작성자명을 입력하세요 (최소 1글자 이상)
        </span>
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
