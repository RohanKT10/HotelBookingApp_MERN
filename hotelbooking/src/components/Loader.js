import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={styles.container}>
      <div className="sweet-loading text-center">
        <HashLoader color="#000" loading={loading} size={140} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh", // This makes the container take up the full height of the viewport
  },
};

export default Loader;