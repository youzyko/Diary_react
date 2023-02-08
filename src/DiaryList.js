//자식요소
import DiaryItem from "./DiaryItem";
const DiaryList = ({ diaryList,onDelete,onEdit }) => { 
  //일기list
  return (
    <div className="DiaryList">
      <h2>일기리스트</h2>
      <h3>{diaryList.length}개의 일기가 있습니다</h3>
      <div>
        {diaryList.map((it) => (
          <DiaryItem  key={it.id} {...it} onDelete={onDelete} onEdit={onEdit}>
            <div>작성자: {it.author}</div>
            <div>본문: {it.content}</div>
            <div>감정: {it.emotion}</div>
            <div>작성 시간: {it.created_date}</div>
          </DiaryItem>
        ))}
      </div>
    </div> //DiaryList end
  );
};
export default DiaryList;
