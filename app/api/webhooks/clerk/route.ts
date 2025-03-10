// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { clerkClient } from '@clerk/nextjs/server'
// import { createUser } from '@/actions/user.action'

// export async function POST(req: Request) {


// }

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { createUser } from '@/actions/user.action'

export async function POST(req: Request) {
  // 1. Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set')
  }

  // 2. Get the headers from the request
  const headerList = headers()
  const svixId = headerList.get('svix-id')
  const svixTimestamp = headerList.get('svix-timestamp')
  const svixSignature = headerList.get('svix-signature')

  // 3. Verify we have all required headers
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing required headers', { status: 400 })
  }

  // 4. Get the raw payload body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // 5. Create a new Svix Webhook instance
  const wh = new Webhook(WEBHOOK_SECRET)

  let event: WebhookEvent

  try {
    // 6. Verify the webhook signature
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  // 7. Handle specific event types
  switch (event.type) {
    case 'user.created':
      // Extract user data from the event
      const { id, email_addresses, first_name, last_name, username, image_url } = event.data

      // Create user in your database
      const newUser = await createUser({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        username: username || '',
        photo: image_url,
      })
          
      // Optional: Update Clerk metadata
      if (newUser) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        })
      }

      return new Response('User created successfully', { status: 200 })

    // Add other event types as needed
    case 'user.updated':
      // Handle user updates
      return new Response('User updated', { status: 200 })

    case 'user.deleted':
      // Handle user deletions
      return new Response('User deleted', { status: 200 })

    default:
      console.log(`Unhandled event type: ${event.type}`)
      return new Response('Event received', { status: 200 })
  }
}