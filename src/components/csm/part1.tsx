import React, { useState } from "react";
import { QuestionProps } from "../../interfaces/interfaces";

const Part1: React.FC<QuestionProps> = ({ data, setData, questions }) => {
  const [cc1, setCc1] = useState("");
  const [cc2, setCc2] = useState("");
  const [cc3, setCc3] = useState("");

  return (
    <div className="Parts">
      <div className="sub-title">
        <h4>HELP US SERVE YOU BETTER!</h4>
      </div>
      <h4>
        This Client Satisfaction Measurement (CSM) tracks the customer
        experience of government offices. Your feedback on your recently
        concluded transaction will help this office provide a better service.
        Personal information shared will be kept confidential, and you always
        have the option not to answer this form.
      </h4>
      <div className="question">
        <label htmlFor="clientType">Select Client Type: </label>
        <select
          id="clientType"
          name="clientType"
          value={data.client_type}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setData({
              ...data,
              client_type: event.target.value,
            });
          }}
          className="survey-select"
        >
          <option value="">Select an option</option>
          <option value="citizen">Citizen</option>
          <option value="business">Business</option>
          <option value="government">Government (employee or agency)</option>
        </select>
        <p>Region of Residence:</p>
        <input
          value={data.region_of_residence}
          onChange={(event) => {
            setData({
              ...data,
              region_of_residence: event.target.value,
            });
          }}
          className="survey-input"
        ></input>
        <p>Service Availed:</p>
        <input
          value={data.service_availed}
          onChange={(event) => {
            setData({
              ...data,
              service_availed: event.target.value,
            });
          }}
          className="survey-input"
        ></input>
      </div>
      <div className="instructions-part1">
        <p>
          INSTRUCTIONS: Check mark(✔) your answer to the Citizen’s Charter (CC)
          questions. The Citizen’s Charter is an official document that reflects
          the services of a government agency/office including its requirements,
          fees and processing times among others.
        </p>
      </div>
      <div className="question-container-1">
        <div className="survey-container">
          <>
            <div className="survey-left">
              {questions.map((question) => (
                <>
                  {question.question_number === "CC1" && (
                    <>
                      <div className="survey-question">
                        <p>
                          CC1: Which of the following best describes your
                          awareness of a CC?
                        </p>
                      </div>
                      <div className="answer">
                        <div className="choices-CC1">
                          <input
                            type="checkbox"
                            value="I know what a CC is and I saw this office’s CC."
                            checked={
                              cc1 ===
                              "I know what a CC is and I saw this office’s CC."
                            }
                            onChange={(e) => {
                              setCc1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "CC1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "CC1",
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
                                        question_number: "CC1",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;I know what a CC is and I saw this
                          office’s CC.
                        </div>
                        <div className="choices-CC1">
                          <input
                            type="checkbox"
                            value="I know what a CC is but I did NOT see this office’s"
                            checked={
                              cc1 ===
                              "I know what a CC is but I did NOT see this office’s"
                            }
                            onChange={(e) => {
                              setCc1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "CC1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "CC1",
                                    answers: e.target.value,
                                  };
                                  return {
                                    ...prevData,
                                    questions: updatedQuestions,
                                  };
                                } else {
                                  // If the question doesn't exist, add it
                                  return {
                                    ...prevData,
                                    questions: [
                                      ...prevData.questions,
                                      {
                                        question_number: "CC1",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;I know what a CC is but I did NOT see this
                          office’s
                        </div>
                        <div className="choices-CC1">
                          <input
                            type="checkbox"
                            value="I learned of the CC only when I saw this office’s"
                            checked={
                              cc1 ===
                              "I learned of the CC only when I saw this office’s"
                            }
                            onChange={(e) => {
                              setCc1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "CC1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "CC1",
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
                                        question_number: "CC1",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;I learned of the CC only when I saw this
                          office’s
                        </div>
                        <div className="choices-CC1">
                          <input
                            type="checkbox"
                            value="I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                            checked={
                              cc1 ===
                              "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                            }
                            onChange={(e) => {
                              setCc1(e.target.value);
                              setData((prevData: any) => {
                                const existingQuestionIndex =
                                  prevData.questions.findIndex(
                                    (q: any) => q.question_number === "CC1"
                                  );

                                if (existingQuestionIndex !== -1) {
                                  const updatedQuestions = [
                                    ...prevData.questions,
                                  ];
                                  updatedQuestions[existingQuestionIndex] = {
                                    question_number: "CC1",
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
                                        question_number: "CC1",
                                        answers: e.target.value,
                                      },
                                    ],
                                  };
                                }
                              });
                            }}
                          />
                          &nbsp;&nbsp;I do not know what a CC is and did not see
                          one in this office. (Answers ‘N/A’ on CC2 and CC3).
                        </div>
                      </div>
                    </>
                  )}
                  {question.question_number === "CC2" && (
                    <>
                      <div className="survey-question">
                        <p>
                          CC2: If aware of CC (answered 1-3 in CC1), would you
                          say that the CC of this office was...?
                        </p>
                      </div>
                      <div className="sub-choices">
                        <div className="sub-choices-left">
                          <div className="choices">
                            <input
                              type="checkbox"
                              disabled={
                                cc1 ===
                                "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                                  ? true
                                  : false
                              }
                              value="Easy to see"
                              checked={cc2 === "Easy to see"}
                              onChange={(e) => {
                                setCc2(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC2"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC2",
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
                                          question_number: "CC2",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;Easy to see
                          </div>
                          <div className="choices">
                            <input
                              type="checkbox"
                              disabled={
                                cc1 ===
                                "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                                  ? true
                                  : false
                              }
                              value="Somewhat easy to see"
                              checked={cc2 === "Somewhat easy to see"}
                              onChange={(e) => {
                                setCc2(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC2"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC2",
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
                                          question_number: "CC2",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;Somewhat easy to see
                          </div>
                          <div className="choices">
                            <input
                              type="checkbox"
                              disabled={
                                cc1 ===
                                "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                                  ? true
                                  : false
                              }
                              value="Difficult to see"
                              checked={cc2 === "Difficult to see"}
                              onChange={(e) => {
                                setCc2(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC2"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC2",
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
                                          question_number: "CC2",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;Difficult to see
                          </div>
                        </div>
                        <div className="sub-choices-right">
                          <div className="choices">
                            <input
                              type="checkbox"
                              disabled={
                                cc1 ===
                                "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                                  ? true
                                  : false
                              }
                              value="Not visible at all"
                              checked={cc2 === "Not visible at all"}
                              onChange={(e) => {
                                setCc2(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC2"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC2",
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
                                          question_number: "CC2",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;Not visible at all
                          </div>
                          <div className="choices">
                            <input
                              type="checkbox"
                              value="N/A"
                              checked={cc2 === "N/A"}
                              onChange={(e) => {
                                setCc2(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC2"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC2",
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
                                          question_number: "CC2",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;N/A
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
            {questions.map((question) => (
              <>
                {question.question_number === "CC3" && (
                  <>
                    <div className="survey-right">
                      <div className="survey-question">
                        <p>
                          CC3: If aware of CC (answered codes 1-3 in CC1), how
                          much did the CC help you in your transaction?
                        </p>
                      </div>
                      <div className="sub-choices">
                        <div className="sub-choices-left">
                          <div className="choices">
                            <input
                              type="checkbox"
                              disabled={
                                cc1 ===
                                "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                                  ? true
                                  : false
                              }
                              value="Helped very much"
                              checked={cc3 === "Helped very much"}
                              onChange={(e) => {
                                setCc3(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC3"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC3",
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
                                          question_number: "CC3",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;Helped very much
                          </div>
                          <div className="choices">
                            <input
                              type="checkbox"
                              disabled={
                                cc1 ===
                                "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                                  ? true
                                  : false
                              }
                              value="Somewhat helped"
                              checked={cc3 === "Somewhat helped"}
                              onChange={(e) => {
                                setCc3(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC3"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC3",
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
                                          question_number: "CC3",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;Somewhat helped
                          </div>
                        </div>
                        <div className="sub-choices-right">
                          <div className="choices">
                            <input
                              type="checkbox"
                              disabled={
                                cc1 ===
                                "I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3)."
                                  ? true
                                  : false
                              }
                              value="Did not help"
                              checked={cc3 === "Did not help"}
                              onChange={(e) => {
                                setCc3(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC3"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC3",
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
                                          question_number: "CC3",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;Did not help
                          </div>
                          <div className="choices">
                            <input
                              type="checkbox"
                              value="N/A"
                              checked={cc3 === "N/A"}
                              onChange={(e) => {
                                setCc3(e.target.value);
                                setData((prevData: any) => {
                                  const existingQuestionIndex =
                                    prevData.questions.findIndex(
                                      (q: any) => q.question_number === "CC3"
                                    );

                                  if (existingQuestionIndex !== -1) {
                                    const updatedQuestions = [
                                      ...prevData.questions,
                                    ];
                                    updatedQuestions[existingQuestionIndex] = {
                                      question_number: "CC3",
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
                                          question_number: "CC3",
                                          answers: e.target.value,
                                        },
                                      ],
                                    };
                                  }
                                });
                              }}
                            />
                            &nbsp;&nbsp;N/A
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
          </>
        </div>
      </div>
    </div>
  );
  {
    /*
          <div className="survey-right">
            <div className="survey-question">
              <p>
                CC3: If aware of CC (answered codes 1-3 in CC1), how much did
                the CC help you in your transaction?
              </p>
            </div>

            <div className="sub-choices">
              <div className="sub-choices-left">
                <div className="choices">
                  <input type="checkbox" />
                  &nbsp;&nbsp;Helped very much
                </div>
                <div className="choices">
                  <input type="checkbox" />
                  &nbsp;&nbsp;Somewhat helped
                </div>
              </div>
              <div className="sub-choices-right">
                <div className="choices">
                  <input type="checkbox" />
                  &nbsp;&nbsp;Did not help
                </div>
                <div className="choices">
                  <input type="checkbox" />
                  &nbsp;&nbsp;N/A
                </div>
              </div>
            </div> */
  }
};

export default Part1;

//  <div className="survey-question">
//             <p>
//               CC1: Which of the following best describes your awareness of a
//               CC?
//             </p>
//           </div>
//           <div className="answer">
//             <div className="choices-CC1">
//               <input type="checkbox" />
//               &nbsp;&nbsp;I know what a CC is and I saw this office’s CC.
//             </div>
//             <div className="choices-CC1">
//               <input type="checkbox" />
//               &nbsp;&nbsp;I know what a CC is but I did NOT see this office’s
//               CC.
//             </div>
//             <div className="choices-CC1">
//               <input type="checkbox" />
//               &nbsp;&nbsp;I learned of the CC only when I saw this office’s
//               CC.
//             </div>
//             <div className="choices-CC1">
//               <input type="checkbox" />
//               &nbsp;&nbsp;I do not know what a CC is and did not see one in
//               this office. (Answers ‘N/A’ on CC2 and CC3).
//             </div>
//           </div>
//           <div className="survey-question">
//             <p>
//               CC2: If aware of CC (answered 1-3 in CC1), would you say that
//               the CC of this office was...?
//             </p>
//           </div>

//           <div className="sub-choices">
//             <div className="sub-choices-left">
//               <div className="choices">
//                 <input type="checkbox" />
//                 &nbsp;&nbsp;Easy to see
//               </div>
//               <div className="choices">
//                 <input type="checkbox" />
//                 &nbsp;&nbsp;Somewhat easy to see
//               </div>
//               <div className="choices">
//                 <input type="checkbox" />
//                 &nbsp;&nbsp;Difficult to see
//               </div>
//             </div>
//             <div className="sub-choices-right">
//               <div className="choices">
//                 <input type="checkbox" />
//                 &nbsp;&nbsp;Not visible at all
//               </div>
//               <div className="choices">
//                 <input type="checkbox" />
//                 &nbsp;&nbsp;N/A
//               </div>
//             </div>
//           </div>
//         </div>

// questions.map(question => (
//   <div key={question.question_number}>
//     <p>{question.content}</p>
//     <input
//       type="checkbox"
//       value="I know what a CC is and I saw this office’s CC."
//       checked={cc1 === "I know what a CC is and I saw this office’s CC."}
//       onChange={(e) => {
//         setCc1(e.target.value);
//         setData({
//           ...data,
//           questions: data.questions.map((q) => {
//             if (q.question_number === 'CC1') {
//               return {
//                 ...q,
//                 answers: [
//                  {
//                    content: e.target.value,
//                  },
//                 ],
//               };
//             }
//             return q;
//           }),
//         });
//       }}
//     />
//     {/* Repeat for other choices */}
//   </div>
//  ));
