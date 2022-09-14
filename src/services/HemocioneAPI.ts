import axios from 'axios'
import config from '../config'
const { Unexpected } = require('../errors')

type RequestMethods = 'get' | 'post' | 'put' | 'delete'
type RequestConfigs = {
  query?: any
  body?: any
  headers?: any
}

class HemocioneAPI {
  private url: string

  constructor() {
    this.url = config.api_url
  }

  async validateToken(token: string) {
    const configs = {
      headers: {
        Authorization: token,
      },
    }

    const response = await this.request('get', '/users/validate-token', configs)

    return response.user
  }

  async request(
    method: RequestMethods,
    path: string,
    configs: RequestConfigs = {}
  ) {
    try {
      const request = await axios({
        method,
        url: `${this.url}${path}`,
        data: configs.body,
        params: configs.query,
        headers: configs.headers,
      })

      return request.data
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Unexpected(
          `[Hemocione API] - A requisição para a rota (${path}) falhou com o status[${error.response.status}]. ${error.response.data}`
        )
      }
      if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Unexpected(
          `[Hemocione API] - A requisição para a rota (${path}) falhou. ${error.request}`
        )
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Unexpected(
          `[Hemocione API] - Erro inesperado na rota (${path}). ${error.message}`
        )
      }
    }
  }
}

export default new HemocioneAPI()
