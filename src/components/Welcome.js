import "../styles/Welcome.css";
import React, {Suspense, useEffect, useState} from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Shapes } from "./Shapes";
import { transition } from "./settings";
import useMeasure from "react-use-measure";
//
import ReactDOM from 'react-dom';
import { useSpring, animated as anim } from 'react-spring';
import Motion from "./Motion";


const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`



export default function Welcome() {
    const [ref, bounds] = useMeasure({ scroll: false });
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
//
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
                <MotionConfig transition={transition}>
                    <motion.button
                        ref={ref}
                        initial={false}
                        animate={isHover ? "hover" : "rest"}
                        whileTap="press"
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.5 },
                            press: { scale: 1.4 }
                        }}
                        onHoverStart={() => {
                            resetMousePosition();
                            setIsHover(true);
                        }}
                        onHoverEnd={() => {
                            resetMousePosition();
                            setIsHover(false);
                        }}
                        onTapStart={() => setIsPress(true)}
                        onTap={() => setIsPress(false)}
                        onTapCancel={() => setIsPress(false)}
                        onPointerMove={(e) => {
                            mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                            mouseY.set(e.clientY - bounds.y - bounds.height / 2);
                        }}
                    >
                        <motion.div
                            className="shapes"
                            variants={{
                                rest: { opacity: 0 },
                                hover: { opacity: 1 }
                            }}
                        >
                            <div className="pink blush" />
                            <div className="blue blush" />
                            <div className="container">
                                <Suspense fallback={null}>
                                    <Shapes
                                        isHover={isHover}
                                        isPress={isPress}
                                        mouseX={mouseX}
                                        mouseY={mouseY}
                                    />
                                </Suspense>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
                            className="label"
                        >
                            Start
                        </motion.div>
                    </motion.button>
                </MotionConfig>
            </div>

        </>

    );
}
ReactDOM.render(<Motion />, document.getElementById('root'));
