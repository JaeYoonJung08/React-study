import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import New from './pages/New';


// Components

import React, { useReducer, useRef } from 'react';


const reducer = (state, action) => {
  let newState= [];

  switch(action.type){
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data
      };
     newState = [newItem, ...state];
     break;
    }
    case "REMOVE" : {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it)
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//더미 데이터 이용 왜? 지금 리스트 아무것도 코딩 안 함 뭘 만든게 없음 
const dummyData = [
  {
    id : 1,
    emotion:1,
    content:"오늘의 일기 1번",
    date:1670263602363,
  },
  {
    id : 2,
    emotion:2,
    content:"오늘의 일기 2번",
    date:1670263602364,
  },
  {
    id : 3,
    emotion:3,
    content:"오늘의 일기 3번",
    date:1670263602365,
  },
  {
    id : 4,
    emotion:4,
    content:"오늘의 일기 4번",
    date:1670263602366,
  },
  {
    id : 5,
    emotion:5,
    content:"오늘의 일기 5번",
    date:1670263602367,
  }
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);

  console.log(new Date().getTime());


  const dataId = useRef(0);
  //Create
  const onCreate = (date, content, emotion) => {
    dispatch({type : "CREATE" , data : {
      id:dataId.current,
      date:new Date(date).getTime(),
      content,
      emotion
    }})
    dataId.current += 1;
  }
  //Remove
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  }
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type:"EDIT",
      data:{
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  return (
    <DiaryStateContext.Provider value = {data}>
      <DiaryDispatchContext.Provider value = {{
        onCreate,
        onEdit,
        onRemove,
      }}>
        <BrowserRouter>
       <div className="App">
          <Routes>
            <Route path = '/' element= {<Home/>}/>
            <Route path = '/new' element= {<New/>}/>
           <Route path = '/edit/:id' element= {<Edit/>}/>
           <Route path = '/diary/:id' element= {<Diary/>}/>
         </Routes>
       </div>
      </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
