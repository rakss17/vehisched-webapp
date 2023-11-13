import React from 'react';

interface Part1Props {
  onNext: () => void; // Assuming onNext is a function with no arguments and no return value
}

const Part3: React.FC<Part1Props> = ({ onNext }) => {
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
                SQD5: I paid a reasonable amount of fees for my transaction.
                (if service was free, choose Not Applicable).
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
                SQD6: I feel the office was fair to everyone, or “walang palakasan” during my transaction.
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
                SQD7: I was treated  courteously by the staff and (if asked for help) the  staff was helpful.
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
                SQD8: I got what I needed from the government office, or (if denied) denial of the request was
                successfully explained to me.
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
            <div className='survey-question'>
              <p>
                Suggestions on how we can further improve our services (optional):
              </p>
            </div>
            <div>
              <textarea className='survey-suggestion'>
              </textarea>
            </div>
            <div className='survey-email'>
              <p>
                Email Address (optional):
              </p>
              <input className='survey-input-email'>
              </input>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Part3;
