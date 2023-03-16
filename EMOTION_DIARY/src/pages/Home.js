import { useContext, useEffect, useState } from "react";
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
    //더미 데이터 받아오기
    const diaryList = useContext(DiaryStateContext);

    //날짜가 변경될 때 똑같은 데이터 안 가져오게 하는 거
    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());

    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`


    useEffect(() => {
        if(diaryList.length >= 1){
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0
        ).getTime();
        
        setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
        }
    }, [diaryList, curDate])

    useEffect(() => {
        console.log(data);
    }, [data]);

    //오른쪽 날짜 증가 버튼
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1 , curDate.getDate()))
    }

    //왼쪽 날짜 감소 버튼 
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1 , curDate.getDate()))
    }
    return (
        <div>
            <MyHeader headtext={headText}
            leftChild = {<MyButton text={"<"} onClick ={decreaseMonth}/>} 
            rightChild = {<MyButton text={">"} onClick = {increaseMonth}/>} 
            >
            </MyHeader>
            <DiaryList diaryList={data}></DiaryList>
        </div>
       
    )
}

export default Home;