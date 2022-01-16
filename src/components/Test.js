import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme, withStyles } from '@material-ui/styles'
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    Toolbar,
    Typography,
    Box, Paper, Snackbar, Table,
    TableCell, TableContainer, TableRow,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Backdrop,
    CircularProgress,
    TextField,
    MenuItem,
    Avatar,
    Checkbox,
    FormGroup,
    TableHead,
    TableBody,
    Dialog,
    DialogContent,
    DialogActions
} from '@material-ui/core'

import CloseButton from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat"
import ArrowBack from '@material-ui/icons/NavigateBeforeOutlined';
import ArrowNext from '@material-ui/icons/NavigateNextOutlined';
import MuiAlert from "@material-ui/lab/Alert";
import NumberFormat from 'react-number-format';
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import useNetworkStatus from "./NetworkStatus"
import logo from '../images/logo.svg'
import { DataList } from './DataList';


const useStyle = makeStyles((theme) => ({
    subContainer: {
        ...theme.typography.subContainer,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 99,
        background: "#a1dde5",
        height: "auto",
        width: "100vw",
        padding: "4px 0"
    },
    description: {
        "& h4, & p": {
            margin: "0"
        }
    },
    table: {

        "& .MuiTableCell-root": {
            padding: "6px",
            border: "none"

        },
        "& span": {
            background: "#e3e3e3",
            width: "22px",
            display: "inline-block",
            textAlign: "center",
            padding: "8px",
            borderRadius: "3px",
            color: "#fff"
        }
    },
    profileImg: {
        height: theme.spacing(9),
        width: theme.spacing(9),
    },
    questionList: {
        width: "100%",
        height: "200px",
        overflowY: "scroll",
        marginTop: "2em",

        "& ul": {
            padding: "0 1.5em"
        },

        "& li": {
            background: "#e3e3e3",
            width: "20px",
            display: "inline-block",
            textAlign: "center",
            padding: "8px",
            borderRadius: "3px",
            margin: "4px",
        },
    },

    internetStatus: {
        "& .MuiDialog-paperWidthSm": {
            width: "800px"
        }
    }
}))



const styles = (theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.common.black,
    },
    DialogHeader: {
        backgroundColor: theme.palette.common.ltgrey,
    },
});


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    const theme = useTheme();
    return (
        <MuiDialogTitle
            disableTypography
            {...other}
            className={classes.DialogHeader}
        >
            <Typography variant="h5">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon style={{ color: theme.palette.common.tabFont }} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const HeaderAppBar = (props) => {
    const classes = useStyle();
    const [shawAlert, setShawAlert] = useState(false)

    return (
        <>
            <AppBar position="sticky" className={classes.appBar} color="secondary">
                <Toolbar>
                    <Grid item container alignItems="center" justify="space-between">
                        <Grid item sm={4} container direction='row' spacing={3} >
                            <Grid item>
                                <Avatar
                                    alt="profle"
                                    className={classes.profileImg}
                                >
                                    <img src={logo} alt="profle" />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle1'>Candidate Name : <strong>Shankar Yadav</strong></Typography>
                                <Typography variant='subtitle1'>Exam Name : <strong>IIT JEE</strong></Typography>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>IIT JEE 2022</Typography>
                        </Grid>
                        <Grid item container sm={4} justify='flex-end' alignItems='center'>
                            <Grid item style={{ flex: "auto" }}>
                                <Typography variant='body1'
                                    style={{
                                        width: "200px",
                                        backgroundColor: "green",
                                        padding: "3px 2px",
                                        textAlign: "center",
                                        borderRadius: "24px",
                                        color: "#fff"
                                    }}
                                >Remaining Time: {props.count > 0 ? <>{`0${props.hours}`}:{props.minutes < 10 ? `0${props.minutes}` : props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds} </> : "Time Over"}</Typography>
                            </Grid>
                            <Grid item>
                                <img
                                    src={logo}
                                    alt="logo"
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => setShawAlert(true)}>
                                    <CloseButton />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Dialog
                open={shawAlert}
                aria-labelledby="customized-dialog-title"
                className={classes.internetStatus}
                onClose={() => setShawAlert(false)}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => setShawAlert(false)}>
                    Leave Exam ?
                </DialogTitle>
                <DialogContent>
                    <Grid item container style={{ margin: "1.5em" }}>
                        <Typography variant='h5'>Are sure you want to leave exam!</Typography>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => setShawAlert(false)}
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ color: "white" }}
                        onClick={() => props.handleFinalSubmit()}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};



const FinalResultPage = (props) => {
    const classes = useStyle();
    const theme = useTheme();
    const [subjectWiseData, setSubjectWiseData] = useState([])


    const headers = [
        "Subject Name",
        "No. of Question",
        "Answered",
        "Not Answered",
        "Marked for Review",
        "Answered & Marked for Review (will considered for evaluation)",
        "Not Visited"
    ];

    useEffect(() => {
        let filterData = [];
        let data = [...subjectWiseData]

        for (let i = 0; i < props.subjectList.length; i++) {
            filterData[i] = props.questionsList.filter(x => x.subjectId === props.subjectList[i].subjectId)
            data.push({
                noOfQuestion: 0,
                subjectName: "",
                answered: 0,
                notAnswered: 0,
                reviwed: 0,
                visited: 0,
                answerReview: 0
            })
            data[i].noOfQuestion = filterData[i].length;
            data[i].subjectName = props.subjectList[i].subjectName;
            data[i].answered = filterData[i].filter(x => x.answered === true).length;
            data[i].notAnswered = filterData[i].filter(x => x.notAnswered === true).length;
            data[i].reviwed = filterData[i].filter(x => x.reviwed === true).length;
            data[i].answerReview = filterData[i].filter(x => x.answerReview === true).length;
            data[i].visited = filterData[i].filter(x => x.visited === false).length;
        }
        setSubjectWiseData(data);
    }, []);



    return (
        <>
            <Grid item container style={{ backgroundColor: "#fafdfe", }}>
                <Grid item container style={{ margin: "1em" }}>
                    <Typography variant='h5' style={{ fontWeight: "bold" }}>Exam Summary</Typography>
                    <Grid item style={{ margin: "2em 0" }} sm={12}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {headers.map((head, index) => (
                                            <TableCell key={index}>{head}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subjectWiseData.map((item, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{item.subjectName}</TableCell>
                                            <TableCell>{item.noOfQuestion}</TableCell>
                                            <TableCell>{item.answered}</TableCell>
                                            <TableCell>{item.notAnswered}</TableCell>
                                            <TableCell>{item.reviwed}</TableCell>
                                            <TableCell>{item.answerReview}</TableCell>
                                            <TableCell>{item.visited}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item alignItems='center' style={{ textAlign: "center", margin: "2em auto" }}>
                        <Typography variant='h4' style={{ fontWeight: "bold" }}>
                            Are you sure you want to submit for final Marking ? <br />
                            No Changes will be allowed after submission
                        </Typography>
                        <Grid item container justify='space-evenly' style={{ marginTop: "2em" }}>
                            <Button color="secondary" variant='outlined' onClick={props.handleFinalSubmit} >Yes</Button>
                            <Button color="secondary" variant='contained' onClick={() => props.setResultPage(false)}>No</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};


export default function Neet() {
    const classes = useStyle();
    const theme = useTheme();
    const [myLoader, setMyLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [backLoader, setBackLoader] = useState(false);
    const [questionsList, setQuestionsList] = useState(DataList);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectAns, setSelectedAns] = useState(0);
    const [notVisited, setNotVisited] = useState(0);
    const [notAnswer, setNotAnswer] = useState(0);
    const [markReview, setMarkedReview] = useState(0);
    const [markedSaveReviewed, setMarkSaveRevewed] = useState(0);
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0)
    const [count, setCount] = useState(DataList[0].examTime);
    const [resultPage, setResultPage] = useState(false);
    const [timeTaken, setTimeTaken] = useState(DataList[0].timeTaken);




    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const networkStatus = useNetworkStatus()

    const secondsToTime = (secs) => {
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        return {
            h: hours,
            m: minutes,
            s: seconds
        };
    }
    useEffect(() => {
        if (count >= 0 && networkStatus === true) {
            const secondsLeft = setInterval(() => {
                setCount((c) => c - 1);
                let timeLeftVar = secondsToTime(count);
                setHours(timeLeftVar.h);
                setMinutes(timeLeftVar.m);
                setSeconds(timeLeftVar.s);
            }, 1000);
            return () => clearInterval(secondsLeft);
        } else {
            console.log("timeout");
        }
    }, [count, networkStatus]);

    useEffect(() => {
        if (questionsList.length > 0 && count < 1) {
            setMessage("Exam Time Over.")
            setOpen(true);
            setStatus("warning")
            setTimeout(() => {
                handleFinalSubmit();
            }, 2000)
        }
    }, [count])





    useEffect(() => {
        setBackLoader(true)
        setMyLoader(true);
        try {
            DataList.map((i, x) => ({
                ...i,
                visible: x === 0 ? true : false,
            }))
            setQuestionsList(DataList)
            setCount(DataList[0].examTime)
            setTimeTaken(DataList[0].timeTaken)
            setBackLoader(false);
            setMyLoader(false);

            let subjectData = []
            subjectData = DataList.map(item => ({
                subjectId: item.subjectId,
                subjectName: item.subjectName
            })).filter((item, index, arr) => arr.findIndex(obj => obj.subjectId === item.subjectId) === index)
            setSubjectList(subjectData)
        } catch (error) {
            console.log(error)
            setTimeout(() => {
                setMyLoader(false);
            }, 1000);
        }
    }, []);



    useEffect(() => {
        let interval = null;
        if (questionsList.length > 0) {
            if (networkStatus) {
                interval = setInterval(() => {
                    setTimeTaken(t => t + 1);
                }, 1000);
            } else {
                clearInterval(interval)
            }
        }
        return () => clearInterval(interval);
    }, [questionsList, networkStatus])

    useEffect(() => {
        if (questionsList.length > 0) {
            setTimeTaken(questionsList[currentQuestion].timeTaken)
        }
    }, [currentQuestion])



    useEffect(() => {
        let answered = questionsList.map((x => x.answered)).filter((item, index) => item === true).length;
        let notVisited = questionsList.map((x => x.visited)).filter(item => item === false).length;
        let notAnswered = questionsList.map((x => x.notAnswered)).filter(item => item === true).length;
        let markedReviewed = questionsList.map((x => x.reviwed)).filter(item => item === true).length;
        let markedSaveReviewed = questionsList.map((x => x.answerReview)).filter(item => item === true).length;

        setSelectedAns(answered)
        setNotVisited(notVisited);
        setNotAnswer(notAnswered);
        setMarkedReview(markedReviewed);
        setMarkSaveRevewed(markedSaveReviewed)
    }, [questionsList]);



    useEffect(() => {
        let currentIndex = 0;
        let filterData = [...questionsList];
        let isVisible = [...questionsList];
        if (questionsList.length > 0 && selectedSubject != 0) {
            filterData = questionsList.filter((x, i) => x.subjectId === selectedSubject);
            currentIndex = filterData[0].serialNo - 1;
            setCurrentQuestion(currentIndex)
            isVisible = questionsList.map((i, x) => ({
                ...i,
                visible: x === currentIndex ? true : false,
            }));
        } else if (questionsList.length > 0 && selectedSubject == 0) {
            currentIndex = questionsList[0].serialNo - 1;
            setCurrentQuestion(currentIndex)
            isVisible = questionsList.map((i, x) => ({
                ...i,
                visible: x === currentIndex ? true : false,
            }));
        }
        setQuestionsList(isVisible)
    }, [selectedSubject])




    const handlePrev = () => {
        let isVisible = [...questionsList];
        const prevQueston = currentQuestion - 1;
        if (prevQueston <= questionsList.length && prevQueston >= 0) {
            setCurrentQuestion(prevQueston);
            isVisible = questionsList.map((i, x) => ({
                ...i,
                visible: x === prevQueston ? true : false,
            }));
            let mcq = isVisible[currentQuestion].mcq.map(x => ({
                ...x,
                checked: false
            }))
            isVisible[currentQuestion].mcq = mcq;
            if (
                isVisible[currentQuestion].answered === false &&
                isVisible[currentQuestion].answerReview === false &&
                isVisible[currentQuestion].reviwed === false &&
                isVisible[currentQuestion].answerReview === false
            ) {
                isVisible[currentQuestion].visited = true;
                isVisible[currentQuestion].notAnswered = true;
                isVisible[currentQuestion].timeTaken = timeTaken;
            }

            setQuestionsList(isVisible)
        } else {
            setMessage("Click Next")
            setOpen(true);
            setStatus("warning")
        }
    };

    const handleNext = () => {
        let isVisible = [...questionsList];
        let next = currentQuestion + 1;
        if (next < questionsList.length) {
            setCurrentQuestion(next);
            isVisible = questionsList.map((i, x) => ({
                ...i,
                visible: x === next ? true : false,
            }));
            let mcq = isVisible[currentQuestion].mcq.map(x => ({
                ...x,
                checked: false
            }))
            isVisible[currentQuestion].mcq = mcq;
            if (
                isVisible[currentQuestion].answered === false &&
                isVisible[currentQuestion].answerReview === false &&
                isVisible[currentQuestion].reviwed === false &&
                isVisible[currentQuestion].answerReview === false
            ) {
                isVisible[currentQuestion].visited = true;
                isVisible[currentQuestion].notAnswered = true;
                isVisible[currentQuestion].timeTaken = timeTaken;
            }
            setQuestionsList(isVisible)
        } else {
            setMessage("No Question Available")
            setOpen(true);
            setStatus("warning")
        }
    };

    const handleMarkNext = () => {
        let isVisible = [...questionsList];
        let next = currentQuestion + 1;
        if (next < questionsList.length) {
            setCurrentQuestion(next);
            isVisible = questionsList.map((i, x) => ({
                ...i,
                visible: x === next ? true : false,
            }));
            let mcq = isVisible[currentQuestion].mcq.map(x => ({
                ...x,
                checked: false
            }))
            isVisible[currentQuestion].mcq = mcq;
            isVisible[currentQuestion].visited = true;
            isVisible[currentQuestion].reviwed = true;
            isVisible[currentQuestion].answer = "";
            isVisible[currentQuestion].answered = false;
            isVisible[currentQuestion].notAnswered = false;
            isVisible[currentQuestion].answerReview = false;
            isVisible[currentQuestion].timeTaken = timeTaken;
        } else if (currentQuestion === questionsList.length - 1) {
            isVisible[currentQuestion].visited = true;
            isVisible[currentQuestion].reviwed = true;
            isVisible[currentQuestion].answer = "";
            isVisible[currentQuestion].answered = false;
            isVisible[currentQuestion].notAnswered = false;
            isVisible[currentQuestion].answerReview = false;
            isVisible[currentQuestion].timeTaken = timeTaken;
        } else {
            setMessage("No Question Available")
            setOpen(true);
            setStatus("warning")
        }

        setQuestionsList(isVisible)
    };

    const handleSaveMarkReview = () => {
        let nextQuestion = currentQuestion + 1;
        let isVisible = [...questionsList];
        let checkedValue = []
        checkedValue = questionsList[currentQuestion].mcq.map(x => x.checked).filter(y => y === true);
        if (
            (questionsList[currentQuestion].identifierId !== 16 && questionsList[currentQuestion].answer !== "") ||
            (questionsList[currentQuestion].identifierId === 16 && checkedValue.length !== 0)
        ) {
            if (nextQuestion < questionsList.length) {
                setCurrentQuestion(nextQuestion);
                isVisible = questionsList.map((i, x) => ({
                    ...i,
                    visible: x === nextQuestion ? true : false,
                }));
                isVisible[currentQuestion].visited = true;
                isVisible[currentQuestion].reviwed = false;
                isVisible[currentQuestion].answered = false;
                isVisible[currentQuestion].notAnswered = false;
                isVisible[currentQuestion].answerReview = true;
                isVisible[currentQuestion].timeTaken = timeTaken;

            } else if (currentQuestion === questionsList.length - 1) {
                isVisible[currentQuestion].visited = true;
                isVisible[currentQuestion].reviwed = false;
                isVisible[currentQuestion].answered = false;
                isVisible[currentQuestion].notAnswered = false;
                isVisible[currentQuestion].answerReview = true;
                isVisible[currentQuestion].timeTaken = timeTaken;
                setMessage("No Question Available")
                setOpen(true);
                setStatus("warning")
            }
        } else {
            setMessage("Please select option")
            setOpen(true);
            setStatus("warning")
        }
        setQuestionsList(isVisible)
    }



    const handleSaveNext = () => {
        let nextQuestion = currentQuestion + 1;
        let isVisible = [...questionsList];
        setTimeTaken(isVisible[currentQuestion].timeTaken)
        let checkedValue = []
        checkedValue = questionsList[currentQuestion].mcq.map(x => x.checked).filter(y => y === true);
        if (
            (questionsList[currentQuestion].identifierId !== 16 && questionsList[currentQuestion].answer !== "") ||
            (questionsList[currentQuestion].identifierId === 16 && checkedValue.length !== 0)
        ) {
            if (nextQuestion < questionsList.length) {
                setCurrentQuestion(nextQuestion);
                isVisible = questionsList.map((i, x) => ({
                    ...i,
                    visible: x === nextQuestion ? true : false,
                }));
                isVisible[currentQuestion].answered = true
                isVisible[currentQuestion].visited = true;
                isVisible[currentQuestion].notAnswered = false;
                isVisible[currentQuestion].reviwed = false;
                isVisible[currentQuestion].answerReview = false;
                isVisible[currentQuestion].timeTaken = timeTaken;
            } else if (currentQuestion === questionsList.length - 1) {
                isVisible[currentQuestion].answered = true
                isVisible[currentQuestion].visited = true;
                isVisible[currentQuestion].notAnswered = false;
                isVisible[currentQuestion].reviwed = false;
                isVisible[currentQuestion].answerReview = false;
                setMessage("No Question Available")
                setOpen(true);
                setStatus("warning")
            }
        } else {
            setMessage("Please select option")
            setOpen(true);
            setStatus("warning")
        }

        setQuestionsList(isVisible)
        console.log(questionsList)
    };

    const handleChange = (e, q) => {
        console.log(e.target.value)
        let selectedAns = questionsList.map((item, index) => (
            item.question == q ? {
                ...item,
                answer: e.target.value,
            } : item))
        setQuestionsList(selectedAns);
    };

    const handleClear = () => {
        let isClear = [...questionsList]
        let mcq = isClear[currentQuestion].mcq.map(x => ({
            ...x,
            checked: false
        }))
        isClear[currentQuestion].mcq = mcq;
        isClear[currentQuestion].answer = "";
        isClear[currentQuestion].answered = false;
        isClear[currentQuestion].notAnswered = false;
        isClear[currentQuestion].reviwed = false;
        isClear[currentQuestion].answerReview = false;

        setQuestionsList(isClear)
    };



    const handleFinalSubmit = () => {
        setMessage("Exam successfully submited");
        setStatus("success");
        setOpen(true)
    };


    return (
        <>
            <Grid
                item
                spacing={3}
                container
                direction='column'
                className={classes.subContainer}
            >
                <HeaderAppBar
                    minutes={minutes}
                    seconds={seconds}
                    hours={hours}
                    count={count}
                    handleFinalSubmit={handleFinalSubmit}
                />
                {resultPage === false ?

                    <Grid item container style={{ backgroundColor: "#ffffffb8", }}>
                        <Grid item container spacing={2} style={{ margin: "1em 0" }}>
                            <Grid item container sm={8}>
                                <Grid
                                    item
                                    direction='column'
                                    container
                                    component={Paper}
                                    justifyContent="space-between"
                                    style={{
                                        width: "100%",
                                        height: "450px",
                                        padding: "2em 2em 1em",
                                        position: "relative"
                                    }}
                                >
                                    {questionsList && questionsList.map((item, index) => (
                                        item.visible === true &&
                                        <>
                                            <Typography variant="h6" style={{ fontWeight: "700" }}>Question {index + 1}:</Typography>
                                            <ul style={{
                                                listStyle: "none",
                                                padding: "0",
                                            }}>
                                                <li style={{ overflowY: "scroll", paddingTop: "1em", height: "350px" }} className='customPdfScroll'>
                                                    <Grid item>
                                                        <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(item.paragraphDesc) }}></div>
                                                    </Grid>
                                                    <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(item.question) }}></div>
                                                    {item.identifierId === 18 || item.identifierId === 1 || item.identifierId === 19 || item.identifierId === 20 ?
                                                        <>
                                                            <Grid style={{ paddingBottom: "1.5em", paddingLeft: "1em" }} >
                                                                <FormControl component="fieldset">
                                                                    <RadioGroup row aria-label="answer" name="row-radio-buttons-group">
                                                                        {item.option.map((option, idx) => (
                                                                            <FormControlLabel
                                                                                onChange={(e) => handleChange(e, item.question)}
                                                                                key={idx}
                                                                                value={option}
                                                                                control={<Radio color="primary" size="small" />}
                                                                                label={<div dangerouslySetInnerHTML={{ __html: decodeURIComponent(option) }}></div>}
                                                                                name=""
                                                                                checked={item.answer === option}
                                                                            />
                                                                        ))}
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </Grid>
                                                        </>
                                                        : item.identifierId === 17 ?
                                                            <>
                                                                <Grid item sm={3}>
                                                                    <NumberFormat
                                                                        value={item.answer}
                                                                        customInput={TextField}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        label="Numerical value"
                                                                        allowNegative={false}
                                                                        inputProps={{ maxLength: "2" }}
                                                                        onChange={(e) => handleChange(e, item.question)}
                                                                    />
                                                                </Grid>
                                                            </>
                                                            : item.identifierId === 16 ? <>
                                                                <FormGroup row aria-label="answer">
                                                                    {item.mcq.map((option, idx) => (
                                                                        <FormControlLabel
                                                                            key={idx}
                                                                            control={<Checkbox />}
                                                                            color="secondary"
                                                                            value={option.checked}
                                                                            checked={option.checked}
                                                                            label={<div dangerouslySetInnerHTML={{ __html: decodeURIComponent(option.option) }}></div>}
                                                                            onChange={(e) => {
                                                                                let isVisible = [...questionsList];
                                                                                isVisible[index].mcq[idx].checked = e.target.checked;
                                                                                setQuestionsList(isVisible)
                                                                            }}
                                                                        />
                                                                    ))}
                                                                </FormGroup>
                                                            </>
                                                                : null
                                                    }

                                                </li>
                                            </ul>
                                        </>
                                    ))}

                                    <Button
                                        variant="contained"
                                        style={{
                                            position: "absolute",
                                            left: "0",
                                            top: "50%",
                                            minWidth: "35px",
                                            minHeight: "35px",
                                            padding: "3px",
                                            borderRadius: "50%",
                                        }}
                                        onClick={handlePrev}
                                    >
                                        <ArrowBack />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            position: "absolute",
                                            right: "0",
                                            top: "50%",
                                            minWidth: "35px",
                                            minHeight: "35px",
                                            padding: "3px",
                                            borderRadius: "50%",
                                        }}
                                        onClick={handleNext}
                                    >
                                        <ArrowNext />
                                    </Button>

                                </Grid>

                                <Grid item container justify='space-around'
                                    style={{
                                        marginTop: "1.5em",
                                    }}>
                                    <Button variant="contained"
                                        style={{
                                            background: theme.palette.success.dark,
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
                                        color="secondary"
                                        onClick={handleSaveMarkReview}
                                    >
                                        Save & Mark For Review
                                    </Button>
                                    <Button variant="outlined"
                                        style={{
                                            background: theme.palette.primary.main,
                                            color: "#fff",
                                        }}
                                        onClick={handleMarkNext}
                                    >
                                        Mark For Review & Next
                                    </Button>
                                </Grid>


                            </Grid>
                            <Grid item container sm={4} direction='column'>
                                <Grid item container direction="row" justify='space-between' spacing={2} style={{ marginBottom: "1em" }}>
                                    <Grid item sm={6}>
                                        <TextField
                                            select
                                            variant="outlined"
                                            fullWidth
                                            label="Subject"
                                            value={selectedSubject}
                                            onChange={(e) => setSelectedSubject(e.target.value)}
                                        >
                                            <MenuItem value={0}>All Subject...</MenuItem>
                                            {subjectList.map((item, index) => (
                                                <MenuItem key={index} value={item.subjectId}>
                                                    {item.subjectName}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <Button variant='contained' color="secondary">View Instruction</Button>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    component={Paper}
                                    justifyContent="space-between"
                                    style={{ padding: "1em 0" }}
                                >
                                    <TableContainer style={{ padding: "0.6em", }}>
                                        <Table className={classes.table}>
                                            <TableRow>
                                                <TableCell>
                                                    <span style={{
                                                        backgroundColor: theme.palette.common.ltgrey,
                                                        borderRadius: "3px",
                                                        color: "#000"
                                                    }}>{notVisited}</span>
                                                </TableCell>
                                                <TableCell>Not Visited</TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            background: "#ED1B30",
                                                            clipPath: "polygon(0 0, 100% 17%, 100% 83%, 0 100%)",
                                                        }}
                                                    >{notAnswer}</span>
                                                </TableCell>
                                                <TableCell>Not Answered</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            backgroundColor: "green",
                                                            borderRadius: "3px"
                                                        }}
                                                    >{selectAns}</span>
                                                </TableCell>
                                                <TableCell>Answered</TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            backgroundColor: "#0514d3",
                                                            borderRadius: "50%",
                                                        }}
                                                    >{markReview}</span>
                                                </TableCell>
                                                <TableCell>Marked for Review</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            backgroundColor: "#0514d3",
                                                            borderRadius: "50%",
                                                            overflow: "hidden",
                                                            position: "relative"
                                                        }}
                                                    >{markedSaveReviewed}
                                                        <ChatIcon fontSize="small"
                                                            style={{
                                                                color: "#fff",
                                                                position: "absolute",
                                                                bottom: "-2px"
                                                            }}
                                                        />
                                                    </span>
                                                </TableCell>
                                                <TableCell colSpan={3}>Answered & Marked for Review (will be considered for evaluation)</TableCell>
                                            </TableRow>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    component={Paper}
                                    justifyContent="space-between"
                                    className={`${classes.questionList} customPdfScroll`}
                                >
                                    <ul>
                                        {questionsList.map((item, idx) => (
                                            selectedSubject == 0 ?
                                                <>
                                                    <li key={idx}
                                                        style={{
                                                            position: "relative",
                                                            cursor: "pointer",
                                                            color: "#fff",
                                                            borderRadius: item.reviwed === true || item.answerReview === true ? "50%" : "3px",
                                                            clipPath: item.notAnswered === true && item.answered === false ? "polygon(0 0, 100% 17%, 100% 83%, 0 100%)" : "",
                                                            backgroundColor: item.answered === true && item.visited === true ?
                                                                theme.palette.success.dark
                                                                : item.notAnswered === true ? "#ED1B30"
                                                                    : item.reviwed === true || item.answerReview === true ? "#0514d3"
                                                                        : "#e3e3e3"
                                                        }}
                                                        onClick={() => {
                                                            let isVisible = [...questionsList]
                                                            isVisible = questionsList.map((i, x) => ({
                                                                ...i,
                                                                visible: x === idx ? true : false
                                                            }))
                                                            if (
                                                                isVisible[idx].answered === false &&
                                                                isVisible[idx].answerReview === false &&
                                                                isVisible[idx].reviwed === false &&
                                                                isVisible[idx].answerReview === false
                                                            ) {
                                                                isVisible[idx].visited = true;
                                                                isVisible[idx].notAnswered = true;
                                                            }

                                                            setQuestionsList(isVisible)
                                                            setCurrentQuestion(idx)
                                                        }}
                                                    >{idx + 1} {item.answerReview === true &&
                                                        <ChatIcon fontSize="small"
                                                            style={{
                                                                color: "#fff",
                                                                position: "absolute",
                                                                bottom: "-2px"
                                                            }}
                                                        />}</li>
                                                </>
                                                : item.subjectId == selectedSubject ?
                                                    <>
                                                        <li key={idx}
                                                            style={{
                                                                position: "relative",
                                                                cursor: "pointer",
                                                                color: "#fff",
                                                                borderRadius: item.reviwed === true || item.answerReview === true ? "50%" : "3px",
                                                                clipPath: item.notAnswered === true && item.answered === false ? "polygon(0 0, 100% 17%, 100% 83%, 0 100%)" : "",
                                                                backgroundColor: item.answered === true && item.visited === true ?
                                                                    theme.palette.success.dark
                                                                    : item.notAnswered === true ? "#ED1B30"
                                                                        : item.reviwed === true || item.answerReview === true ? "#0514d3"
                                                                            : "#e3e3e3"
                                                            }}
                                                            onClick={() => {
                                                                let isVisible = [...questionsList]
                                                                isVisible = questionsList.map((i, x) => ({
                                                                    ...i,
                                                                    visible: x === idx ? true : false
                                                                }))
                                                                if (
                                                                    isVisible[idx].answered === false &&
                                                                    isVisible[idx].answerReview === false &&
                                                                    isVisible[idx].reviwed === false &&
                                                                    isVisible[idx].answerReview === false
                                                                ) {
                                                                    isVisible[idx].visited = true;
                                                                    isVisible[idx].notAnswered = true;
                                                                }

                                                                setQuestionsList(isVisible)
                                                                setCurrentQuestion(idx)
                                                            }}
                                                        >{idx + 1} {item.answerReview === true &&
                                                            <ChatIcon fontSize="small"
                                                                style={{
                                                                    color: "#fff",
                                                                    position: "absolute",
                                                                    bottom: "-2px"
                                                                }}
                                                            />}</li>
                                                    </>
                                                    : null
                                        ))}

                                    </ul>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item container justify='flex-end' style={{ padding: "0.5em 0.5em 2em 0" }}>
                            <Button
                                variant="contained"
                                style={{
                                    background: theme.palette.success.dark,
                                    color: "#fff",
                                }}
                                onClick={() => setResultPage(true)}
                            >Submit</Button>
                        </Grid>
                    </Grid>
                    : <FinalResultPage
                        setResultPage={setResultPage}
                        questionsList={questionsList}
                        subjectList={subjectList}
                        handleFinalSubmit={handleFinalSubmit}
                    />
                }
            </Grid>



            <Dialog
                open={!networkStatus}
                aria-labelledby="customized-dialog-title"
                className={classes.internetStatus}
            >
                <DialogTitle id="customized-dialog-title">
                    Internet Connection
                </DialogTitle>
                <DialogContent>
                    <Alert severity="error">You're Offline!</Alert>
                </DialogContent>
            </Dialog>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                autoHideDuration={9000}
                onClose={() => setOpen(false)}
            >
                <Alert severity={status}>{message}</Alert>
            </Snackbar>

            <Backdrop style={{ zIndex: theme.zIndex.drawer + 99999, color: "#fff" }} open={backLoader}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
