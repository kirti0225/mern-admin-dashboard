import React, { useEffect, useState } from "react";
import './slider.css';
import Header from "../../components/Header";

function Slider() {

    const [data,setData] = useState(0)
    const [emoji,setEmoji] = useState('')
    return(
        <> <Header />
        <div className="slidecontainer">
            <input className={data>50?'heigh':'less'} type="range" min="0" max="100" step="10" value={data} onChange={(e)=>setData(e.target.value)} />
            <h1>Current Slider Value: {data}</h1>
        </div>
        </>
    );
}
export default Slider;