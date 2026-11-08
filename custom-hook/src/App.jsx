
import React from "react";
import { useFetch } from "./UseFetch";

const App = () => {
  const {
    data,
    loading,
    error
  } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>Error: {error}</h3>;

  return (
    <div>
      <h2>User List</h2>

      {data?.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
    </div>
  );
};

export default App;
