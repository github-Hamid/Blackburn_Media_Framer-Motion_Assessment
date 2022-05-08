import { useState } from "react";
import { motion, useAnimation } from "framer-motion"
import {AiFillDislike, AiFillLike, AiOutlineHeart} from "react-icons/ai"
import {FcLike, FcDislike} from "react-icons/fc"
import "../css/joke.css"

const containerStyle = {
    width : "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "hidden"
}

const buttonStyle = {
    backgroundColor: "black",
      alignSelf: "center",
      marginTop: "5rem",
      width: "10vw",
      height: "3rem",
      border: "none",
      borderRadius: "5px",
      color: "#ff0505",
   
  }

  const buttonOnHover = {
    scale : 1.2,
    backgroundColor: "white",
       cursor: "pointer",
       border: "none",
        boxShadow: "3.5px 3.5px 0 black",
        transition:{
            duration: 0.5
        }
     
}

const cardStyle = {
    display: "flex",
    position: "relative",
    marginTop: "6rem",
    alignSelf: "center",
    fontFamily: "Oleo Script Swash Caps",
    border: "1px solid black",
    width: "60vw",
    height: "40vh",
    backgroundColor: "#dcdcdc",
    borderRadius: "1rem",
    boxShadow: "5px 5px 10px black",
    textAlign: "center"
}

const heartDivStyle = {
    position: "absolute",
    left: "95%",
    scale : 1.5,
    top: "5%" 
}

const textStyle = {
    width: "100%",
    position: "absolute",
    margin: "0",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize:"2rem"

}

const divIcon = {
    display: "flex",
    width: "8%",
    position: "absolute",
    top: "90%",
    left: "90%",
    justifyContent: "space-around",
    scale : 1.3
}



async function getData(url)
{
    let jsonData = await fetch(url);
    let rawData = await jsonData.json();
    return rawData;
}

export default function Joke()
{
 const [joke, setJoke] = useState(null);
 const cardAnimation = useAnimation();
const heartdivAnimation = useAnimation();
const textAnimation = useAnimation();
const divIconAnimation = useAnimation();







function buttonClicked()
{
    
    document.getElementById("like").removeAttribute("class");
    document.getElementById("like").classList.add("heartHidden");
    document.getElementById("dislike").removeAttribute("class");
    document.getElementById("dislike").classList.add("heartHidden");
    document.getElementById("heart").removeAttribute("class");
    document.getElementById("heart").classList.add("heartVisible");
    joke ? document.getElementById("button").innerText = "SHOW JOKE" : document.getElementById("button").innerText = "HIDE JOKE";

    if(joke)
    {
        //defining animations for elements
        cardAnimation.start({y:"-90vh",opacity:[1, 1, 1, 1, 0], transition:{duration:2}});
        heartdivAnimation.start({x:"30vw",opacity:[1, 1, 1, 1, 0], transition:{duration:2}})
        textAnimation.start({x:"-150vw", opacity:0, transition:{duration:2}})
        divIconAnimation.start({y:"110vh",opacity:[1, 1, 1, 1, 0], transition:{duration:2}})
        
        setJoke(null);
    }
    else
    {
        getData("https://icanhazdadjoke.com/slack")
    .then((APIdata)=>{setJoke(APIdata.attachments[0].text)});

    //defining animations for elements
    cardAnimation.start({
        y:0,
        opacity:1,
         transition:{ 
        type: "spring",
        stiffness: 50,
        damping: 5}
    })
    heartdivAnimation.start({
        x : 0,
        opacity:1,
        transition:{duration:3}
    })
    textAnimation.start({
        x:0,
        opacity:[0,0.3, 0.7, 1],
        transition:{duration:2.5}
    })
    divIconAnimation.start({
        opacity:1,
        y:0,
        transition:{duration:2}
    })
    }
 
}

function dislikeClicked(){
    let heart = document.getElementById("heart");
      let like = document.getElementById("like");
      let dislike  = document.getElementById("dislike");
      heart.classList.contains("heartVisible") ?  heart.classList.remove("heartVisible") :  like.classList.remove("heartVisible");
      heart.classList.contains("heartHidden") ? like.classList.add("heartHidden") : heart.classList.add("heartHidden");
      dislike.classList.remove("heartHidden");
     dislike.classList.add("heartVisible");
}

function likeCliked(){
    let heart = document.getElementById("heart");
    let like = document.getElementById("like");
    let dislike  = document.getElementById("dislike");        
    heart.classList.contains("heartVisible") ?  heart.classList.remove("heartVisible") :  dislike.classList.remove("heartVisible");
    heart.classList.contains("heartHidden") ? dislike.classList.add("heartHidden") : heart.classList.add("heartHidden");
    like.classList.remove("heartHidden");
   like.classList.add("heartVisible");
}

return (
<motion.div className="container"
 style={containerStyle}>
<motion.button
className="button"
id="button"
style={buttonStyle}
whileHover={buttonOnHover}
whileTap={{scale: 0.9}}
onClick={buttonClicked}
>SHOW JOKE
</motion.button>

<motion.div
className="card"
style={cardStyle}
initial={{y:"-90vh", opacity:0}}
animate={cardAnimation}>
<motion.div
style={heartDivStyle}
initial={{x:"30vw", opacity:0}}
animate={heartdivAnimation}
>
<AiOutlineHeart id="heart"/>
<FcDislike id="dislike" className="heartHidden"/>
<FcLike id="like" className="heartHidden"/>
</motion.div>

<motion.p
style={textStyle}
initial={{x:"-150vw", opacity:0}}
animate={textAnimation}
>{joke}
</motion.p>

<motion.div
className="divIcon"
style={divIcon}
initial={{y:"110vh", opacity:0}}
animate={divIconAnimation}
>
<motion.div
whileHover={{
    scale: "1.3",
    cursor: "pointer"
}}
whileTap={{
    scale: "0.9",
}}
>
<AiFillDislike onClick={dislikeClicked}/>
</motion.div>
 <motion.div
 whileHover={{
     scale: "1.3",
     cursor: "pointer"
 }}
 whileTap={{
     scale: "0.9",
 }}
 ><AiFillLike onClick={likeCliked}/>
 </motion.div>  
</motion.div>



</motion.div>


</motion.div>
)
}