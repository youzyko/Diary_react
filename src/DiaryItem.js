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

  const toggleIsEdit = () => setIsEdit(!isEdit);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  //삭제
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  }; //handleRemove end

  const handleQuitEdit = () => {
    setIsEdit(false); //수정하기,삭제버튼
    setLocalContent(content);
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
        <div className="content">{content}</div>
      </div>

      <div>
        <button onClick={handleRemove}>삭제하기</button>
      </div>
    </div>
  );
};
export default DiaryItem;
