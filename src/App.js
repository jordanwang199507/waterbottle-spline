import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./sass/main.scss";
import Logo from "./assets/logo.svg";
import chopper from "./assets/chopper.png";
import franky from "./assets/franky.png";
import brook from "./assets/brook.png";

const scenes = [
  "https://prod.spline.design/bKtY5fo4QXOSXe-8/scene.splinecode",
  "https://prod.spline.design/3rk5L3C5UZDCreCt/scene.splinecode",
  "https://prod.spline.design/9n0OvT2pIVrPsEdo/scene.splinecode",
];
const cardBgs = [
  require("./assets/chopper-bg.jpg"),
  require("./assets/franky-bg.jpg"),
  require("./assets/brook-bg.jpg"),
];
const cardImgs = [chopper, franky, brook];
const colors = ["#FFFFFF", "#CE5357", "#664381"];
const textColors = ["#54545B", "#FFFFFF", "#FFFFFF"];
const cardColors = ["#a9a9ad", "#E7AAAB", "#B2A0C0"];

const App = () => {
  const [state, setState] = useState({
    currentSceneIndex: 0,
    transitionDirection: "left",
    backgroundColor: colors[0],
    textColor: textColors[0],
    cardColor: cardColors[0],
    cardBg: cardBgs[0],
    cardImg: cardImgs[0],
  });

  useEffect(() => {
    const { cardColor, backgroundColor, textColor } = state;
    document.documentElement.style.setProperty("--card-color", cardColor);
    document.documentElement.style.setProperty("--bg-color", backgroundColor);
    document.documentElement.style.setProperty("--text-color", textColor);
  }, [state]);

  const updateState = (newIndex) => {
    setState({
      currentSceneIndex: newIndex,
      transitionDirection: state.transitionDirection,
      backgroundColor: colors[newIndex],
      textColor: textColors[newIndex],
      cardColor: cardColors[newIndex],
      cardBg: cardBgs[newIndex],
      cardImg: cardImgs[newIndex],
    });
  };

  const handleLeftClick = () => {
    const newIndex =
      state.currentSceneIndex === 0
        ? scenes.length - 1
        : state.currentSceneIndex - 1;
    setState((prevState) => ({
      ...prevState,
      transitionDirection: "left",
    }));
    updateState(newIndex);
  };

  const handleRightClick = () => {
    const newIndex =
      state.currentSceneIndex === scenes.length - 1
        ? 0
        : state.currentSceneIndex + 1;
    setState((prevState) => ({
      ...prevState,
      transitionDirection: "right",
    }));
    updateState(newIndex);
  };

  const {
    currentSceneIndex,
    transitionDirection,
    backgroundColor,
    textColor,
    cardColor,
    cardBg,
    cardImg,
  } = state;

  return (
    <div className="landing-page" style={{ backgroundColor }}>
      <div className="container">
        <div className="menu">
          <li>
            <img src={Logo} alt="Logo" />
          </li>
          <div className="menu-right">
            {["Home", "Shop", "Locations", "Cart"].map((item) => (
              <li key={item}>
                <a href="/" style={{ color: textColor }}>
                  {item}
                </a>
              </li>
            ))}
          </div>
        </div>
        <button onClick={handleLeftClick} style={{ color: textColor }}>
          Previous
        </button>
        <button
          onClick={handleRightClick}
          style={{ color: textColor }}
          id="button-right"
        >
          Next
        </button>
        <TransitionGroup className="spline-container">
          <CSSTransition
            key={scenes[currentSceneIndex]}
            timeout={500}
            classNames={`slide-${transitionDirection}`}
          >
            <Spline
              scene={scenes[currentSceneIndex]}
              onLoad={(spline) => console.log("Spline loaded:", spline)}
              onError={(error) => console.error("Spline error:", error)}
            />
          </CSSTransition>
        </TransitionGroup>

        <h1 className="heading-1" style={{ color: textColor }}>
          Choose your water bottle
        </h1>

        <div className="content">
          <p className="text-1" style={{ color: textColor }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="button-container"></div>
        </div>
        <div className="card">
          <div
            className="card__imgBx"
            style={{ backgroundImage: `url(${cardBg})` }}
          >
            <img src={cardImg} />
          </div>
          <div className="card__content">
            <span className="card__material">
              <a href="#">Stainless Steel</a>
            </span>
            <ul>
              <li>17oz / 500ml capacity</li>
              <li>24 hours cold, 12 hours hot</li>
              <li>Made from 18/8 stainless steel (BPA and toxin free)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
