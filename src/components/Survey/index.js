import React from "react"
import SurveyDetails from "./component/ServeyDetails"

class Survey extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div>
        <SurveyDetails/>
      </div>
    )
  }
}

export default Survey
