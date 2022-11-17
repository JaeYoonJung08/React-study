
import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor  from "./DiaryEditor";
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author:"정재윤",
//     content: "하이 1",
//     emotion: 5,
//     created_date:new Date().getTime(), 
// },
// {
//   id:2,
//   author:"박주영",
//   content: "하이 2",
//   emotion: 3,
//   created_date:new Date().getTime(), 
// },
// {
//   id:3,
//   author:"박경식",
//   content: "하이 3",
//   emotion: 4,
//   created_date:new Date().getTime(), 
// }
// ];
 
const App = () => {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author, content, emotion,created_date, id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  }


  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, content : newContent} : it)
    )
  }

  return (
    <div className="App">
      <DiaryEditor onCreate = {onCreate}></DiaryEditor>
      <DiaryList onEdit = {onEdit}onRemove = {onRemove}diaryList = {data}/>
    </div>
  );
}

export default App;
