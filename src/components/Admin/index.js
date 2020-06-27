import React from "react"
import { message, Table, Icon } from "antd"
import { ApiService } from "../../services/ApiService";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Loader from "../../GlobalComponents/Loader";

class AdminView extends React.Component {
  _apiService = new ApiService()
  constructor(props){
    super(props)
    this.state = {
      patientList: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.onGetPatient()
  }

  onGetPatient = async () => {
    const response = await this._apiService.getSurvey()
    if (response && !response.done) {
      this.setState({
        isLoading: false
      })
      return message.error(response.message || 'something is wrong! please try again');
    } else {
      this.setState({
        patientList: response.data,
        isLoading: false
      })
    }
  }


  getColumn = () => {
    return [
      {
        title: 'Patient Name',
        dataIndex: 'patientName'
      },
      {
        title: 'Patient Email',
        dataIndex: 'patientEmail'
      },
    ]
  }

  expandedRowRender = (mainRecord) => {
    const { covidSurvey } = mainRecord || {}
    const { symptoms, testingDate, surveyQuestions, positiveQuestions } = covidSurvey || {}
    return (
      <div>
        {
          (surveyQuestions || []).map((que, index) => {
            return(
              <div key={index.toString()}>
                <p>{`${index + 1}) ${que.question}`}: <b>{que.answer}</b></p>
                {
                  index === 3 && (symptoms || []).length ?
                    <p>Symptoms: <b>{(symptoms || []).join()}</b></p> : null
                }
              </div>
            )
          })
        }
        {
          (testingDate || []).map((date, index) => {
            return(
              <div key={index.toString()}>
                <p>{`Date For Test ${index + 1}`}: <b>{date.testDate}</b></p>
              </div>
            )
          })
        }
        {
          (positiveQuestions || []).map((que, index) => {
            if(!que.answer) return
            return(
              <div key={index.toString()}>
                <p>{`${index + 1}) ${que.question}`}: <b>{que.answer}</b></p>
              </div>
            )
          })
        }
      </div>
    );
  };

  customExpandIcon = (props) => {
    if (props.expanded) {
      return <Icon onClick={e => props.onExpand(props.record, e)} type="caret-up" theme="filled"/>;
    } else {
      return <Icon onClick={e => props.onExpand(props.record, e)} type="caret-down" theme="filled"/>;
    }
  }


  render() {
    const { patientList, isLoading } = this.state
    return(
      <div>

        <Col xs="12" sm="12" lg="12">
          <Card className="no-border">
            <CardBody className="pt-5 px-10 min-height-card">
              {
                isLoading ? <Loader className="mt-50"/> :
                  <>
                    <Row>
                      <Col md="12" sm="12" className="pr-5">
                        <Card className="mb-10">
                          <CardHeader>Patient List</CardHeader>
                          <CardBody>
                            <Table
                              dataSource={patientList}
                              columns={this.getColumn()}
                              rowKey={"_id"}
                              expandIcon={this.customExpandIcon}
                              expandedRowRender={this.expandedRowRender}
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </>
              }
            </CardBody>
          </Card>
        </Col>
      </div>
    )
  }
}

export default AdminView
