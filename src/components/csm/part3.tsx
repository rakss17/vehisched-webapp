import React, { useState } from "react";
import { QuestionProps } from "../../interfaces/interfaces";

const Part3: React.FC<QuestionProps> = ({
  onNext,
  data,
  setData,
  questions,
  setQuestions,
}) => {
  const [sqd5, setSqd5] = useState("");
  const [sqd6, setSqd6] = useState("");
  const [sqd7, setSqd7] = useState("");
  const [sqd8, setSqd8] = useState("");
  return (
    <div className="Parts">
      <div className="instructions">
        <p>
          INSTRUCTIONS: For Service Quality Dimensions (SQD) 0-8, please put a
          check mark(✔) on the box that best corresponds to your answer.
        </p>
      </div>
      <div className="question-container-2">
        <div className="survey-container">
          <div className="survey-left-2">
            {questions.map((question) => (
              <>
                {question.question_number === "SQD5" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD5: I paid a reasonable amount of fees for my
                        transaction. (if service was free, choose Not
                        Applicable).
                      </p>
                    </div>
                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd5 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd5(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD5"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD5",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD5",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;Strongly Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Agree"
                            checked={sqd5 === "Agree"}
                            onChange={(e) => {
                              setSqd5(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD5"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD5",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD5",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Neither Agree nor Disagree"
                            checked={sqd5 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd5(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD5"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD5",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD5",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Neither Agree nor Disagree
                        </div>
                      </div>
                      <div className="sub-choices-right">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Disagree"
                            checked={sqd5 === "Disagree"}
                            onChange={(e) => {
                              setSqd5(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD5"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD5",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD5",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Disagree"
                            checked={sqd5 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd5(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD5"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD5",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD5",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Strongly Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Not Applicable"
                            checked={sqd5 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd5(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD5"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD5",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD5",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Not Applicable
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {question.question_number === "SQD6" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD6: I feel the office was fair to everyone, or “walang
                        palakasan” during my transaction.
                      </p>
                    </div>
                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd6 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd6(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD6"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD6",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD6",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;Strongly Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Agree"
                            checked={sqd6 === "Agree"}
                            onChange={(e) => {
                              setSqd6(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD6"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD6",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD6",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Neither Agree nor Disagree"
                            checked={sqd6 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd6(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD6"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD6",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD6",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Neither Agree nor Disagree
                        </div>
                      </div>
                      <div className="sub-choices-right">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Disagree"
                            checked={sqd6 === "Disagree"}
                            onChange={(e) => {
                              setSqd6(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD6"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD6",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD6",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Disagree"
                            checked={sqd6 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd6(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD6"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD6",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD6",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Strongly Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Not Applicable"
                            checked={sqd6 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd6(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD6"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD6",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD6",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Not Applicable
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {question.question_number === "SQD7" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD7: I was treated courteously by the staff and (if
                        asked for help) the staff was helpful.
                      </p>
                    </div>

                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd7 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd7(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD7"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD7",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD7",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;Strongly Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Agree"
                            checked={sqd7 === "Agree"}
                            onChange={(e) => {
                              setSqd7(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD7"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD7",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD7",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Neither Agree nor Disagree"
                            checked={sqd7 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd7(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD7"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD7",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD7",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Neither Agree nor Disagree
                        </div>
                      </div>
                      <div className="sub-choices-right">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Disagree"
                            checked={sqd7 === "Disagree"}
                            onChange={(e) => {
                              setSqd7(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD7"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD7",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD7",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Disagree"
                            checked={sqd7 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd7(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD7"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD7",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD7",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Strongly Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Not Applicable"
                            checked={sqd7 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd7(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD7"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD7",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD7",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Not Applicable
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
          <div className="survey-right-2">
            {questions.map((question) => (
              <>
                {question.question_number === "SQD8" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD8: I got what I needed from the government office, or
                        (if denied) denial of the request was successfully
                        explained to me.
                      </p>
                    </div>

                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd8 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd8(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD8"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD8",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD8",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;Strongly Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Agree"
                            checked={sqd8 === "Agree"}
                            onChange={(e) => {
                              setSqd8(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD8"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD8",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD8",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Agree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Neither Agree nor Disagree"
                            checked={sqd8 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd8(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD8"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD8",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD8",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Neither Agree nor Disagree
                        </div>
                      </div>
                      <div className="sub-choices-right">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Disagree"
                            checked={sqd8 === "Disagree"}
                            onChange={(e) => {
                              setSqd8(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD8"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD8",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD8",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Disagree"
                            checked={sqd8 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd8(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD8"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD8",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD8",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Strongly Disagree
                        </div>
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Not Applicable"
                            checked={sqd8 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd8(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD8"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD8",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "SQD8",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp; &nbsp;Not Applicable
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}

            <div className="survey-question">
              <p>
                Suggestions on how we can further improve our services
                (optional):
              </p>
            </div>
            <div>
              <textarea
                value={data.suggestions}
                onChange={(event) => {
                  setData({
                    ...data,
                    suggestions: event.target.value,
                  });
                }}
                className="survey-suggestion"
              ></textarea>
            </div>
            <div className="survey-email">
              <p>Email Address (optional):</p>
              <input
                value={data.email_address}
                onChange={(event) => {
                  setData({
                    ...data,
                    email_address: event.target.value,
                  });
                }}
                className="survey-input-email"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part3;
