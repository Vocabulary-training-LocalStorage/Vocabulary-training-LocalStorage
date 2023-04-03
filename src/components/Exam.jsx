import { Box, Button, ListItemText } from "@mui/material";
import { Form, Link, useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { ErrorMessage, Field, Formik } from "formik";
import { tranclateSchema } from "../validation/validation";
import { useContext, useEffect, useState } from "react";
import Appcontext from "../context/Context";
import Exam_results from './Exam_results';
import { Outlet } from 'react-router-dom';


const Exam = () => {

    const navigate = useNavigate();
    const { datawords, setmistake, setScore, mistake, Score } = useContext(Appcontext);

    let time;


    const [persian_bank, setpersian_bank] = useState();
    const [english_bank, setenglish_bank] = useState();

    useEffect(() => {
        // let selected_word = datawords.Math.floor(Math.random() * 10)
        console.log("selected_word", datawords)
        setpersian_bank(datawords.map(x => x.persian.toLowerCase().trim()));
        setenglish_bank(datawords.map(x => x.english.toLowerCase().trim()));
    }, []);



    if (persian_bank) {
        return (

            <Box className="" sx={{ mt: 8, p: 1 }}>

                <Box sx={{ borderRadius: 25 }} className="bg-light d-flex borde justify-content-center container border" >
                    <Button onClick={() => navigate('/')} variant="contained" endIcon={<FaHome ></FaHome>} sx={{ py: 0, m: 1 }}>صفحه اصلی </ Button >
                </Box>

                <Outlet></Outlet>






            </ Box >
        )
    }


};

export default Exam;

