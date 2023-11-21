import React from "react";

import PostCard from "../components/PostCard";
import Container from "../components/Container/Container";
import databaseService from "../AppWrite/database_service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllPosts() {
  const navigate = useNavigate
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
      databaseService.getAllPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      }).finally(() => {
        setLoading(false);
      });
  }, [navigate,posts]);

  return !loading ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <div
            className="flex justify-center items-center h-screen"
            style={{
              top: "20px",
              width: "100%",
              position: "fixed",
              zIndex: "100",
            }}
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
    </div>
  );
}


export default AllPosts;