import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BlogService from "../services/BlogService";
import EditorT from "../components/Editor";

function PostForm() {
  const initPost = {
    titulo: "",
    autor: "",
    contenido: "",
  };

  const [post, setPost] = useState(initPost);
  const [isError, setIsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const savePost = async (e) => {
    e.preventDefault();

    if (!post.contenido.trim()) {
      setIsError(true);
      return;
    }

    try {
      const newPost = {
        titulo: post.titulo,
        autor: post.autor,
        contenido: post.contenido,
      };

      const res = await BlogService.save(newPost);
      const resData = res.data;

      if (resData.status) {
        Swal.fire({
          title: "Done",
          text: "Post agregado correctamente.",
          icon: "success",
        }).then(() => navigate("/"));
      } else {
        console.log("Error -> ", resData);
        setIsError(true);
      }

      setSubmitted(true);
      setPost(initPost);
    } catch (error) {
      console.log("Error on [PostForm | savePost] -> ", error);
    }
  };

  useEffect(() => {
    setSubmitted(false);
  }, []);

  return (
    <div className="container pt-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <h3>Crear post</h3>
        </div>
        <div className="col-md-6 text-end">
          <Link to={"/"} className="btn btn-dark">
            Regresar
          </Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card p-4">
            {isError && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                Todos los campos son obligatorios.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setIsError(false)}
                ></button>
              </div>
            )}
            <form onSubmit={savePost}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <label className="form-label">Titulo:</label>
                    <input
                      type="text"
                      name="titulo"
                      value={post.titulo}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-2">
                    <label className="form-label">Nombre de creador:</label>
                    <input
                      type="text"
                      name="autor"
                      value={post.autor}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-2">
                    <EditorT
                      value={post.contenido}
                      onChange={(newContent) =>
                        setPost((prevPost) => ({
                          ...prevPost,
                          contenido: newContent,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-success mb-2">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
