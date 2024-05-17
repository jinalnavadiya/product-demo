import { useNavigate } from "react-router-dom";
function Header() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleClick = () => {
        const token = localStorage.getItem("token")
        navigate("/")
        if(token){
            localStorage.clear("token")
        } else {
            navigate("/login")
        }
    
    }
    return(
        <header>
        <button 
       style={{float:"left", width:"900px", height:"60px"}}
          onClick={handleClick}
        >{token ?`Logout` : `Login`}</button>
        </header> 
    )
}
export default Header;
