//자식요소
//전체항목 불러오기
import React from "react";
import { useEffect, useState } from "react";
import DiaryItem from "./DiaryItem";
const DiaryList = ({ diary, onDelete, onEdit }) => {

  console.log(diary);

  return (

    <div className="DiaryList">
     

      <div>
        <DiaryItem key={diary.id} {...diary} onDelete={onDelete} onEdit={onEdit}>
          <div>작성자: {diary.author}</div>
          <div>본문: {diary.content}</div>
          <div>감정: {diary.emotion}</div>
          <div>작성 시간: {diary.created_date}</div>
        </DiaryItem>
      </div>
    </div> //DiaryList end
  );
};
export default DiaryList;
