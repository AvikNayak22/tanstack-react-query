import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const WithQuery = () => {
  const [page, setPage] = useState(1);
  const getPosts = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}`
    );
    return res.json();
  };

  //   const getUsers = async () => {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/users");
  //     if (!res.ok) {
  //       throw new Error("Something went wrong while fetching users!");
  //     }
  //     return res.json();
  //   };

  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: getPosts,
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  //   const {
  //     data: users,
  //     error: usersError,
  //     isPending: isUsersPending,
  //   } = useQuery({
  //     queryKey: ["users"],
  //     queryFn: getUsers,
  //     staleTime: 10000,
  //   });

  //   const [
  //     { data, error, isPending },
  //     { data: users, error: usersError, isPending: isUsersPending },
  //   ] = useQueries({
  //     queries: [
  //       {
  //         queryKey: ["posts"],
  //         queryFn: getPosts,
  //         staleTime: 10000,
  //       },
  //       {
  //         queryKey: ["users"],
  //         queryFn: getUsers,
  //         staleTime: 10000,
  //       },
  //     ],
  //   });

  if (isPending) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Error: {error.message}
      </h1>
    );
  }

  return (
    <div className="m-4 max-w-[600px] w-4/5 mx-auto">
      <Link
        to="/withoutquery"
        className="bg-gray-300 block w-fit my-8 mx-auto text-center py-2 px-4 rounded hover:bg-gray-400 font-medium"
      >
        Go to without query
      </Link>
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Posts Data
      </h1>
      <div className={`${isFetching ? "bg-gray-300 opacity-50" : ""}`}>
        {data &&
          data.map((post) => {
            return (
              <Link
                to={`${post.id}`}
                key={post.id}
                className="p-4 rounded-lg block border border-gray-200 my-6 cursor-pointer hover:bg-gray-900"
              >
                <h2 className="font-bold text-lg mb-2 text-gray-400">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.body}</p>
              </Link>
            );
          })}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="px-3 py-1 bg-blue-500 rounded-md text-white font-bold"
          onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          Prev
        </button>
        <p className="text-gray-100">Current page: {page}</p>
        <button
          className="px-3 py-1 bg-blue-500 rounded-md text-white font-bold"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WithQuery;
