
import React, { useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
import './App.css';
import DiaryEditor  from "./DiaryEditor";
import DiaryList from './DiaryList';

//import Lifecycle from './Lifecycle';


//https://jsonplaceholder.typicode.com/comments

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
 
const reducer = (state, action) => {
  switch(action.type){
    case "INIT":{
      return action.data
    }
    case "CREATE":
      {
        const created_date = new Date().getTime();
        const newIten = {
          ...action.data,
          created_date
        }
        return [newIten, ...state];
      }
    case "REMOVE":{
      return state.filter((it) => it.id !== action.targetId)
    }
    case "EDIT":{
      return state.map((it) => it.id === action.targetId? 
      {...it , content: action.newContent} : it)
    }
    default:
    return state;  
  }

}


export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext= React.createContext();

const App = () => {

  //const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);


  const getData = async ()  => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then(((res) => res.json()));
    
    const initData = res.slice(0, 20).map((it) =>{
      return {
        author : it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    })

    dispatch({type:"INIT", data:initData})
  }



  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {

    dispatch({type:"CREATE", data: {
      author, content, emotion, id: dataId.current
    }})
    dataId.current += 1;
   
  },[])

  const onRemove = useCallback((targetId) => {

    dispatch({type:"REMOVE", targetId});
    
    //console.log(`${targetId}가 삭제되었습니다`);
    //setData(data => data.filter((it) => it.id !== targetId));
  }, []);


  const onEdit = useCallback((targetId, newContent) => {

    dispatch({type: "EDIT", targetId, newContent})
    //setData((data) =>
    // data.map((it) => 
    //it.id === targetId ? {...it, content : newContent} : it)
    //)
  }, [])

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onEdit}
  }, [])

  const getDiaryAnalysis = useMemo(() => {
    //console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return {goodCount, badCount, goodRatio}
  }, [data.length])
   
  const {goodCount, badCount, goodRatio}  = getDiaryAnalysis;

  return (
    
     
    <DiaryStateContext.Provider value = {data}>
      <DiaryDispatchContext.Provider value  ={memoizedDispatches}>
      <div className="App">
      <DiaryEditor></DiaryEditor>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList />
     </div>
     </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
