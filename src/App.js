import React from "react";
import "./index.scss";
import { Collection } from "./Collection";

const categories = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";

    fetch(
      `https://63adbbe6ceaabafcf16ad40f.mockapi.io/test?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      })
      .finally(() => setLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId == i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, i) => (
              <Collection key={i} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page == i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
        {/* <li>1</li>
        <li className="active">2</li>
        <li>3</li> */}
      </ul>
    </div>
  );
}

export default App;
