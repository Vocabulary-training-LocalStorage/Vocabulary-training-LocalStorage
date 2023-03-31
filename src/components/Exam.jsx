import { Box, Button, ListItemText } from "@mui/material";
import { Form, Link, useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { ErrorMessage, Field, Formik } from "formik";
import { tranclateSchema } from "../validation/validation";
import { useContext, useEffect } from "react";
import Appcontext from "../context/Context";



const Exam = () => {

    const navigate = useNavigate();
    const { datawords } = useContext(Appcontext);

    useEffect(() => {
    console.log(datawords)
      }, []);

    return (

        <Box className="border" sx={{ mt: 8, p: 1 }}>


            <Box sx={{ borderRadius: 25 }} className="bg-light d-flex borde justify-content-center container border" >
                <Button onClick={() => navigate('/')} variant="contained" endIcon={<FaHome ></FaHome>} sx={{ py: 0, m: 1 }}>صفحه اصلی </ Button >
                <Button className="text-white" variant="contained" endIcon={<BiReset ></BiReset>} sx={{ py: 0, m: 1 }}>آزمون مجدد</ Button >
            </Box>


            <Box sx={{ my: 1, border: 1, borderRadius: "10px" }} className="container">


                <form>

                    {datawords.map((data) => (
                        <div class="row p-2">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="First name" value={data.persian} disabled></input>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Last name"></input>
                            </div>
                        </div>
                    ))}

                    <div class="col-sm-10">
                        <Button  class="btn btn-primary">مشاهده نتیجه آزمون</Button>
                    </div>
                </form>

            </Box>

        </ Box>
    )
};

export default Exam;

