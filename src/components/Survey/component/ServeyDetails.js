import React from "react"
import moment from "moment"
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  DatePicker,
  Button,
  message
} from "antd";
import Loader from "../../../GlobalComponents/Loader"
import { ApiService } from "../../../services/ApiService"

class SurveyDetails extends React.Component {
  _apiService = new ApiService()
  constructor(props){
    super(props)
    this.state = {
      questions: [
        { question: "Have you or someone that you have contacted has traveled in the previous 14 days?", options: ["Yes", "No"] },
        { question: "Have you been in contact with someone who presented COVID19 symptoms?", options: ["Yes", "No"] },
        { question: "Have you been in contact with someone who tested positive for COVID19?", options: ["Yes", "No"] },
        { question: "Have you presented symptoms suggestive of COVID19?", options: ["Yes", "No"] },
        { question: "Have you been tested for COVID19?", options: ["Yes", "No"] },
        { question: "What were the results of the test?", options: ["I tested positive", "I tested negative"] },
      ],
      testTime: 0,
      symptoms: ["Fever", "Cough", "Shortness of breath or difficulty breathing", "Tiredness", "Chills", "Muscular pain", "Headaches", "Sore throat", "Runny nose", "Diarrhea", "Vomiting", "Loss of taste or smell"],
      patientDetails: {
        patientName: '',
        patientEmail: '',
        surveyQuestions: [
          { question: "Have you or someone that you have contacted has traveled in the previous 14 days?", answer: '' },
          { question: "Have you been in contact with someone who presented COVID19 symptoms?", answer: '' },
          { question: "Have you been in contact with someone who tested positive for COVID19?", answer: '' },
          { question: "Have you presented symptoms suggestive of COVID19?", answer: '' },
          { question: "Have you been tested for COVID19?", answer: '' },
          { question: "What were the results of the test?", answer: '' },
        ],
        positiveQuestions: [
          {question: "How many of these tests were molecular?", answer: ""},
          {question: "How many of these tests were serological (Rapid tests)?", answer: ""},
          {question: "Have you fully recovered and tested negative?", answer: ""},
        ],
        symptoms: []
      },
      testingDate: [],
      positiveQuestions: [
        {question: "How many of these tests were molecular?", answer: ""},
        {question: "How many of these tests were serological (Rapid tests)?", answer: ""},
        {question: "Have you fully recovered and tested negative?", options: ["Yes", "No"], answer: ""},
      ]
    }
  }

  onChange = (event) => {
    let { patientDetails } = this.state
    const { name, value } = event.target
    patientDetails[name] = value
    this.setState({
      patientDetails
    })
  }

  onAnsChange = (event, index) => {
    let { patientDetails } = this.state
    const { value } = event.target
    patientDetails.surveyQuestions[index].answer = value
    if(index === 3 && value === "No"){
      patientDetails.symptoms = []
    }
    this.setState({
      patientDetails
    })
  }

  onTestDateChange = (value, index) => {
    let { testingDate } = this.state
    testingDate[index].testDate = value
    this.setState({
      testingDate
    })
  }

  onPositiveQusChange = (value, index) => {
    let { patientDetails } = this.state
    patientDetails.positiveQuestions[index].answer = value
    this.setState({
      patientDetails
    })
  }

  onReportChange = (event, index) => {
    let { patientDetails } = this.state
    patientDetails.positiveQuestions[index].answer = event.target.value
    this.setState({
      patientDetails
    })
  }

  getFollowingQuestion = () => {
    const { testTime, testingDate, positiveQuestions, patientDetails } = this.state
    const questions = patientDetails.positiveQuestions || []
    return(
      <div>
        <Form.Item label={"How many times have you been tested?"}>
          <InputNumber name='testTime' value={testTime} onChange={(value) => this.setState({testTime: value, testingDate: Array.from({length: value}, (v, i) => ({testDate: ''}))})}/>
        </Form.Item>
        {
          (testingDate || []).map((test, index) => {
            return(
              <div key={index.toString()}>
                <Form.Item label={`Date for test ${index + 1}`}>
                  <DatePicker
                    format={'M/D/YYYY'}
                    onChange={(date, dateString) => this.onTestDateChange(dateString, index)}
                    value={test.testDate ? moment(test.testDate) : null}
                  />
                </Form.Item>
              </div>
            )
          })
        }
        {
          testingDate && testingDate.length && (positiveQuestions || []).map((que, index) => {
            return(
              <div key={index.toString()}>
                <Form.Item label={que.question}>
                  {
                    index === 2 ?
                      <>
                        <Radio value={que.options[0]} name="isNegative" checked={questions[index].answer === que.options[0]} onChange={(event) => this.onReportChange(event, index)}>Yes</Radio>
                        <Radio value={que.options[1]} name="isNegative" checked={questions[index].answer === que.options[1]} onChange={(event) => this.onReportChange(event, index)}>No</Radio>
                      </>
                      :
                      <InputNumber value={questions[index].answer} onChange={(value) => this.onPositiveQusChange(value, index)}/>
                  }
                </Form.Item>
              </div>
            )
          })
        }
      </div>
    )
  }

  onSurvey = async () => {
    const { patientDetails, testingDate } = this.state
    const { patientName, patientEmail, positiveQuestions, surveyQuestions, symptoms } = patientDetails || {}

    const body = {
      patientName,
      patientEmail,
      covidSurvey: {
        positiveQuestions,
        surveyQuestions,
        symptoms,
        testingDate
      }
    }
    const response = await this._apiService.onCreateSurvey(body)
    if (response && !response.done) {
      return message.error(response.message || 'something is wrong! please try again');
    } else {
      message.success('patient Survey Successfully');
    }
  }

  render() {
    const { loading, patientDetails, questions, symptoms } = this.state
    const { patientName, patientEmail, surveyQuestions } = patientDetails || {}
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
      labelAlign: 'right'
    };
    return(
      <div>

        <Form  {...formItemLayout} className="view-mode">
          <Row>
            <Col xs="12" sm="12" lg="12">
              <Card className="no-border">
                <CardBody className="pt-5 px-10 min-height-card">
                  {
                    loading ? <Loader className="mt-50"/> :
                      <>
                        <Row>
                          <Col md="12" sm="12" className="pr-5">
                            <Card className="mb-10">
                              <CardHeader>Patient Details</CardHeader>
                              <CardBody>
                                <Row>
                                  <Col md="6" sm="12">
                                    <Form.Item label="Patient Name">
                                      <Input name="patientName" value={patientName} onChange={this.onChange}/>
                                    </Form.Item>
                                  </Col>
                                  <Col md="6" sm="12">
                                    <Form.Item label="Patient Email">
                                      <Input name="patientEmail" value={patientEmail} onChange={this.onChange}/>
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row>
                                  {
                                    (questions || []).map((que, index) => {
                                      const option1 = que.options[0]
                                      const option2 = que.options[1]
                                      const ans1 = surveyQuestions[index].answer === option1
                                      const ans2 = surveyQuestions[index].answer === option2
                                      return(
                                        <div key={index.toString()}>
                                          <Col md="6" sm="12">
                                            {
                                              index === 5 && surveyQuestions[4].answer === "Yes" ?
                                                <div>
                                                  <Form.Item label={`Question ${index + 1}`}>
                                                    <span>{que.question}</span>
                                                  </Form.Item>
                                                  <Form.Item label="Answer">
                                                    <Radio value={option1} checked={ans1} onChange={(event) => this.onAnsChange(event, index)}>{option1}</Radio>
                                                    <Radio value={option2} checked={ans2} onChange={(event) => this.onAnsChange(event, index)}>{option2}</Radio>
                                                  </Form.Item>
                                                </div> : null
                                            }
                                            {
                                              index !== 5 ?
                                                <div>
                                                  <Form.Item label={`Question ${index + 1}`}>
                                                    <span>{que.question}</span>
                                                  </Form.Item>
                                                  <Form.Item label="Answer">
                                                    <Radio value={option1} checked={ans1} onChange={(event) => this.onAnsChange(event, index)}>{option1}</Radio>
                                                    <Radio value={option2} checked={ans2} onChange={(event) => this.onAnsChange(event, index)}>{option2}</Radio>
                                                  </Form.Item>
                                                </div> : null
                                            }
                                            {
                                              index === 3 && ans1 ?
                                                <Form.Item label="Symptoms">
                                                  <Checkbox.Group options={symptoms} onChange={(value) => this.onChange({target: {name: 'symptoms', value}})} />
                                                </Form.Item> : null
                                            }
                                            {
                                              index === 5 && ans1 ?
                                                this.getFollowingQuestion() : null
                                            }
                                          </Col>
                                        </div>
                                      )
                                    })
                                  }
                                </Row>
                                <Row>
                                  {
                                    (surveyQuestions[4].answer) ?
                                      <Button onClick={this.onSurvey} disabled={!patientName || !patientEmail}>Submit</Button> : null
                                  }
                                </Row>

                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>

      </div>
    )
  }
}

export default SurveyDetails
