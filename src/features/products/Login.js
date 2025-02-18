import { useFormik } from "formik";
import "../../assets/images/loading.gif"
import axios from "axios"; 
import {ENDPOINT} from "../../config/index"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        
        validate: (values) => {
            let errors = {};
            if (!values.email) {
                errors.email = "Please enter email";
            }
            if (!values.password) {
                errors.password = "Please enter password";
            }
            return errors;
        },
        onSubmit: (values) => {
            try { 
            console.log(ENDPOINT);
            axios.post(`${ENDPOINT}/auth/login`,{
                username:values.email,
                password:values.password,
            }).then(res => {
                if(res?.status === 200 && res?.data?.token){
                    localStorage.setItem('token',res?.data?.token)
                    localStorage.setItem('userData',JSON.stringify (res?.data))
                    navigate('/')
                }
            }).catch(error => {
                console.log(error.message);
            })
                }catch(error){
                 console.log(error.message);
             }
          }
    });
    useEffect(() => {
                    if(id)  {
                        getData(id)
                    }    
    }, [id])
const getData = async (id) => {
    let res = await axios.get(`https://dummyjson.com/users/${id}`)
    if(res.status === 200) {
        console.log(res.data);
         formik.setFieldValue("email",res?.data?.email)
         formik.setFieldValue("password",res?.data?.password)
    }
}
    return (
        <>
            <h1 style={{padding:"0px"}}>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input 
                        type="text"
                        name="username"style={{width:"400px"}}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Enter username"
                        className={formik.errors.email && 'is-error'}
                    />
                    {formik.errors.username ? <div className="error-text ">{formik.errors.username}</div> : null}
                </div>
                <div>
                    <input 
                        type="password"
                        name="password"style={{width:"400px"}}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter Password"
                        className={formik.errors.password && 'is-error'}

                    />
                    {formik.errors.password ? <div  className="error-text">{formik.errors.password}</div> : null}
                </div>
                {/* <div>
                    <input 
                        type="text"
                        name="email"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter email"
                        className={formik.errors.email && 'is-error'}

                    />
                    {formik.errors.email ? <div  className="error-text">{formik.errors.email}</div> : null}
                </div> */}
                <div>
                    <a href="/2"><button type="submit" style={{ width:"400px",border:"2px solid grey",padding:"6px"}}>Login</button></a>
                </div>
            </form>
        </>
    );
};

export default Login;