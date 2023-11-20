import React from "react";

import PostCard from "../components/PostCard";
import Container from "../components/Container/Container";
import databaseService from "../AppWrite/database_service";
import { useEffect } from "react";

function AllPosts() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    console.log("loading", loading);
    try {
      databaseService.getAllPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    } finally {
      setLoading(false);
    }
  }, [loading]);

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
      <p>Loading............</p>
    </div>
  );
}


export default AllPosts;