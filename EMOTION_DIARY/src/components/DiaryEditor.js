import { useNavigate } from 'react-router-dom';
import { useState, useRef, useContext, useEffect } from 'react';
import {DiaryDispatchContext} from "./../App.js"


import MyHeader from './MyHeader'
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

//오늘의 감정 배열로 만들기
const emotionList = [
    {
        emotion_id: 1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '완전 좋음'
    },

    {
        emotion_id: 2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: '좋음'
    },

    {
        emotion_id: 3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: '그럭저럭'
    },

    {
        emotion_id: 4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: '나쁨'
    },

    {
        emotion_id: 5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: '끔찍함'
    },
]




//날짜 보기 쉽게 변경해주기
const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
}

const DiaryEditor = ({isEdit, originData}) => {

    //오늘의 일기 focus 기능 
    const contentRef = useRef();

    //오늘의 일기 맵핑
    const [content , setContent] = useState("");

    //클릭했을 때 상태를 저장할 state
    const [emotion, setEmotion] = useState(3);

    //5번 작성 버튼을 눌렀을 때 일기 내용이 저장되게 하는 함수 
    const {onCreate, onEdit} = useContext(DiaryDispatchContext);
    
    //클릭했을 때 기본값 바뀌는 함수
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    //5번 일기를 정상적으로 완료를 마치면 이거 
    //뒤로가기 버튼
    const navigate = useNavigate();

    //5번 취소하기, 작성완료 기능 함수
    const handleSumit = () => {
        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }

        //일기 수정하기
        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date, content,emotion);
            }
            else{
                onEdit(originData.id, date, content, emotion);
            }
        }

        
        navigate('/', {replace:true})
    }

    //날짜 변경
    const [date, setDate] = useState(getStringDate(new Date()));

    //edit하기
    useEffect(()=> {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))))
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData])




    return (
        <div className='DiaryEditor'>
            <MyHeader headtext={isEdit ? "일기 수정하기" : '새 일기쓰기'}
            leftChild = {<MyButton text = {"< 뒤로가기"} onClick = {()=> navigate(-1)}/>}/>

            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className='input_box'>
                        <input 
                        className='input_date'
                        value = {date} 
                        onChange = {(e) => setDate(e.target.value)}
                        type = "date">
                        </input>
                    </div>
                </section>
                
                <section>
                    <h4>오늘의 감정</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id} {...it} onClick ={handleClickEmote}
                            isSelected = {it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className='input_box text_wrapper'>
                        <textarea ref={contentRef}
                        value = {content}
                        onChange = {(e) => setContent(e.target.value)}
                        placeholder = "오늘은 어땠나요"
                        />
                    </div>
                </section>


                <section>
                    <div className='control_box'>
                        <MyButton text={'취소하기'} onClick = {()=> navigate(-1)}/>
                        <MyButton text={'작성완료 '} type = {"positive"} onClick = {handleSumit}/>
                    </div>
                </section>
            </div>
        </div>
       
    )
}

export default DiaryEditor;