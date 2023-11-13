import { Link } from "react-router-dom";
import BlogService from "../services/BlogService";
import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import List from "../components/List";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterField, setFilterField] = useState("titulo");
  const postsPerPage = 9;

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const escapedSearchTerm = searchTerm.replace(
      /[-[\]{}()*+?.,\\^$|#\s]/g,
      "\\$&",
    );
    const searchRegex = new RegExp(escapedSearchTerm, "i");

    const filtered = posts.filter((post) =>
      searchRegex.test(post[filterField]),
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts, filterField]);

  const getPosts = () => {
    BlogService.getAll()
      .then((response) => {
        if (response.data) {
          setCurrentPage(1);
          setPosts(response.data);
          setFilteredPosts(response.data);
          setFilterField("titulo");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    getPosts();
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentData = filteredPosts.slice(firstPostIndex, lastPostIndex);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="container pt-5">
        <div className="row mb-4">
          <div className="col-md-6">
            <h3>Posts</h3>
          </div>
          <div className="col-md-6 text-end">
            <Link to={"/post/save"} className="btn btn-dark">
              Crear post
            </Link>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-4">
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <option value="titulo">Título</option>
              <option value="autor">Autor</option>
              <option value="contenido">Contenido</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-secondary" onClick={handleClearSearch}>
              Borrar búsqueda
            </button>
          </div>
        </div>
        <div className="row">
          {filteredPosts.length === 0 ? (
            <p>No hay registros</p>
          ) : (
            <>
              <List data={currentData} />
              <Pagination
                totalPosts={filteredPosts.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Posts;
