import React, { useState, useEffect } from "react";


const CounterA = React.memo(({count}) => {

    useEffect(() => {
        console.log(`CounterA Update - count : ${count}`)
    })
    return <div>{count}</div>
})


const CounterB = ({obj}) => {
    useEffect(() => {
        console.log(`CounterB Update - count : ${obj.count}`)
    })
    return <div>{obj.count}</div>
}

const areEqual = (prevprops, nextProps) => {
   if(prevprops.obj.count === nextProps.obj.count){
    return true;
   }
   return false;
    // return true; //이전 현재 프롭스 같다 > 리렌더링 일으키지 않음
    //return false; // 이전 현재 프롭스 다름 > 리렌더링 일으킴

}

const MemoizedCounterB = React.memo(CounterB,areEqual);

const OptimizeTest = () => {

    const [count, setCount ] = useState(1);
    const [obj, setObj ] = useState({
        count : 1,
    });

    return (
    <div style = {{padding : 50}}>
        <div>
            <h2>Counter A</h2>
            <CounterA count = {count}></CounterA>
            <button onClick={() => setCount(count)}>A boutton</button>
        </div>  
        <div>
            <h2>Counter B</h2>
            <MemoizedCounterB obj = {obj}></MemoizedCounterB>
            <button onClick={() => setObj({
                count:obj.count
            })}>B boutton</button>
        </div>  
    </div>
    )
}

export default OptimizeTest;