import React from "react";
import PostCard from "../components/PostCard";
import Container from "../components/Container/Container";
import databaseService from "../AppWrite/database_service";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function HomePage() {
  const [posts, setPosts] = React.useState([]);
  const loginState = useSelector((state) => state.auth.isLogged);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    try {
      databaseService.getAllPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    } finally {
      setLoading(false);
    }
  }, [loginState]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    if (posts.length === 0) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  {loginState ? (
                    "No posts yet"
                  ) : (
                    <>
                      <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                      </div>
                    </>
                  )}
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    }
    return (
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
    );
  }
}
