import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [showData, setShowData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  useEffect(() => {
    getAlluser();
  }, []);

  const getAlluser = async (id = "") => {
    try {
      const res = id
        ? await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        : await axios.get("https://jsonplaceholder.typicode.com/todos");
      if (id && res.data) {
        setShowData([res.data]);
      } else if (id && !res.data) {
        setShowData([]);
        setSearchError("Data not found");
      } else {
        setShowData(res.data);
        setSearchError("");
      }
    } catch (err) {
      console.log("fetching error", err);
      setSearchError("Data not found");
      setShowData([]);
    }
  };

  //? handle search

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      getAlluser();
    } else{ getAlluser(searchQuery.trim())};
  };
  
  return (
    <>
      <h2>TODO DATA</h2>
      {/* search bar */}
      <form onSubmit={handleSearch}>
        <div className="form-floating mb-3">
          <input
            type="search"
            className="form-control"
            id="floatingInput"
            placeholder="Search By Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <label htmlFor="floatingInput">Search By ID</label>
        </div>
        <button type="submit">Search</button>
      </form>
      {/* show error */}
      {searchError && <div className="error">{searchError}</div>}
      {/* show Data*/}
      {showData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tittle</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {showData.map((curElem) => (
              <tr key={curElem.id}>
                <td>{curElem.id}</td>
                <td>{curElem.title}</td>
                <td>{curElem.completed ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;
