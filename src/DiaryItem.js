import { useRef, useState } from "react";
const DiaryItem = ({
  onDelete,
  onEdit,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  //수정 중인지 여부 버튼기능...true=수정취소,완료 버튼 ...false 수정하기,삭제하기 버튼
  const [isEdit, setIsEdit] = useState(false);

  //수정하기버튼을 클릭할시 isEdit=true값으로 변함...수정취소/완료
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //수정취소를 누를때 기존 내용 보여주기
  const [localContent, setLocalContent] = useState(content);

  //초기화 버튼을 클릭했을때 포커스 맞추기/수정완료
  const localContentInput = useRef();

  //삭제
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  }; //handleRemove end

  //수정상태에서 나갈때 일어나는 함수
  const handleQuitEdit = () => {
    setIsEdit(false); //수정하기,삭제버튼
    setLocalContent(content); //기존 내용 보이기
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
        <div className="content">
          {isEdit ? (
            <>
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
              />
            </>
          ) : (
            <>{content}</>
          )}
        </div>
        {isEdit ? (
          <>
            {" "}
            {/* ture 일때 */}
            <button onClick={handleQuitEdit}>수정취소</button>
            <button onClick={handleEdit}>수정완료</button>
          </>
        ) : (
          <>
            {/*false 일때 */}
            <button onClick={toggleIsEdit}>수정하기</button>
            <button onClick={handleRemove}>삭제하기</button>
          </>
        )}
      </div>

      <div></div>
    </div>
  );
};
export default DiaryItem;
