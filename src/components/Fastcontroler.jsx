import { MdRecordVoiceOver } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { HiSpeakerWave } from "react-icons/hi2";
import { BsFillStopCircleFill } from "react-icons/bs";
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiEnglishInput } from "react-icons/ri";
import { SiFortran } from "react-icons/si";


import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState, useRef, Suspense, useContext } from 'react';
import Appcontext from "../context/Context";

const Fastcontroler = () => {

    const { datawords } = useContext(Appcontext);
    const [cposition, setcposition] = useState(true);
    const [read, setread] = useState(false);
    const [progress_length, setprogress_length] = useState();
    const [progress_bar, setprogress_bar] = useState();


    const reader = (event) => {
        let utterance = new SpeechSynthesisUtterance(event);
        utterance.volume = 1; // From 0 to 1
        utterance.rate = 0.5; // From 0.1 to 10
        utterance.pitch = 0; // From 0 to 2
        utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }

    const [timerInterval, setTimerInterval] = useState();



    const reader_english = () => {
        var english_word = datawords.map(x => x.english).reverse();
        var counter = 0;
        setread(true);
        setprogress_length(english_word.length);
        setTimerInterval(setInterval(() => {
            if (counter >= datawords.length) {
                clearInterval(timerInterval);
                setTimerInterval(null);
                setprogress_bar(0);
                setread(false);
            } else {
                reader(english_word[counter]);
                counter++;
                setprogress_bar(counter);
            }
        }, 2500));
    }

    const clear_interval = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setprogress_bar(0);
        setread(false);
    }


    return (
        <div className="speedycontroler" style={{ width: (cposition ? "100%" : "50px"), transition: "all 1s" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "25px",
                backgroundColor: "primary.main",
                width: "300px",
                p: "5px",
                // display:"none"

            }}>
                {read && cposition ? <progress className="progressbar" id="file" value={progress_bar} max={progress_length}> 32% </progress> : null}

                {read ?
                    <Button onClick={() => clear_interval()} variant='' className=' p-0' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                        <BsFillStopCircleFill className='h3 m-1'></BsFillStopCircleFill>
                    </Button> :
                    <Button onClick={() => reader_english()} variant='' className=' p-0' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                        <MdRecordVoiceOver className='h3 m-1'></MdRecordVoiceOver>
                    </Button>}

                <Button onClick={() => document.getElementById("Search").focus()} variant='' className=' p-0 ' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                    <FiSearch className='h3 m-1'></FiSearch>
                </Button>

                <Button onClick={() => document.getElementById("e_in").focus()} variant='' className='p-0   align-self-start' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                <SiFortran className='h3 m-1'></SiFortran>
                </Button>

                <Button onClick={() => document.getElementById("p_in").focus()} variant='' className='p-0  align-self-start' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                <RiEnglishInput className='h3 m-1'></RiEnglishInput>
                </Button>

                {cposition ? <Button onClick={() => setcposition((prevLoading) => !prevLoading)} variant='' className=' p-0 ' >
                    <AiOutlineClose className='h3 m-1'></AiOutlineClose>
                </Button> :
                    <Button onClick={() => setcposition((prevLoading) => !prevLoading)} variant='' className=' p-0 ' >
                        <MdOutlineMenuOpen className='h3 m-1'></MdOutlineMenuOpen>
                    </Button>}


            </Box>
        </div>
    )
}


export default Fastcontroler;