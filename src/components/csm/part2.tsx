import React, { useState } from "react";
import { QuestionProps } from "../../interfaces/interfaces";

const Part2: React.FC<QuestionProps> = ({ setData, questions }) => {
  const [sqd0, setSqd0] = useState("");
  const [sqd1, setSqd1] = useState("");
  const [sqd2, setSqd2] = useState("");
  const [sqd3, setSqd3] = useState("");
  const [sqd4, setSqd4] = useState("");

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
                {question.question_number === "SQD0" && (
                  <>
                    <div className="survey-question">
                      <p>SQD0: I am satisfied with the service that availed.</p>
                    </div>

                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd0 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd0(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD0"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD0",
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
                                        question_number: "SQD0",
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
                            checked={sqd0 === "Agree"}
                            onChange={(e) => {
                              setSqd0(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD0"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD0",
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
                                        question_number: "SQD0",
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
                            checked={sqd0 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd0(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD0"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD0",
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
                                        question_number: "SQD0",
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
                            checked={sqd0 === "Disagree"}
                            onChange={(e) => {
                              setSqd0(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD0"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD0",
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
                                        question_number: "SQD0",
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
                            checked={sqd0 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd0(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD0"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD0",
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
                                        question_number: "SQD0",
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
                            checked={sqd0 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd0(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD0"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD0",
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
                                        question_number: "SQD0",
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
                {question.question_number === "SQD1" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD1: I spent reasonable amount of time on my
                        transaction.
                      </p>
                    </div>

                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd1 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD1",
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
                                        question_number: "SQD1",
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
                            checked={sqd1 === "Agree"}
                            onChange={(e) => {
                              setSqd1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD1",
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
                                        question_number: "SQD1",
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
                            checked={sqd1 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD1",
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
                                        question_number: "SQD1",
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
                            checked={sqd1 === "Disagree"}
                            onChange={(e) => {
                              setSqd1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD1",
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
                                        question_number: "SQD1",
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
                            checked={sqd1 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD1",
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
                                        question_number: "SQD1",
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
                            checked={sqd1 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD1",
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
                                        question_number: "SQD1",
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
                {question.question_number === "SQD2" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD2: The office followed the transaction’s requirements
                        and steps based on the information provided.
                      </p>
                    </div>
                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd2 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd2(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD2"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD2",
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
                                        question_number: "SQD2",
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
                            checked={sqd2 === "Agree"}
                            onChange={(e) => {
                              setSqd2(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD2"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD2",
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
                                        question_number: "SQD2",
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
                            checked={sqd2 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd2(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD2"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD2",
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
                                        question_number: "SQD2",
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
                            checked={sqd2 === "Disagree"}
                            onChange={(e) => {
                              setSqd2(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD2"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD2",
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
                                        question_number: "SQD2",
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
                            checked={sqd2 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd2(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD2"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD2",
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
                                        question_number: "SQD2",
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
                            checked={sqd2 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd2(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD2"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD2",
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
                                        question_number: "SQD2",
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
                {question.question_number === "SQD3" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD3: The steps (including payment) I needed to do for
                        my transaction were easy and simple.
                      </p>
                    </div>

                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd3 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd3(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD3"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD3",
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
                                        question_number: "SQD3",
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
                            checked={sqd3 === "Agree"}
                            onChange={(e) => {
                              setSqd3(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD3"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD3",
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
                                        question_number: "SQD3",
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
                            checked={sqd3 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd3(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD3"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD3",
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
                                        question_number: "SQD3",
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
                            checked={sqd3 === "Disagree"}
                            onChange={(e) => {
                              setSqd3(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD3"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD3",
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
                                        question_number: "SQD3",
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
                            checked={sqd3 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd3(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD3"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD3",
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
                                        question_number: "SQD3",
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
                            checked={sqd3 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd3(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD3"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD3",
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
                                        question_number: "SQD3",
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
                {question.question_number === "SQD4" && (
                  <>
                    <div className="survey-question">
                      <p>
                        SQD4: I easily found information about my transaction
                        from the office or its website.
                      </p>
                    </div>

                    <div className="sub-choices">
                      <div className="sub-choices-left">
                        <div className="choices">
                          <input
                            type="checkbox"
                            value="Strongly Agree"
                            checked={sqd4 === "Strongly Agree"}
                            onChange={(e) => {
                              setSqd4(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD4"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD4",
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
                                        question_number: "SQD4",
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
                            checked={sqd4 === "Agree"}
                            onChange={(e) => {
                              setSqd4(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD4"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD4",
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
                                        question_number: "SQD4",
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
                            checked={sqd4 === "Neither Agree nor Disagree"}
                            onChange={(e) => {
                              setSqd4(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD4"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD4",
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
                                        question_number: "SQD4",
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
                            checked={sqd4 === "Disagree"}
                            onChange={(e) => {
                              setSqd4(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD4"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD4",
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
                                        question_number: "SQD4",
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
                            checked={sqd4 === "Strongly Disagree"}
                            onChange={(e) => {
                              setSqd4(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD4"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD4",
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
                                        question_number: "SQD4",
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
                            checked={sqd4 === "Not Applicable"}
                            onChange={(e) => {
                              setSqd4(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "SQD4"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "SQD4",
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
                                        question_number: "SQD4",
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
        </div>
      </div>
    </div>
  );
};

export default Part2;
