import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function Demo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current?.signal,
        });
        const posts = (await response.json()) as Post[];
        setPosts(posts);
      } catch (error: any) {
        if (error.name === "AbortError"){
            console.log("Aborted successfully")
            return;
        }
             setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (error) {
    return <div>Error... please try again.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Data Fetching in react</h1>
      <button className="bg-amber-300" onClick={() => setPage(page + 1)}>
        Increase Page {page}
      </button>
      {isLoading && <div> Loading.... </div>}
      <ul>
        {posts.map((post) => {
          return <li> {post.id}</li>;
        })}
      </ul>
    </div>
  );
}
