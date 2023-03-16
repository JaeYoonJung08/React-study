import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {

    //targetDiary 데이터 state 넣어서 사용
    const [originData, setOriginData] = useState();

    const navigate = useNavigate();
    const {id} = useParams();
  

    //원본 데이터 들고오기
    const diaryList = useContext(DiaryStateContext);

    //id값과 같은 수정하려는 일기 들고 오기
    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            //이상한 일기 순서값 들어왔을 때 다시 홈페이지로 돌아오게 만들기 
            if(targetDiary){
                setOriginData(targetDiary);
            }else {
                navigate("/", {replace: true})
            }

        }


    }  , [id, diaryList] )
     
    return (
        <div>
           <h2>{originData && <DiaryEditor isEdit = {true} originData = {originData}/>}</h2>
        </div>
       
    )
}

export default Edit;