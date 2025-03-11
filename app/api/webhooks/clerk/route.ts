import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/clerk-sdk-node' 
import { createUser } from '@/actions/user.action'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set')
  }

  const headerList = headers()
  const svixId = headerList.get('svix-id')
  const svixTimestamp = headerList.get('svix-timestamp')
  const svixSignature = headerList.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing required headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  switch (event.type) {
    case 'user.created':
      const { id, email_addresses, first_name, last_name, username, image_url } = event.data

      const newUser = await createUser({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        username: username || '',
        photo: image_url,
      })

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, { publicMetadata: { userId: newUser._id } })
      }

      return new Response('User created successfully', { status: 200 })

    case 'user.updated':
      return new Response('User updated', { status: 200 })

    case 'user.deleted':
      return new Response('User deleted', { status: 200 })

    default:
      console.log(`Unhandled event type: ${event.type}`)
      return new Response('Event received', { status: 200 })
  }
}
