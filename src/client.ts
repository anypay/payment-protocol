
import axios from 'axios'

import * as protocol from './protocol'

export class Client {

  url: string;

  constructor(url: string) {

    this.url = url

  }

  async paymentOptions(): Promise<protocol.PaymentOptions> {

    let { data } = await axios.get(this.url, {
      headers: {
        'x-paypro-version': 2,
        'accept': 'application/payment-options'
      }
    })

    return data

  }

  async paymentRequest(params: protocol.SelectPaymentRequest): Promise<protocol.PaymentRequest> {

    let { data } = await axios.post(this.url, params, {
      headers: {
        'x-paypro-version': 2,
        'content-type': 'application/payment-request'
      }
    })

    return data

  }

  async paymentVerification(params: protocol.PaymentVerificationRequest): Promise<protocol.PaymentVerification> {

    let { data } = await axios.post(this.url, params, {
      headers: {
        'x-paypro-version': 2,
        'content-type': 'application/payment-verification'
      }
    })

    return data

  }

  async payment(

    params: protocol.Payment

  ): Promise<protocol.PaymentResponse> {

    let { data } = await axios.post(this.url, params, {
      headers: {
        'x-paypro-version': 2,
        'content-type': 'application/payment'
      }
    })

    return data

  }

}

