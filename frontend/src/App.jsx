import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
const filteredBusinesses = businesses.filter((business) =>
  JSON.stringify(business)
    .toLowerCase()
    .includes(search.toLowerCase())
);
const recordsPerPage = 20;

const start =
(page - 1) * recordsPerPage;

const end =
start + recordsPerPage;

const paginatedData =
filteredBusinesses.slice(start, end);
  const ratingData = [
  {
    name: "4+ Rating",
    count: businesses.filter((b) => {
      const rating = parseFloat(
        String(b.Rating || "0").replace(" stars", "")
      );
      return rating >= 4;
    }).length,
  },
  {
    name: "Below 4",
    count: businesses.filter((b) => {
      const rating = parseFloat(
        String(b.Rating || "0").replace(" stars", "")
      );
      return rating < 4;
    }).length,
  },
];
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/businesses")
      .then((res) => {
        console.log(res.data);
        setBusinesses(res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }, []);
  const missingWebsite =
  businesses.filter(
    b => !b.Website || b.Website === "N/A"
  ).length;
  const missingPhone =
  businesses.filter(
    b => !b.Phone || b.Phone === "N/A"
  ).length;
  const topBusiness =
  businesses.length > 0
    ? businesses.reduce((a, b) =>
        parseFloat(String(a.Rating).replace(" stars", "")) >
        parseFloat(String(b.Rating).replace(" stars", ""))
          ? a
          : b
      )
    : null;
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="dashboard-title">
  📊 Business Analytics Dashboard
</h1>

<input
className="search-box"
  type="text"
  placeholder="Search Business..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    marginBottom: "20px"
  }}
  
/>

      <div className="cards">
  <div className="card">
    <h3>📋 Total Records</h3>
    <p>{businesses.length}</p>
  </div>

  <div className="card">
    <h3>⭐ Average Rating</h3>
    <p>
      {businesses.length > 0
        ? (
            businesses.reduce(
              (sum, b) =>
                sum + parseFloat(String(b.Rating).replace(" stars", "")),
              0
            ) / businesses.length
          ).toFixed(2)
        : 0}
    </p>
  </div>

  <div className="card">
    <h3>🌐 With Website</h3>
    <p>
      {businesses.filter(
        b => b.Website && b.Website !== "N/A"
      ).length}
    </p>
  </div>

  <div className="card">
    <h3>❌ Without Website</h3>
    <p>
      {businesses.filter(
        b => !b.Website || b.Website === "N/A"
      ).length}
    </p>
  </div>
<div className="card">
  <h3>📈 Website Coverage %</h3>
  <p>
    {(
      (businesses.filter(
        (b) => b.Website && b.Website !== "N/A"
      ).length /
        businesses.length) *
      100
    ).toFixed(1)}
    %
  </p>
</div>
<div className="card">
  <h3>🏆 Top Rated Business</h3>
  <p>{topBusiness?.Name}</p>
</div>
</div>
<h2>📊 Rating Distribution</h2>

<BarChart width={900} height={400} data={ratingData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="count" fill="#2563eb" 
  radius={[8, 8, 0, 0]}/>
</BarChart>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Website</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Rating}</td>
              <td>{item.Website}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /><br />

<button
  onClick={() => setPage(page - 1)}
  disabled={page === 1}
>
  Previous
</button>

<span style={{ margin: "0 15px" }}>
  Page {page}
</span>

<button
  onClick={() => setPage(page + 1)}
  disabled={end >= filteredBusinesses.length}
>
  Next
</button>
    </div>
  );
}
<div
  style={{
    textAlign: "center",
    marginTop: "40px",
    padding: "20px",
    color: "#64748b"
  }}
>
  © 2026 Business Analytics Dashboard | Built with React, Node.js & MongoDB
</div>

export default App;