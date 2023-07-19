import "./App.css";
import SearchBar from "./components/SearchBar";
import UserDetails from "./components/UserDetails";

export const config = {
  endpoint: `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`,
};

function App() {
  return (
    <div className="App">
      <h1>My App</h1>

      <SearchBar />
      {/* <UserDetails /> */}
    </div>
  );
}

export default App;
