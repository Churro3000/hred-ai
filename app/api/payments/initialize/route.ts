import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('hr_session')?.value
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { email, name } = JSON.parse(Buffer.from(session, 'base64').toString())

    const { plan } = await req.json()
    if (!['starter', 'professional'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const variantId = plan === 'starter'
      ? process.env.LEMONSQUEEZY_STARTER_VARIANT_ID
      : process.env.LEMONSQUEEZY_PROFESSIONAL_VARIANT_ID

    const res = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email,
              name,
            },
            product_options: {
              redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: String(process.env.LEMONSQUEEZY_STORE_ID),
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: String(variantId),
              },
            },
          },
        },
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('LemonSqueezy error:', data)
      return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 })
    }

    const checkoutUrl = data?.data?.attributes?.url
    if (!checkoutUrl) {
      return NextResponse.json({ error: 'No checkout URL returned' }, { status: 500 })
    }

    return NextResponse.json({ paymentUrl: checkoutUrl })
  } catch (err) {
    console.error('Payment init error:', err)
    return NextResponse.json({ error: 'Payment failed.' }, { status: 500 })
  }
}