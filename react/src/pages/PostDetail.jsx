import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../services/BlogService";
import { Link } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await BlogService.get(id);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container pt-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <h3>Detalle post</h3>
        </div>
        <div className="col-md-6 text-end">
          <Link to={"/"} className="btn btn-dark">
            Regresar
          </Link>
        </div>
      </div>
      <div className="row card p-4">
        <div className="col-md-6">
          <h2>Titulo: {post.titulo}</h2>
        </div>
        <div className="col-md-6">
          <h5>Autor: {post.autor}</h5>
        </div>
        <hr />
        <div className="col-md-12">
          <label className="form-label">Contenido:</label>
          <div dangerouslySetInnerHTML={{ __html: post.contenido }} />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
