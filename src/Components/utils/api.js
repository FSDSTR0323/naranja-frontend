// import axios from 'axios';
// import { useState } from 'react';
// const backendUrl = process.env.REACT_APP_BACKEND_URL;



// const incomesGetter = async () => {
//   const [incomeList, setIncomeList] = useState([]);
//   const userId = window.localStorage.getItem('userId');
//   try {
//     const { data } = await axios.get(`${backendUrl}/api/v1/get-income/${userId}`);
//     setIncomeList(data);
//   } catch (error) {
//     console.log('Error get Income', error);
//   }
// };

// export default incomesGetter