import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated as anim } from 'react-spring';


const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`


function Motion() {
    const [{ pos1 }, set] = useSpring(() => ({ pos1: [0, 0], config: fast }));
    const [{ pos2 }] = useSpring(() => ({ pos2: pos1, config: slow }));
    const [{ pos3 }] = useSpring(() => ({ pos3: pos2, config: slow }));

    useEffect(() => {
        const handler = ({ clientX, clientY }) => set({ pos1: [clientX, clientY] });
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, [set]);

    return (
        <>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
                    <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
                </filter>
            </svg>

            <div className="hooks-main">
                <div className="hooks-filter">
                    <anim.div className="b1" style={{ transform: pos3.interpolate(trans) }} />
                    <anim.div className="b2" style={{ transform: pos2.interpolate(trans) }} />
                    <anim.div className="b3" style={{ transform: pos1.interpolate(trans) }} />
                </div>
            </div>
            <div className="flex justify-center items-center h-screen">
                <button
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
                    Start
                </button>
            </div>
        </>
    );
}

ReactDOM.render(<Motion />, document.getElementById('root'));

export default Motion;