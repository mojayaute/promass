import moment from "moment";
import { Link } from "react-router-dom";
import { TruncatedContent } from "./TruncatedContent";

const List = ({ data }) => {
  return (
    <div className="row">
      {data.map((post) => (
        <div className="col-md-4" key={post.id}>
          <div className="card mb-4 box-shadow">
            <div className="card-body">
              <h3 className="card-text">{post.titulo}</h3>
              <h5 className="card-text">Autor: {post.autor}</h5>
              <hr />
              <TruncatedContent content={post.contenido} maxLength={70} />
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <Link
                    to={`/post/detail/${post.id}`}
                    className="btn btn-sm btn-outline-secondary mt-4"
                  >
                    Detalle
                  </Link>
                </div>
                <small className="text-muted">
                  {moment(post.created_at).format("DD-MM-YYYY")}
                </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
