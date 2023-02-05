import React, { Suspense } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from "react-dom"
import Input from "./components/Input";
import Words from './components/Words';
import Navbar from './components/Navbar';
// import { Portal } from 'react-portal';
import Appcontext from './context/Context';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './style/style.scss';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import { tranclateSchema } from "./validation/validation";
import { createword, dbwords, english_tranclate, persian_tranclate, remover, tranclate, update } from './services/services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Word_editor from './components/Word_editor';
import Spiner from './components/Preloader';
import Error from './components/Error';

const App = () => {
  const [word, setWord] = useState(null); //کلمه دریافتی از کاربر
  const [meaning, setmeaning] = useState(null); // کلمه معنی شده از گوگل
  const [datawords, setdatawords] = useState(null); // کلمه های خوانده شده از سرور داخلی
  const [invalue, setinvalue] = useState(null); // خالی کننده مقدار ورودی ها
  const navigate = useNavigate();

  //  ترجمه کلمه
  useEffect(() => {
    const fetchData_google = async () => {
      if (word.english && word.persian) {
        setmeaning({ english: word.english, persian: word.persian })
        setinvalue("");
      } else {

        if (word.english && !word.persian) {
          setinvalue("");
          try {
            let { data: per, status } = await english_tranclate(word.english)
            const id = JSON.parse(window.localStorage.getItem('id'));
            const newid = parseInt(id) + 1;
            window.localStorage.setItem('id', JSON.stringify(newid));
            setmeaning({ english: word.english, persian: per[0][0][0], id: newid })
            setinvalue(null);
          } catch (err) {
            setinvalue(null);
            console.log(' مشکل دریافت دیتا انگلیسی');
            alert("عدم دسترس به سرور")
          }
        }
        else if (word.persian && !word.english) {
          setinvalue("");
          try {
            let { data: eng } = await persian_tranclate(word.persian);
            const id = JSON.parse(window.localStorage.getItem('id'));
            const newid = parseInt(id) + 1;
            window.localStorage.setItem('id', JSON.stringify(newid));
            setmeaning({ english: eng[0][0][0], persian: word.persian, id: newid });
            setinvalue(null);
          } catch (err) {
            setinvalue(null);
            alert("عدم دسترس به سرور")
            console.log('مشکل دریافت دیتا فارسی');
          }
        }
      }
    };
    fetchData_google();
  }, [word]);


  // ثبت و خواندن اطلاعات از  سرور داخلی
  useEffect(() => {

    setmeaning(null);
    const creator = () => {
      if (meaning != null && meaning.english != meaning.persian) {
        try {
          createword(meaning);
          toast.success("کلمه ساخته شد");
          console.log("کلمه ثبت شد");
          setinvalue(null)
        } catch (err) {
          console.log("مشکل ثبت در سرور داخلی");
        }
      }
      if (meaning == null) {
        const words = JSON.parse(window.localStorage.getItem('words'));
          setdatawords(words);
          setinvalue(null)
      }
    };
    creator()
  }, [meaning]);


  //حذف کننده کلمه
  const clear = (id) => {
    try {
      remover(id);
      toast.success("کلمه حذف شد")
      let words = dbwords();
      setdatawords(words);
    } catch {
      console.log("مشکل در حذف کلمه");
    }
  }

  // چک کننده کلمات تکراری
  const checker = (value) => {
    try {
      let ebank = datawords.map(x => x.english);
      let pbank = datawords.map(x => x.persian);
      setinvalue("");
      if (ebank.includes(value.english) || pbank.includes(value.persian)) {
        setinvalue(null);
        alert("کلمه شما از قبل وجود دارد")
      } else {
        setWord(value)
        setinvalue(null);
      }
    } catch {
      setWord(value)
      setinvalue(null);
    }
  }

  //به روزرسانی کلمه
  const handleupdate = (id, data) => {
    update(id, data);
    toast.success("کلمه به روز شد  ")
    navigate('/');
    const words = JSON.parse(window.localStorage.getItem('words'));
    setdatawords(words);
  }

  // مقدار دهی اولیه برنامه
  useEffect(() => {
    const words = JSON.parse(window.localStorage.getItem('words'));
    const id = JSON.parse(window.localStorage.getItem('id'));

    if (words == null) {
      window.localStorage.setItem('words', JSON.stringify([]));
    }
    else if (id == null) {
      window.localStorage.setItem('id', JSON.stringify(1));
    }
  }, []);


  return (
    <Appcontext.Provider value={{ datawords, clear, checker, invalue, handleupdate }}>

      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<Input />}></Route>
          <Route path='/' element={<Words />}></Route>
          <Route path='/editor/:wid' element={<Word_editor />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>

    </Appcontext.Provider >
  )
};

export default App;