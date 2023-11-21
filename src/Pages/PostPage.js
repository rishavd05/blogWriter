import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../AppWrite/database_service";
import bucketService from "../AppWrite/bucket_service";
import Button from "../components/Button";
import Container from "../components/Container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const userData = useSelector((state) => state.auth.user);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    setLoader(true);
    if (slug) {
      databaseService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .finally(() => setLoader(false));
    } else navigate("/");
  }, [slug, navigate, setPost]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        bucketService.deleteFile(post.featuredImage);
        navigate("/");
        alert("Post deleted successfully");
      }
    });
  };

  return !loader ? (
    post && (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={bucketService.previewFile(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>)):(<Container>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </Container>);
}
