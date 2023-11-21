import React from "react";
import PostCard from "../components/PostCard";
import Container from "../components/Container/Container";
import databaseService from "../AppWrite/database_service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    databaseService
      .getAllPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, setPosts]);

  return !loading ? (
    <>
      <div className="w-full py-8">
        <Container>
          {posts.length !==0 ?(<div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>):(<div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                "No posts yet"
              </h1>
            </div>
          </div>)}
          
        </Container>
      </div>
    </>
  ) : (
    <Container>
      <div
        className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </Container>
  );
}
