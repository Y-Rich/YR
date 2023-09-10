import axios from "axios";

function App() {
  const url = "http://localhost:8000/control/edukit2";
  const data = { comman: "start" };
  async function handleOnClick() {
    try {
      await axios.post(url, data).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="App">
      <button onClick={handleOnClick}>post 요청</button>
    </div>
  );
}

export default App;
