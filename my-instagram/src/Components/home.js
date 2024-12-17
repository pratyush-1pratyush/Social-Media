import { useSelector } from "react-redux";
import Header from "./header";


const Home = () => {
    const user = useSelector((store) => store.user)
    console.log(user,"homeUser");
    return(
        <div>
            <Header/>
        </div>
       
    )
}

export default Home;