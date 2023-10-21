import React, {useEffect} from "react";
import './App.css';
import Button from "./Button";

function App() {

    const [calk, setCalk] = React.useState({
        sign: "",
        num: 0,
        res: 0
    });

    const baseFontSize = 40;
    const [fontSize, setFontSize] = React.useState(baseFontSize);

    useEffect(() => {
        changeFont();
    }, [calk]);

    const namesButtons = [
        "C", "+/-", "%", "/",
        7, 8, 9, "*",
        4, 5, 6, "-",
        1, 2, 3, "+",
        0, ".", "="
    ];

    const numClickHandler = (e) => {
        let value = e.target.innerHTML;
        if (calk.num.toString().length < 23) {
            setCalk({
                ...calk,
                num: calk.num === 0 || calk.num === "0" ? value : calk.num + value,
            });
        }
    }

    const invertClickHandler = () => {
        setCalk({
            ...calk,
            num: calk.num ? calk.num * (-1) : 0,
            res: calk.res ? calk.res * (-1) : 0,
        });
    }

    const procentClickHandler = () => {
        setCalk({
            ...calk,
            num: calk.num ? calk.num / 100 : 0,
            res: calk.res ? calk.res / 100 : 0,
        });
    }

    const clearClickHandler = () => {
        setCalk({
            ...calk,
            sign: "",
            num: 0,
            res: 0
        });
    }

    const commaClickHandler = () => {
        if (!calk.num.toString().includes(".")) {
            setCalk({
                ...calk,
                num: calk.num + "."
            });
        }
    }

    const signClickHandler = (e) => {
        e.preventDefault();
        const operator = e.target.innerHTML;

        const math = (a, b, sign) => sign === "+" ? a + b
            : sign === "-" ? a - b
                : sign === "*" ? a * b
                    : a / b

        if (calk.sign) {
            setCalk({
                ...calk,
                sign: operator !== "=" ? operator : "",
                num: 0,
                res: math(Number(calk.res), Number(calk.num), calk.sign)
            });
        } else {
            setCalk({
                ...calk,
                sign: operator,
                num: 0,
                res: calk.num ? calk.num : calk.res
            });
        }
    }

    const changeFont = () => {
        const maxSize = 12;
        if (calk.num) {
            setFontSize(calk.num.toString().length > maxSize ?
                baseFontSize / (calk.num.toString().length / maxSize)
                : baseFontSize);
        } else {
            setFontSize(calk.res.toString().length > maxSize ?
                baseFontSize / (calk.res.toString().length / maxSize)
                : baseFontSize);
        }
    }

    return (
        <div className={"calk"}>
            <div className={"display"} style={{fontSize: `${fontSize}px`}}>
                {calk.num ? calk.num : calk.res}
            </div>
            <div className={"buttonBox"}>
                {namesButtons.map((btn, i) =>
                    <Button
                        value={btn}
                        key ={i}
                        className={btn === "=" ? "equality" : ""}
                        onClick={
                            isFinite(btn) ? numClickHandler
                                : btn === "C" ? clearClickHandler
                                    : btn === "+/-" ? invertClickHandler
                                        : btn === "%" ? procentClickHandler
                                            : btn === "." ? commaClickHandler
                                                : signClickHandler
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default App;
