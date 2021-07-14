import React, {useState} from 'react';

import {evaluate} from "mathjs";

import {ThemeProvider} from 'styled-components';

import {oneTheme, twoTheme, threeTheme} from './theme';

import {GlobalStyles} from "./global";

import {
    Box, BoxInput, BoxLabel, Button, Container, Desc, Display, Head, Input, Keyboard, Row, Switcher, Theme, Title
} from "./styled-components";

function App() {

    const [themeColor, setThemeColor] = useState(oneTheme);

    const [display, setDisplay] = useState("0");

    const [isPoint, setIsPoint] = useState(false);

    const [isEqual, setIsEqual] = useState(false);

    const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.'];

    const handleKeyDown = (event) => {
        event.preventDefault();
        const current = event.key;

        if (values.includes(current)) {
            let value = current;

            if (display.length === 1 && display[0] === '0') {
                setDisplay(value)
            } else if (isEqual) {
                setDisplay(value)
            } else {
                setDisplay(prev => prev.toString().concat(value))
            }
        }

    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function numb(number) {
        if (display === 'error') {
            setDisplay(number)
        } else if (display.length === 1 && display[0] === '0') {
            setDisplay(number)
        } else if (isEqual) {
            setIsEqual(false)
            setDisplay(number)
        } else {
            setDisplay((prev) => prev.toString().concat(number))
        }
    }

    function setPoint(sign) {

        if (isEqual && display.toString().includes(sign)) {
            setIsPoint(true)
            setIsEqual(false);
        } else if (!isPoint) {
            setDisplay((prev) => prev.toString().concat(sign))
            setIsPoint(true)
        } else {
            setIsPoint(false)
        }
    }

    function action(sign) {
        if (display[display.length - 1] === '+'
            || display[display.length - 1] === '-'
            || display[display.length - 1] === '*'
            || display[display.length - 1] === '/') {
            setDisplay((prev) => prev.toString().slice(0, display.length - 1).concat(sign))
        } else if (isEqual) {
            setIsEqual(false);
            setDisplay((prev) => prev.toString().concat(sign))
        } else {
            if (display.length === 1 && display[0] === "0" && sign === "-" || display === 'error') {
                setDisplay(sign)
            } else {
                setDisplay((prev) => prev.toString().concat(sign))
            }
        }
        setIsPoint(false)
    }

    function reset() {
        setDisplay("0");
        setIsEqual(false)
        setIsPoint(false)
    }

    function del() {
        if (display.length === 1 || display === 'error') {
            setDisplay('0')
            setIsPoint(false)
        } else if (display[display.length - 1] === ".") {
            setIsPoint(false)
            setDisplay(String(display).slice(0, -1))
        } else if (isEqual && display.toString().includes('.')) {
            setIsPoint(true)
            setDisplay(String(display).slice(0, -1))
        } else {
            setDisplay(String(display).slice(0, -1))
        }
    }

    function equal() {
        try {
            setDisplay(evaluate(display.toString()));
            setIsEqual(true);
        }
        catch (equ) {
           setDisplay('error')
        }
    }

    const triggerToggle = (e) => {

        let name = e.target.value;

        switch (name) {

            case 'oneTheme':
                setThemeColor(oneTheme);
                break;

            case 'twoTheme':
                setThemeColor(twoTheme);
                break;

            case 'threeTheme':
                setThemeColor(threeTheme);
                break;

            default:
                setThemeColor(oneTheme);
                break;
        }
    }

    return (
        <ThemeProvider theme={themeColor}>

            <GlobalStyles/>

            <Container>

                <Head>

                    <Title>calc</Title>

                    <Switcher>
                        <Desc>theme</Desc>

                        <Theme onChange={triggerToggle}>
                            <BoxLabel>
                                <label className="btn btn-primary" htmlFor="one">1</label>

                                <label className="btn btn-primary" htmlFor="two">2</label>

                                <label className="btn btn-primary" htmlFor="three">3</label>
                            </BoxLabel>

                            <BoxInput style={{backgroundColor: themeColor.switcher, color: themeColor.text}}>

                                <Input inputColor={themeColor.input} defaultChecked name="options" value="oneTheme"
                                       id="one"/>

                                <Input inputColor={themeColor.input} name="options" value="twoTheme" id="two"/>

                                <Input inputColor={themeColor.input} name="options" value="threeTheme" id="three"/>

                            </BoxInput>
                        </Theme>
                    </Switcher>
                </Head>

                <Display style={{backgroundColor: themeColor.display, color: themeColor.text}}>
                    {display}
                </Display>

                <Keyboard style={{backgroundColor: themeColor.display}}>
                    <Box>
                        <Button
                            onClick={() => numb('7')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >7</Button>

                        <Button
                            onClick={() => numb('8')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >8</Button>

                        <Button
                            onClick={() => numb('9')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >9</Button>

                        <Button
                            onClick={() => del()}
                            style={{
                                backgroundColor: themeColor.buttonSecondary,
                                color: themeColor.buttonSecondaryColor,
                                borderBottom: themeColor.buttonSecondaryBorder
                            }}
                        >DEL</Button>

                        <Button
                            onClick={() => numb('4')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >4</Button>

                        <Button
                            onClick={() => numb('5')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >5</Button>

                        <Button
                            onClick={() => numb('6')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >6</Button>

                        <Button
                            onClick={() => action('+')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >+</Button>

                        <Button
                            onClick={() => numb('1')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >1</Button>

                        <Button
                            onClick={() => numb('2')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >2</Button>

                        <Button
                            onClick={() => numb('3')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >3</Button>

                        <Button
                            onClick={() => action('-')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >-</Button>

                        <Button
                            onClick={() => setPoint('.')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >.</Button>

                        <Button
                            onClick={() => numb('0')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >0</Button>

                        <Button
                            onClick={() => action('/')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >/</Button>

                        <Button
                            onClick={() => action('*')}
                            style={{
                                backgroundColor: themeColor.buttonPrimary,
                                color: themeColor.buttonPrimaryColor,
                                borderBottom: themeColor.buttonPrimaryBorder
                            }}
                        >x</Button>
                    </Box>

                    <Row>
                        <Button
                            onClick={() => reset()}
                            style={{
                                backgroundColor: themeColor.buttonSecondary,
                                color: themeColor.buttonSecondaryColor,
                                borderBottom: themeColor.buttonSecondaryBorder
                            }}
                        >RESET</Button>

                        <Button
                            onClick={() => equal()}
                            style={{
                                backgroundColor: themeColor.buttonDefault,
                                color: themeColor.buttonDefaultColor,
                                borderBottom: themeColor.buttonDefaultBorder
                            }}
                        >=</Button>

                    </Row>
                </Keyboard>

            </Container>

        </ThemeProvider>
    );
}

export default App;
