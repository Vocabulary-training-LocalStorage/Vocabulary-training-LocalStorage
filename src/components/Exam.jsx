import { Box, Button, ListItemText } from "@mui/material";
import { Form, Link, useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { ErrorMessage, Field, Formik } from "formik";
import { tranclateSchema } from "../validation/validation";
import { useContext, useEffect, useState } from "react";
import Appcontext from "../context/Context";



const Exam = () => {

    const navigate = useNavigate();
    const { datawords } = useContext(Appcontext);

    let time;
    const timer = (event) => {
        clearTimeout(time);
        time = setTimeout(() => console.log(event.target.value), 1000);
    }

    const [data_bank, setdata_bank] = useState();
    const [formData, setFormData] = useState({
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: '',
        seven: '',
        eight: '',
        nine: '',
        ten: ''
    });

    useEffect(() => {
        setdata_bank(datawords.map(x => x.english.trim()))
    }, []);




    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`one: ${formData.one}`);
        console.log(`two: ${formData.two}`);
        console.log(`three: ${formData.three}`);
        console.log(`four: ${formData.four}`);
        console.log(`five: ${formData.five}`);
        console.log(`six: ${formData.six}`);
        console.log(`seven: ${formData.seven}`);
        console.log(`eight: ${formData.eight}`);
        console.log(`nine: ${formData.nine}`);
        console.log(`ten: ${formData.ten}`);
    }

    if(data_bank){
        return (

            <Box className="border" sx={{ mt: 8, p: 1 }}>
    
                <Box sx={{ borderRadius: 25 }} className="bg-light d-flex borde justify-content-center container border" >
                    <Button onClick={() => navigate('/')} variant="contained" endIcon={<FaHome ></FaHome>} sx={{ py: 0, m: 1 }}>صفحه اصلی </ Button >
                    <Button className="text-white" variant="contained" endIcon={<BiReset ></BiReset>} sx={{ py: 0, m: 1 }}>آزمون مجدد</ Button >
                </Box>
    
                <Box sx={{ my: 1, border: 1, borderRadius: "10px" }} className="container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="one" className="">{data_bank[0]}:</label>
                        <input type="text" id="one" name="one" value={formData.one} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="two">{data_bank[1]}:</label>
                        <input type="text" id="two" name="two" value={formData.two} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="three">{data_bank[2]}:</label>
                        <input type="text" id="three" name="three" value={formData.three} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="four">{data_bank[3]}:</label>
                        <input type="text" id="four" name="four" value={formData.four} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="five">{data_bank[4]}:</label>
                        <input type="text" id="five" name="five" value={formData.five} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="six">{data_bank[5]}:</label>
                        <input type="text" id="six" name="six" value={formData.six} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="seven">{data_bank[6]}:</label>
                        <input type="text" id="seven" name="seven" value={formData.seven} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="eight">{data_bank[7]}:</label>
                        <input type="text" id="eight" name="eight" value={formData.eight} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="nine">{data_bank[8]}:</label>
                        <input type="text" id="nine" name="nine" value={formData.nine} onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="ten">{data_bank[9]}:</label>
                        <input type="text" id="ten" name="ten" value={formData.ten} onChange={handleChange} />
                        <br /><br />
          
                        <button type="submit">Submit</button>
                    </form>
                </Box>
    
            </ Box >
        )
    }


};

export default Exam;

