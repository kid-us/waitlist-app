import html
import resend
from core.config import get_settings

settings = get_settings()
resend.api_key = settings.resend_api_key

WELCOME_EMAIL_HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to the Waitlist</title>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        font-family: Arial, sans-serif;
      }

      .container {
        max-width: 350px;
        width: 90%;
        background-color: #ffffff;
        padding: 40px 30px;
        border-radius: 10px;
        text-align: justify;
        border: 1px solid #cdcdcd;
      }

      h1 {
        color: #111827;
        font-size: 22px;
        margin-bottom: 30px;
        text-align: center;
      }

      p {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 25px;
      }

      .footer {
        margin-top: 15px;
        font-size: 12px;
        color: #9ca3af;
        text-align: center;
      }

      @media screen and (max-width: 600px) {
        .container {
          padding: 30px 20px;
        }

        h1 {
          font-size: 22px;
        }

        p {
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <table
      width="100%"
      height="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
    >
      <tr>
        <td align="center" valign="middle">
          <!-- Your existing container -->
          <div class="container">
            <h1>Welcome to Our Waitlist!</h1>
            <p>Hi __EMAIL__,<br /></p>
            <p>
              Thank you for joining our waitlist! We're excited to have you on
              board. You'll be the first to know when we launch and get early
              access.
            </p>
            <p class="footer">
              If you didn't sign up for this waitlist, please ignore this email.
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
"""

def render_welcome_email(email: str) -> str:
    """Render the welcome email HTML with a personalized greeting.

    The email is safely HTML-escaped to avoid any HTML injection.
    """
    safe_email = html.escape(email)
    return WELCOME_EMAIL_HTML_TEMPLATE.replace("__EMAIL__", safe_email)


def send_welcome_email(email: str) -> None:
    """Send welcome email to new waitlist subscriber.

    Note: This function is synchronous on purpose to work correctly with
    FastAPI BackgroundTasks, which calls sync callables after the response.
    """
    try:
        r = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": "Welcome to Our Waitlist!",
            "html": render_welcome_email(email),
        })
        # Optional: log or integrate with your logger
        print(f"Welcome email queued/sent to {email}: {r}")
    except Exception as e:
        # Optional: replace with proper logging
        print(f"Failed to send email to {email}: {e}")
