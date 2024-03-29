import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id, emotion, content, date}) => {
    //기능 구현
    const navigate = useNavigate();

    //날짜 
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    //일기 조회 페이지 이동
    const goDetail = () => {
        navigate(`/diary/${id}`)
    }

    // 수정하기 버튼 기능
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }

    return <div className="DiaryItem">
        <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
            <img src= {process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}/>
        </div>
        <div onClick = {goDetail}   className="info_wrapper">
            <div className="diary_date">{strDate}</div>
            <div className="diary_content_preview">{content.slice(0, 25)}</div>
        </div>
        <div className="btn_wrapper">
            <MyButton onClick={goEdit} text={"수정하기"}/>
        </div>
    </div>
}


export default DiaryItem;