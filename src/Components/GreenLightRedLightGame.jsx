import { useState, useEffect } from "react";
import "./GreenLightRedLight.css";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GreenLightRedLightGame = () => {
  const navigate = useNavigate();
  const formData = useSelector((state) => state.formData);

  // Initialize neededScore based on formData
  let neededScore;
  if (formData.difficultyLevel === "Easy") {
    neededScore = 10;
  } else if (formData.difficultyLevel === "Medium") {
    neededScore = 15;
  } else if (formData.difficultyLevel === "Hard") {
    neededScore = 25;
  } else {
    toast.error("Please Register to Play");
    navigate("/");
  }

  const [currentColor, setCurrentColor] = useState("red");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(40);
  const targetScore = neededScore; // Use neededScore as the target score
  const initialTimer = 40;

  useEffect(() => {
    // Function to change the color randomly
    const changeColor = () => {
      setCurrentColor((prevColor) => (prevColor === "red" ? "green" : "red"));
    };

    // Start the timer to change colors
    const colorChangeTimer = setInterval(
      changeColor,
      Math.random() * 1000 + 1000
    );

    // Clear the color change timer when the component unmounts or when the game is over
    return () => {
      clearInterval(colorChangeTimer);
    };
  }, []);

  useEffect(() => {
    const gameContainer = document.querySelector(".box-container");

    const gameTimer = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // User ran out of time, end the game
          clearInterval(gameTimer); // Stop the game timer
          setScore(0);
          toast.error("Game Over! Your Score: " + score);
          return initialTimer;
        }
      });
    }, 1000); // Update the timer every second

    const handleClick = () => {
      if (currentColor === "green") {
        // User clicked on green, increment the score
        const newScore = score + 1;
        setScore(newScore);

        // Check for a win
        if (newScore >= targetScore) {
          clearInterval(gameTimer); // Stop the color-changing timer
          setScore(0);

          toast.success("You Win! Your Score: " + newScore);
          setTimer(initialTimer); // Reset the timer
        }
      } else {
        // User clicked on red, end the game
        clearInterval(gameTimer); // Stop the game timer
        setScore(0);
        toast.error("Game Over! Your Score: " + score);
        setTimer(initialTimer); // Reset the timer
      }
    };

    // Add click event listener to the game container
    gameContainer.addEventListener("click", handleClick);

    // Remove the click event listener when the component unmounts
    return () => {
      gameContainer.removeEventListener("click", handleClick);
      clearInterval(gameTimer);
    };
  }, [currentColor, score, initialTimer]);

  return (
    <div className="game-container">
      <img src={Logo} className="heading-game" />
      <h4 className="game-title">
        🟢
        <span style={{ color: "green" }}>Green</span> Light 🔴
        <span style={{ color: "red" }}>Red</span> Light game!
        <div className="score">Score Needed to Win🎉 = {neededScore}</div>
      </h4>
      <div className="box-container">
        <div
          className={`color-box ${currentColor === "green" ? "green" : "red"}`}
        ></div>
      </div>
      <div className="timer">Time Left: {timer} seconds</div>
      <div className="score">Your Score = {score}</div>
    </div>
  );
};

export default GreenLightRedLightGame;
