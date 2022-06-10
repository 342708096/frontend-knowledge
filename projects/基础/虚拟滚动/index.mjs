import { useState, useRef } from "react";
import { select } from "@querycap-ui/core";
const total = 100000;
const rowHeight = 55;
// 用于缓冲（防止滚动过快，出现白屏）
const bufferSize = 20;
const limit = 10;
let originStartIdx = 0;
const getdata = () => {
    const data = [];
    for (let i = 0; i < total; i++) {
        data.push({
            title: `标题${i}`,
            age: `年纪${i}`,
            address: `地址${i}`,
        })
    }
    return data;
}
const data = getdata();
const Home = () => {
    const [current, setCurrent] = useState<undefined | number>();
    const [startIndex, setStart] = useState(Math.max(originStartIdx - bufferSize, 0));
    const [endIndex, setEnd] = useState(Math.min(originStartIdx + limit + bufferSize, total - 1));
    const ref = useRef<HTMLDivElement>(null);
    const onScroll = (e: any) => {
        if (e.target === ref.current) {
            const { scrollTop } = e.target;
            // scrollTop 获取到的是被滚动元素在垂直位置滚动的距离。
            const currIndex = Math.floor(scrollTop / rowHeight);
            if (originStartIdx !== currIndex) {
                originStartIdx = currIndex;
                setStart(Math.max(currIndex - bufferSize, 0))
                setEnd(Math.min(currIndex + limit + bufferSize, total - 1))
            }
        }
    }

    const edite = (data: any, index: number) => {
        setCurrent(index);
        console.log('编辑了这一条数据---->',data)
    }

    const rowRenderer = (obj: any) => {
        const { index, style } = obj;
        return (
            <div 
                key={index}
                style={style}
                css={
                    select().backgroundColor(index === current ? '#dcebf8' : '').display('flex')
                        .with(select(':hover').backgroundColor(index === current ? '#dcebf8' : '#fafafa'))
                        .with(select('>*').flex(1).padding('0px 16px'))
                }
            >
                <span>{data[index].title}</span>
                <span>{data[index].age}</span>
                <span>{data[index].address}</span>
                <a onClick={() => edite(data[index], index)}>编辑</a>
            </div>
        )
    }

    // 可视区域的数据
    const pushData = () => {
        const content = [];
        for (let i = startIndex; i <= endIndex; ++i) {
            content.push(
                rowRenderer({
                    index: i,
                    style: {
                        height: `${rowHeight}px`,
                        lineHeight: `${rowHeight}px`,
                        left: 0,
                        right: 0,
                        position: "absolute",
                        top: i * rowHeight,
                        borderBottom: "1px solid #f0f0f0",
                        width: "100%",
                        cursor: 'pointer',
                    }
                })
            );
        }
        return content;
    }

    return (
        <div
            style={{
                margin: '0 auto',
                height: '550px',
                width: '100%',
                overflowY: 'auto',
                msOverflowX: 'hidden',
                border:'1px solid red',
            }}
            onScroll={onScroll}
            ref={ref}
        >
            <div style={{ height: `${total * 55}px`, position: 'relative' }}>
                {pushData()}
            </div>
        </div>

    );
};

export default Home;
