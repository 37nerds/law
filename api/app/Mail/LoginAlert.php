<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LoginAlert extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $ip,
        public string $browser,
        public string $os,
        public string $device
    )
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Login Alert',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: "emails.login-alert",
            with: [

            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
