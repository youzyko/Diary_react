//작성자(input), 일기 본문(textarea), 감정점수(select), 저장하기(button)의 기본 폼
import { useState, useRef } from "react";

const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  }); //작성자,일기본문,감정점수 초기화

  //불필요한 렌더링 제거
  const authorInput = useRef("");
  const contentInput = useRef("");

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }; //handleChangeState end

  const handleSubmit = () => {
    if (state.author.length < 1) {
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
    });
  }; //handleSubmit end

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
          placeholder="작성자"
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
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <span className="notification">감정 점수를 선택하세요 (택 1)</span>
      </div>
      <button onClick={handleSubmit}>일기 저장하기</button>
    </div>
  );
}; //DiaryEditor end
export default DiaryEditor;
