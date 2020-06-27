import React from "react"
import {PropagateLoader} from "react-spinners";

const Loader = () => (
  <div className="loader">
    <PropagateLoader
      size={30}
      color={"#45c4e4"}
    />
  </div>
)

export default Loader
