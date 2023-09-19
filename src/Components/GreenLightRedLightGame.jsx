import React, { useState, useEffect } from "react";
import "./GreenLightRedLight.css";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";

const GreenLightRedLightGame = () => {
  const [currentColor, setCurrentColor] = useState("red");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(50);
  const targetScore = 5;
  const initialTimer = 50; // Initial timer value set to 50 seconds

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
        <spam style={{ color: "green" }}>Green</spam> Light 🔴
        <spam style={{ color: "red" }}>Red</spam> Light game!
      </h4>
      <div className="box-container">
        <div
          className={`color-box ${currentColor === "green" ? "green" : "red"}`}
        ></div>
      </div>
      <div className="timer">Time Left: {timer} seconds</div>
      <div className="score">Score = {score}</div>
    </div>
  );
};

export default GreenLightRedLightGame;
