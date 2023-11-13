import React from 'react';

interface Part1Props {
  onNext: () => void; // Assuming onNext is a function with no arguments and no return value
}



const Part2: React.FC<Part1Props> = ({ onNext }) => {
  return (
    <div className='Parts'>
      <div className='instructions'>
        <p>
          INSTRUCTIONS: For Service Quality Dimensions (SQD) 0-8, please put a check mark(✔) on the box that best corresponds to your answer.
        </p>
      </div>
      <div className='question-container-2'>
        <div className='survey-container'>
          <div className='survey-left-2'>
            <div className='survey-question'>
              <p>
                SQD0: I am satisfied with the service that availed.
              </p>
            </div>

            <div className='sub-choices'>
              <div className='sub-choices-left'>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Neither Agree no Disagree
                </div>
              </div>
              <div className='sub-choices-right'>
                <div className='choices'>
                  <input type="checkbox" />
                  Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Not Applicable
                </div>
              </div>
            </div>
            <div className='survey-question'>
              <p>
                SQD1: I spent reasonable amount of time on my transaction.
              </p>
            </div>

            <div className='sub-choices'>
              <div className='sub-choices-left'>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Neither Agree no Disagree
                </div>
              </div>
              <div className='sub-choices-right'>
                <div className='choices'>
                  <input type="checkbox" />
                  Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Not Applicable
                </div>
              </div>
            </div>
            <div className='survey-question'>
              <p>
                SQD2: The office followed the transaction’s requirements and steps based on
                the information provided.
              </p>
            </div>

            <div className='sub-choices'>
              <div className='sub-choices-left'>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Neither Agree no Disagree
                </div>
              </div>
              <div className='sub-choices-right'>
                <div className='choices'>
                  <input type="checkbox" />
                  Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Not Applicable
                </div>
              </div>
            </div>


          </div>
          <div className='survey-right-2'>
            <div className='survey-question'>
              <p>
                SQD3: The steps (including payment) I needed to do for my transaction were easy and simple.
              </p>
            </div>

            <div className='sub-choices'>
              <div className='sub-choices-left'>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Neither Agree no Disagree
                </div>
              </div>
              <div className='sub-choices-right'>
                <div className='choices'>
                  <input type="checkbox" />
                  Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Not Applicable
                </div>
              </div>
            </div>
            <div className='survey-question'>
              <p>
                SQD4: I easily found information about my transaction from the office or its website.
              </p>
            </div>

            <div className='sub-choices'>
              <div className='sub-choices-left'>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Agree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Neither Agree no Disagree
                </div>
              </div>
              <div className='sub-choices-right'>
                <div className='choices'>
                  <input type="checkbox" />
                  Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Strongly Disagree
                </div>
                <div className='choices'>
                  <input type="checkbox" />
                  Not Applicable
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
  );
};

export default Part2;
