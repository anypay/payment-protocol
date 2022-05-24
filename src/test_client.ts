
import axios from 'axios'

import * as protocol from './protocol'

interface TestClientOptions {
  headers?: any;
}

export class TestClient {

  url: string;

  supertest: any;

  headers: any;

  constructor(supertest: any, url: string, options: TestClientOptions = {}) {

    this.supertest = supertest

    this.url = url

    this.headers = options.headers || {}

  }

  async getPaymentOptions(): Promise<protocol.PaymentOptions> {

    const headers = Object.assign(this.headers, {
      'x-paypro-version': 2,
      'accept': 'application/payment-options'
    })

    let { result } = await this.supertest.inject({
      method: 'GET',
      url: this.url,
      headers
    })

    return result

  }

  async selectPaymentOption(params: protocol.SelectPaymentRequest): Promise<protocol.PaymentRequest> {

    let { result } = await this.supertest.inject({
      method: "POST",
      url: this.url,
      payload: params,
      headers: Object.assign(this.headers, {
        'x-paypro-version': 2,
        'content-type': 'application/payment-request'
      })
    })

    return result

  }

  async verifyPayment(params: protocol.PaymentVerificationRequest): Promise<protocol.PaymentVerification> {

    let { result } = await this.supertest.inject({
      method: 'POST',
      url: this.url, 
      payload: params,
      headers: Object.assign(this.headers, {
        'x-paypro-version': 2,
        'content-type': 'application/payment-verification'
      })
    })

    return result

  }

  async sendPayment(

    params: protocol.Payment

  ): Promise<protocol.PaymentResponse> {

    const payment: protocol.SendPayment = {

      chain: params.chain,

      currency: params.chain,

      transactions: params.transactions
    }

    let { result } = await this.supertest.inject({
      method: "POST",
      url: this.url,
      payload: payment,
      headers: Object.assign(this.headers, {
        'x-paypro-version': 2,
        'content-type': 'application/payment'
      })
    })

    return result

  }

}

