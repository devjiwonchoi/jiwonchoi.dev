import { Resend } from 'resend'

export async function sendEmail({
  from = 'no-reply@jiwonchoi.dev',
  to = 'devjiwonchoi@gmail.com',
  subject,
  text = 'Check out: https://vercel.com/jiwonchoi/jiw-one/logs',
}: {
  from?: string
  to?: string
  subject: string
  text?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const response = await resend.emails.send({
    from,
    to,
    subject,
    text,
  })

  if (response.error) {
    return new Response(response.error.message, { status: 500 })
  }
}
