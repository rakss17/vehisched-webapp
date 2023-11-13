import React, { useState } from 'react';

interface Part1Props {
  onNext: () => void;
}

const Part1: React.FC<Part1Props> = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // Initialize with an empty string

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='Parts'>
      <h4>
        This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices.
        Your feedback on your recently concluded transaction will help this office provide a better service.
        Personal information shared will be kept confidential, and you always have the option not to answer this form.
      </h4>
      <div className='question'>
        <label htmlFor="clientType">Select Client Type: </label>
        <select
          id="clientType"
          name="clientType"
          value={selectedOption}
          onChange={handleOptionChange}
          className='survey-select'
        >
          <option value="">Select an option</option>
          <option value="citizen">Citizen</option>
          <option value="business">Business</option>
          <option value="government">Government (employee or agency)</option>
        </select>
        <p>
          Region of Residence:
        </p>
        <input className='survey-input'>
        </input>
        <p>
          Service Availed:
        </p>
        <input className='survey-input'>
        </input>
      </div>
      <div className='instructions'>
        <p>
          INSTRUCTIONS: Check mark(✔) your answer to the Citizen’s Charter (CC) questions. The Citizen’s Charter is an official document that reflects the services of a government agency/office including its requirements, fees and processing times among others.
        </p>
      </div>
      <div className='question-container-1'>
      <div className='survey-container'>
        <div className='survey-left'>
          <div className='survey-question'>
            <p>
              CC1 Which of the following best describes your awareness of a CC?
            </p>
          </div>
          <div className='answer'>
          <div className='choices'>
            <input type="checkbox" />
            I know what a CC is and I saw this office’s CC.
          </div>
          <div className='choices'>
            <input type="checkbox" />
            I know what a CC is but I did NOT see this  office’s CC.
          </div>
          <div className='choices'>
            <input type="checkbox" />
            I learned of the CC only when I saw this office’s CC.
          </div>
          <div className='choices'>
            <input type="checkbox" />
            I do not know what a CC is and did not see one in this office. (Answers ‘N/A’ on CC2 and CC3).
          </div>
          </div>
          <div className='survey-question'>
            <p>
              CC2 If aware of CC (answered 1-3 in CC1), would you say that the CC of this office was...?
            </p>
          </div>

          <div className='sub-choices'>
            <div className='sub-choices-left'>
              <div className='choices'>
                <input type="checkbox" />
                Easy to see
              </div>
              <div className='choices'>
                <input type="checkbox" />
                Somewhat easy to see
              </div>
              <div className='choices'>
                <input type="checkbox" />
                Difficult to see
              </div>
            </div>
            <div className='sub-choices-right'>
              <div className='choices'>
                <input type="checkbox" />
                Not visible at all
              </div>
              <div className='choices'>
                <input type="checkbox" />
                N/A
              </div>
            </div>
          </div>

        </div>
        <div className='survey-right'>
          <div className='survey-question'>
            <p>
              CC1 Which of the following best describes your awareness of a CC?
            </p>
          </div>
        
          <div className='sub-choices'>
            <div className='sub-choices-left'>
              <div className='choices'>
                <input type="checkbox" />
                Helped very much 
              </div>
              <div className='choices'>
                <input type="checkbox" />
                Somewhat helped  
              </div>
            </div>
            <div className='sub-choices-right'>
              <div className='choices'>
                <input type="checkbox" />
                Did not help
              </div>
              <div className='choices'>
                <input type="checkbox" />
                N/A
              </div>
            </div>
          </div>

        </div>
       
      </div>

      </div>

    </div>
  );
};

export default Part1;
