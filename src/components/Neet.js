import React, { useEffect, useState } from 'react'
import {
    Box,
    Button, CssBaseline, Grid, makeStyles, Paper, Snackbar, styled, Table,
    TableCell, TableContainer, TableRow, Typography, useTheme,
    FormControl, RadioGroup, FormControlLabel, Radio
} from "@material-ui/core";
import ArrowBack from '@material-ui/icons/NavigateBeforeOutlined';
import ArrowNext from '@material-ui/icons/NavigateNextOutlined';
import MuiAlert from "@material-ui/lab/Alert";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const useStyle = makeStyles((theme) => ({
    table: {
        backgroundColor:
            "transparent",
        minwidth: "30em",

        // maxHeight: "60vh",

        "& .MuiTableCell-root": {
            padding: "16px 10px",
            border: "none"

        },
        "& span": {
            background: "#e3e3e3",
            width: "35px",
            display: "inline-block",
            textAlign: "center",
            padding: "8px",
            borderRadius: "3px",
            color: "#fff"
        }
    },
    questionList: {
        width: "100%",
        height: "300px",
        overflowY: "scroll",
        marginTop: "2em",

        "& ul": {
            padding: "0 1.5em"
        },

        "& li": {
            background: "#e3e3e3",
            width: "35px",
            display: "inline-block",
            textAlign: "center",
            padding: "8px",
            borderRadius: "3px",
            margin: "4px",
        },
    }
}));

let data = {
    "questions": [
        {
            "question": "What is the scientific name of a butterfly?",
            "answers": [
                "Apis",
                "Coleoptera",
                "Formicidae",
                "Rhopalocera"
            ],
            "correctIndex": 3
        },
        {
            "question": "How hot is the surface of the sun?",
            "answers": [
                "1,233 K",
                "5,778 K",
                "12,130 K",
                "101,300 K"
            ],
            "correctIndex": 1
        },
        {
            "question": "Who are the actors in The Internship?",
            "answers": [
                "Ben Stiller, Jonah Hill",
                "Courteney Cox, Matt LeBlanc",
                "Kaley Cuoco, Jim Parsons",
                "Vince Vaughn, Owen Wilson"
            ],
            "correctIndex": 3
        },
        {
            "question": "What is the capital of Spain?",
            "answers": [
                "Berlin",
                "Buenos Aires",
                "Madrid",
                "San Juan"
            ],
            "correctIndex": 2
        },
        {
            "question": "What are the school colors of the University of Texas at Austin?",
            "answers": [
                "Black, Red",
                "Blue, Orange",
                "White, Burnt Orange",
                "White, Old gold, Gold"
            ],
            "correctIndex": 2
        },
        {
            "question": "What is 70 degrees Fahrenheit in Celsius?",
            "answers": [
                "18.8889",
                "20",
                "21.1111",
                "158"
            ],
            "correctIndex": 2
        },
        {
            "question": "When was Mahatma Gandhi born?",
            "answers": [
                "October 2, 1869",
                "December 15, 1872",
                "July 18, 1918",
                "January 15, 1929"
            ],
            "correctIndex": 0
        },
        {
            "question": "How far is the moon from Earth?",
            "answers": [
                "7,918 miles (12,742 km)",
                "86,881 miles (139,822 km)",
                "238,400 miles (384,400 km)",
                "35,980,000 miles (57,910,000 km)"
            ],
            "correctIndex": 2
        },
        {
            "question": "What is 65 times 52?",
            "answers": [
                "117",
                "3120",
                "3380",
                "3520"
            ],
            "correctIndex": 2
        },
        {
            "question": "How tall is Mount Everest?",
            "answers": [
                "6,683 ft (2,037 m)",
                "7,918 ft (2,413 m)",
                "19,341 ft (5,895 m)",
                "29,029 ft (8,847 m)"
            ],
            "correctIndex": 3
        },
        {
            "question": "When did The Avengers come out?",
            "answers": [
                "May 2, 2008",
                "May 4, 2012",
                "May 3, 2013",
                "April 4, 2014"
            ],
            "correctIndex": 1
        },
        {
            "question": "What is 48,879 in hexidecimal?",
            "answers": [
                "0x18C1",
                "0xBEEF",
                "0xDEAD",
                "0x12D591"
            ],
            "correctIndex": 1
        }
    ]
}
export default function Neet() {
    const theme = useTheme();
    const classes = useStyle()



    const [question, setQuestion] = useState(data);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [saveMark, setSaveMark] = useState(0);
    const [optionSave, setOptionSave] = useState(false);




    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    data.questions = data.questions.map(item => ({
        ...item,
        selectedAnswer: '',
    }))


    // useEffect(() => {
    //     setCurrentQuestion(currentQuestion)
    // }, [currentQuestion])
    // const handleShowData = () => {
    //     let ds = { ...question }
    //     ds.questions = ds.questions.map((item, idx) => (
    //         {
    //             ...item,
    //             isVisible: idx == currentQuestion ? true : false
    //         }))
    //     setQuestion(ds)
    // };


    const handleSaveNext = () => {
        let nextQuestion = currentQuestion + 1;

        if (question.questions[currentQuestion].selectedAnswer !== "") {
            if (nextQuestion < question.questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setOptionSave(true);
                console.log("sas", optionSave)
            } else {
                setMessage("No Question Available")
                setOpen(true);
                setStatus("warning")
            }
        } else {
            setMessage("Please select option")
            setOpen(true);
            setStatus("warning")
        }

        console.log("set", question)
        // handleShowData()
    };


    const handleSaveMark = () => {
        let nextQuestion = currentQuestion + 1;

        if (question.questions[currentQuestion].selectedAnswer !== "") {
            if (nextQuestion < question.questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setSaveMark(nextQuestion)
            } else {
                setMessage("No Question Available")
                setOpen(true);
                setStatus("warning")
            }
        } else {
            setMessage("Please select option")
            setOpen(true);
            setStatus("warning")
        }
    };






    const handleNext = () => {
        console.log(currentQuestion)
        let next = currentQuestion + 1;


        if ((currentQuestion + 1) < question.questions.length) {
            setCurrentQuestion(next);

        } else {
            setMessage("No Question Available")
            setOpen(true);
            setStatus("warning")
        }
        //setCurrentQuestion(nextQuestion);
        // handleShowData()
        console.log("yu", currentQuestion)
    }

    const handlePrev = () => {

        const prevQueston = currentQuestion - 1;
        console.log("yu", currentQuestion)
        if (prevQueston <= question.questions.length && prevQueston >= 0) {
            setCurrentQuestion(() => prevQueston);

        } else {
            setMessage("Click Next")
            setOpen(true);
            setStatus("warning")
        }
        // handleShowData()
    };

    const handleSubmit = () => {
        console.log(question)
    };




    const handleChange = (e, idx, q) => {
        let ds = { ...question }
        ds.questions = ds.questions.map(item => (
            item.question == q ?
                {
                    ...item,
                    selectedAnswer: e.target.value,
                } : item))

        setQuestion(ds)
        console.log("sas", optionSave)
    };

    const handleClear = () => {
        let ds = { ...question }
        ds.questions = ds.questions.map((item, idx) => ({
            ...item,
            selectedAnswer: idx == currentQuestion ? "" : item.selectedAnswer
        }))
        setQuestion(ds)
    }



    return (
        <>
            <CssBaseline />
            <Grid
                container
                style={{
                    ...theme.typography.mainContainer,
                    padding: "0 2em",
                }}
            >
                <Grid
                    container
                    style={{ marginTop: "2em", marginBottom: "1.5em" }}
                    spacing={2}
                    justifyContent="space-between"
                >
                    <Grid item container sm={7} direction="column" >
                        <Typography variant="h6" style={{ fontWeight: "700" }}>Question {currentQuestion + 1}:</Typography>
                        <Grid container
                            direction="column"
                            component={Paper}
                            justifyContent="space-between"
                            style={{
                                width: "100%",
                                height: "300px",
                                overflowY: "scroll",
                                padding: "1.5em"
                            }}>
                            {/* <ul style={{
                                listStyle: "none",
                                padding: "0"
                            }}>
                                {question.questions.map((item, index) => (
                                    item.isVisible == true &&
                                    <li>
                                        <Typography varient="h6">{item.question}</Typography>
                                        <Grid style={{ paddingBottom: "1.5em" }} >
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    name={"answer_" + index}
                                                    key={`radio-${index}`}
                                                >
                                                    {item.answers.map((el, idx) => (
                                                        <FormControlLabel
                                                            onChange={(e) => handleChange(e, idx, item.question)}
                                                            key={`radio-${idx}`}
                                                            value={el}
                                                            control={<Radio color="primary" size="small" />}
                                                            label={el}
                                                            name={"answer_" + index}
                                                            checked={item.selectedAnswer == el}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>
                                    </li>
                                ))}
                            </ul> */}
                            <ul style={{
                                listStyle: "none",
                                padding: "0"
                            }}>
                                <li key={question.questions[currentQuestion]}>
                                    <Typography variant="subtitle1">{question.questions[currentQuestion].question}</Typography>
                                    <Grid style={{ paddingBottom: "1.5em" }} >
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="answer" name="row-radio-buttons-group">
                                                {question.questions[currentQuestion].answers.map((el, idx) => (
                                                    <FormControlLabel
                                                        onChange={(e) => handleChange(e, idx, question.questions[currentQuestion].question)}
                                                        key={`radio-${idx}`}
                                                        value={el}
                                                        control={<Radio color="primary" size="small" />}
                                                        label={el}
                                                        name={"answer_" + idx}
                                                        checked={question.questions[currentQuestion].selectedAnswer == el}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </li>
                            </ul>

                        </Grid>
                        <Grid container justifyContent="space-around"
                            style={{
                                marginTop: "1.5em",
                                borderTop: "1px solid #000",
                                paddingTop: "1em"
                            }}>
                            <Button variant="contained"
                                style={{
                                    background: theme.palette.success.main,
                                    color: "#fff",
                                }}
                                onClick={handleSaveNext}
                            >
                                Save & Next
                            </Button>
                            <Button variant="outlined"
                                onClick={handleClear}
                            >Clear</Button>
                            <Button variant="contained"
                                style={{
                                    background: theme.palette.warning.main,
                                    color: "#fff",
                                }}
                                onClick={handleSaveMark}
                            >
                                Save & Mark For Review
                            </Button>
                            <Button variant="contained"
                                style={{
                                    background: theme.palette.primary.main,
                                    color: "#fff",
                                }}
                                onClick={handleNext}
                            >
                                Mark For Review & Next
                            </Button>
                        </Grid>
                        <Grid container justifyContent="space-between"
                            style={{
                                marginTop: "1.5em",
                                borderTop: "1px solid #000",
                                paddingTop: "1em"
                            }}>
                            <Grid item container sm={3} justifyContent="space-between">
                                <Button variant="contained" onClick={handlePrev}>
                                    <ArrowBack />
                                </Button>
                                <Button variant="contained" onClick={handleNext}>
                                    <ArrowNext />
                                </Button>
                            </Grid>
                            <Grid item sm={9} dir="rtl">
                                <Button variant="contained"
                                    onClick={handleSubmit}
                                    style={{
                                        background: theme.palette.success.main,
                                        color: "#fff",
                                    }}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container component={Paper} sm={4} style={{ padding: "0px" }}>
                        <TableContainer style={{ padding: "2em", border: "2px dotted #000" }}>
                            <Table className={classes.table}>
                                <TableRow>
                                    <TableCell>
                                        <span style={{ color: "#000" }}>{question.questions.length}</span>
                                    </TableCell>
                                    <TableCell>Not Visited</TableCell>
                                    <TableCell>
                                        <span
                                            style={{
                                                background: "#e44501",
                                                clipPath: "polygon(0 0, 100% 17%, 100% 83%, 0 100%)"
                                            }}
                                        >0</span>
                                    </TableCell>
                                    <TableCell>Not Answered</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span
                                            style={{
                                                background: "#2cc300",
                                                clipPath: "polygon(0 0, 100% 17%, 100% 83%, 0 100%)"
                                            }}
                                        >0</span>
                                    </TableCell>
                                    <TableCell>Answered</TableCell>
                                    <TableCell>
                                        <span
                                            style={{
                                                background: "#683dac",
                                                borderRadius: "50%"
                                            }}
                                        >0</span>
                                    </TableCell>
                                    <TableCell>Marked for Review</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span
                                            style={{
                                                background: "#683dac",
                                                borderRadius: "50%"
                                            }}
                                        >{saveMark}</span>
                                    </TableCell>
                                    <TableCell colSpan={3}>Answered & Marked for Review (will be considered for evaluation)</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>

                        <Box className={classes.questionList}>
                            <ul>
                                {question.questions.map((item, idx) => (
                                    <li key={idx + 1}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: optionSave == true &&
                                            question.questions[idx].selectedAnswer != "" ?  
                                            theme.palette.success.main : "#e3e3e3"
                                        }}
                                        onClick={() => setCurrentQuestion(idx)}>{idx + 1}
                                    </li>
                                ))}
                            </ul>
                        </Box>

                    </Grid>
                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                autoHideDuration={4500}
                onClose={() => setOpen(false)}
            >
                <Alert severity={status}>{message}</Alert>
            </Snackbar>
        </>
    )
}