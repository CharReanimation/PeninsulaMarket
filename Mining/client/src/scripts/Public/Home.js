import React from "react"; // React

// CSS
import "../../css/Public/Global.css";
import "../../css/Public/Home.css";

const Home = () => {
    return (
        <div className="global-page">
            <div id="home-container">
                <div id="home-img-container">
                    <img id="home-img" src="https://korea-dpr.com/wp-content/uploads/2021/07/Kim-Il-Sung.jpg" alt="Sample Image" width="800"></img>
                </div>

                <div id="home-img-container">
                    <img id="home-img" src="https://korea-dpr.com/wp-content/uploads/2021/07/Kim-Jong-Il.jpg" alt="Sample Image" width="800"></img>
                </div>
            </div>
        </div>
    );
}
export default Home;