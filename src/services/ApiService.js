import axios from "axios";

const apiEndPoint = 'http://localhost:8080/api/'

export class ApiService {

  async getData(url) {
    try {
      const res = await axios.get(
        `${apiEndPoint}${url}`
      )
      return { done: true, data: res.data || null }
    } catch ({response}) {
      return { done: false, message: (response && response.data && response.data.message) || "" }
    }
  }

  async postMethod(url, data) {
    try {
      const res = await axios.post(
        `${apiEndPoint}${url}`,
        data,
      )
      return { done: true, data: res.data || null }
    } catch ({response}) {
      console.log(response)
      return { done: false, message: (response && response.data && response.data.message) || "" }
    }
  }

  async getSurvey(){
    return await this.getData(`patients`);
  }

  async onCreateSurvey(body){
    return await this.postMethod(`patients`, body);
  }
}
