import { Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import PostForm from "./pages/PostForm";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/post/save" element={<PostForm />} />
        <Route exact path="/post/detail/:id" element={<PostDetail />} />
      </Routes>
    </>
  );
}

export default App;
