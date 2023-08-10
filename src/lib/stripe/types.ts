import Stripe from 'stripe';

export type Product = Stripe.Product;
export type Price = Stripe.Price;

// export interface Pojo {
//     [key: string]: number | string | boolean
// }

// export interface Product {
//     id: string
//     object: string
//     active: boolean
//     created: number
//     default_price: string | Price
//     description: string
//     images: string[]
//     livemode: boolean
//     metadata: Pojo | object
//     name: string
//     package_dimensions: Pojo | object | null
//     shippable: boolean | null
//     statement_descriptor: string | null
//     tax_code: string | null
//     unit_label: string | null
//     updated: number
//     url: string | null
// }

// export interface Price {
//     id: string
//     object: string
//     active: boolean
//     billing_scheme: string
//     created: number
//     currency: string
//     custom_unit_amount: Pojo | object
//     livemode: boolean
//     lookup_key: string
//     metadata: Pojo | object
//     nickname: string
//     product: string
//     recurring: Pojo | object
//     tax_behavior: string
//     tiers_mode: string | null
//     transform_quantity: Pojo | object | null
//     type: string
//     unit_amount: number
//     unit_amount_decimal: string
// }
