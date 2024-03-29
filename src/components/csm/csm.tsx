import { useState, useEffect } from "react";
import "./csm.css";
import USTPLogo from "../../assets/USTP LOGO.png";
import CSM from "../../assets/csm.jpg";
import Part1 from "./part1";
import Part2 from "./part2";
import Part3 from "./part3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { fetchQuestion, postCSM } from "../api/api";

export default function Csm() {
  const [currentPart, setCurrentPart] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]);
  const [data, setData] = useState<{
    client_type: string;
    region_of_residence: string;
    service_availed: string;
    questions: {
      question_number: string;
      answers: string;
    }[];
    suggestions: string;
    email_address: string;
  }>({
    client_type: "",
    region_of_residence: "",
    service_availed: "",
    questions: [],
    suggestions: "",
    email_address: "",
  });

  useEffect(() => {
    fetchQuestion(setQuestions);
  }, []);

  const handleNext = () => {
    if (currentPart < 3) {
      setCurrentPart(currentPart + 1);
    }
  };

  const handleBack = () => {
    if (currentPart > 1) {
      setCurrentPart(currentPart - 1);
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollTimeout = setTimeout(scrollToTop, 100); // Adjust the delay as needed

    return () => clearTimeout(scrollTimeout); // Clear the timeout on component unmount
  }, [currentPart]);

  const handleSubmit = () => {
    postCSM(data);
    console.log(data);
  };
  return (
    <div className="csm-modal">
      <div className="csm-header">
        <div className="csm-header-content">
          <img src={USTPLogo} alt="USTP Logo" />
          <div className="csm-title">
            <p>University of Science and Technology of Southern Philippines</p>
            <h4>HELP US SERVE YOU BETTER!</h4>
          </div>

          <img src={CSM} alt="Document Code" />
        </div>
        <div className="line"></div>
      </div>
      <div></div>
      <div className="survey-container">
        {currentPart === 1 && (
          <Part1
            questions={questions}
            setData={setData}
            data={data}
            onNext={handleNext}
          />
        )}
        {currentPart === 2 && (
          <Part2
            questions={questions}
            setData={setData}
            data={data}
            onNext={handleNext}
          />
        )}
        {currentPart === 3 && (
          <Part3
            questions={questions}
            setData={setData}
            data={data}
            onNext={handleNext}
          />
        )}
      </div>
      <div className="arrow">
        {currentPart > 1 && (
          <button className="arrow-left" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} className="custom-icon" />
          </button>
        )}

        {currentPart >= 3 ? (
          <button className="button-next" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="arrow-right" onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowRight} className="custom-icon" />
          </button>
        )}
      </div>
    </div>
  );
}
