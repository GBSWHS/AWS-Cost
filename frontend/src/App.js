import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [accountId, setAccountId] = useState('');
  const [cost, setCost] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!accountId) {
      window.alert('AWS 계정 ID를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3030/api/costs?accountId=${accountId}`);
      const amount = response.data.ResultsByTime[0].Total.BlendedCost.Amount;
      const roundedAmount = parseFloat(amount).toFixed(2);
      setCost(roundedAmount);
      setShowPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1 className='title'>AWS 비용 확인하기</h1>
        <input
          type="text"
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          placeholder='AWS 계정 ID ex) 123456789091'
        />
        <button type="submit">이번달 AWS 비용</button>
      </form>

      {showPopup && (
        <div className='popup'>
          <h2>이번달 <span className='acct'>{accountId}</span> <br/> 계정의 AWS 비용입니다.</h2>
          <h1>{cost} USD</h1>
          <button className='close' onClick={closePopup}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default App;
