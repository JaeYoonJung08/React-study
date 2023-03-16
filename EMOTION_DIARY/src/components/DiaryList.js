import { useState } from "react"
import MyButton from "./MyButton"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./Diaryitem"

const sortOptionList = [
    {value:"latest", name:"최신순"},
    {value:"oldest", name:"오래된 순"}

]
//감정 옵션
const filterOptionList = [
    {value: "all" , name:"전부다"},
    {value: "good" , name:"좋은 감정만"},
    {value: "bac" , name:"안 좋은 감정만"},
]

const ControlMenu = ({value, onChange, optionList} ) => {
    return <select className = "ControlMenu" value = {value} onChange = {(e) => onChange(e.target.value)}>
        {optionList.map((it, idx)=> (
        <option key = {idx} value= {it.value}>{it.name}</option>))}
    </select>
}

const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("lastest");
    //감정 필터
    const[filter, setFilter] = useState("all");

    

    //일기들 바뀌게 하는 것 오래된 순, 최신순
    const getProcessedDiaryList = () => {

        //감정 필터 추가 
        const filterCallBack = (item) => {
            if(filter === 'good'){
                return parseInt(item.emotion) <=3;
            }else {
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a, b) => {
            if(sortType === "latest"){
                return parseInt(b.date) - parseInt(a.date);
            }else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList))
        //감정 필터
        const filteredList = filter === 'all'? copyList : copyList.filter((it) => filterCallBack(it))

        const sortedList = filteredList.sort(compare);
        return sortedList;
    }

    

    return (
    <div className="DiaryList">
        <div className="menu_wrapper">
            <div className="left_col">

                <ControlMenu 
                value={sortType} 
                onChange= {setSortType}
                optionList = {sortOptionList}/>

                <ControlMenu
                value={filter}
                onChange = {setFilter}
                optionList = {filterOptionList}
                />
            </div>
            <div className="right_col">
            <MyButton type={'positive'} text = {'새 일기 쓰기'} onClick = {() => navigate('/new')}/>
            </div>
        </div>
        {getProcessedDiaryList().map((it) => (
            <DiaryItem key={it.id} {...it}/>
        ))}
    </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}


export default DiaryList;