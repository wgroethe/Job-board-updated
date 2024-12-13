import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { Resend } from 'https://esm.sh/@resend/node@0.16.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const EMAIL_TEMPLATES = {
  applicationUpdate: {
    subject: 'Update on Your Job Application',
    html: (data: any) => `
      <h2>Hello ${data.candidateName},</h2>
      <p>There's an update on your application for ${data.jobTitle} at ${data.company}:</p>
      <p>${data.message}</p>
      <p><a href="${data.applicationUrl}">View Application Details</a></p>
    `
  },
  newMessage: {
    subject: 'New Message Received',
    html: (data: any) => `
      <h2>Hello ${data.recipientName},</h2>
      <p>You have a new message from ${data.senderName}:</p>
      <p>${data.preview}</p>
      <p><a href="${data.messageUrl}">View Message</a></p>
    `
  },
  interviewReminder: {
    subject: 'Upcoming Interview Reminder',
    html: (data: any) => `
      <h2>Hello ${data.candidateName},</h2>
      <p>This is a reminder of your upcoming interview:</p>
      <ul>
        <li>Position: ${data.jobTitle}</li>
        <li>Company: ${data.company}</li>
        <li>Date: ${data.date}</li>
        <li>Time: ${data.time}</li>
        ${data.meetingLink ? `<li>Meeting Link: <a href="${data.meetingLink}">Join Meeting</a></li>` : ''}
      </ul>
    `
  },
  jobAlert: {
    subject: 'New Jobs Matching Your Search',
    html: (data: any) => `
      <h2>Hello ${data.userName},</h2>
      <p>We found ${data.jobs.length} new jobs matching your search criteria:</p>
      <ul>
        ${data.jobs.map((job: any) => `
          <li>
            <strong>${job.title}</strong> at ${job.company}
            <br>
            ${job.location} • ${job.salary}
            <br>
            <a href="${job.url}">View Job</a>
          </li>
        `).join('')}
      </ul>
    `
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, data, recipient } = await req.json();

    if (!EMAIL_TEMPLATES[type]) {
      throw new Error('Invalid email template type');
    }

    const template = EMAIL_TEMPLATES[type];
    
    const { error } = await resend.emails.send({
      from: 'InjectorJobs <notifications@injectorjobs.com>',
      to: recipient,
      subject: template.subject,
      html: template.html(data),
    });

    if (error) throw error;

    // Log email sent in Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabaseClient
      .from('email_logs')
      .insert([{
        recipient,
        type,
        data,
        sent_at: new Date().toISOString()
      }]);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});