function buildReference(reference) {
  return `<tr class="list-item">
              <td>
                <div
                  class="user-card"
                  style="
                    background-color: #fff;
                    border-radius: 0px 16px 16px 40px;
                    margin-top: 14px;
                    padding: 8px;
                    width: 300px;
                  "
                >
                  <table>
                    <td>
                      <div class="user-avatar" style="margin-right: 14px">
                        <img
                          src="${reference.avatar}"
                          alt="Person"
                          style="border-radius: 0px 200px 200px 200px; height: 60px; width: 60px"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="description">
                        <strong>${reference.fullName}</strong>
                        <p style="color: #51425e; font-size: 14px; margin: 0; margin-top: 5px">${reference.title}</p>
                      </div>
                    </td>
                  </table>
                </div>
              </td>
            </tr>`;
}

function buildReferencesDiv(references) {
  const arr = references.map((reference) => buildReference(reference));
  return arr.join(' ');
}

export function prospectInvitationEmailTemplate(emailBody, references, magicLink) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Onboarding</title>
  </head>
</html>
<body style="color: #2e1334; font-family: sans-serif; height: 100vh; margin: 0 auto; padding: 0">
  <table
    class="container"
    role="presentation"
    background="https://i.ibb.co/1KD4YCg/gby-Rlq8bizjlin-JGswlfa-GDxjwxc-Sexwg-Akcp-FLPz-S2zxu-Yuk5839xw-TPy-KHx-NRmau-FSCHcq-Kb9-KF5zq-Jd-Zk.png"
    width="100%"
    height="100%"
  >
    <tr>
      <td class="container-body" style="padding: 30px; vertical-align: top">
        <table class="header" style="height: 100px">
          <tr>
            <td>
              <p class="logo"><img src="https://i.ibb.co/RSLz7TN/Lab-Group.png" alt="Company logo" /></p>
            </td>
          </tr>
        </table>
        <center
          class="card"
          style="
            background-color: rgba(255, 255, 255, 0.65);
            border-radius: 24px;
            border-top-left-radius: 0;
            margin: 0 auto;
            margin-bottom: 10%;
            padding: 36px;
            padding-top: 10px;
            width: 500px;
          "
        >
          <table>
            <tr>
              <td>
                <p
                  class="text"
                  style="
                    color: #2e1334;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 120%;
                    margin: 0;
                  "
                >
                  ${emailBody}
                </p>
              </td>
            </tr>
          </table>
          <table>
            ${buildReferencesDiv(references)}
            <tr class="divider" style="height: 30px"></tr>
            <tr class="list-item">
              <td>
                <div class="action-card">
                  <a
                    class="button"
                    href="${magicLink}"
                    target="_blank"
                    style="
                      background-color: #481453;
                      border-radius: 100px;
                      color: #fff;
                      font-family: sans-serif;
                      letter-spacing: 0.04rem;
                      padding: 12px 24px;
                      text-decoration: none;
                    "
                    >Schedule a meeting</a
                  >
                </div>
              </td>
            </tr>
          </table>
        </center>
        <table class="footer" style="height: 50px; margin-top: 30px; width: 100%">
          <tr class="footer-body" style="float: right">
            <td>
              <div class="copyright" style="line-height: 43px; margin-top: 24px">
                © 2022. Powered by
                <img
                  src="https://i.ibb.co/N9JWYYn/Deeto-Logo-for-google.png"
                  alt="Deeto copyright logo"
                  style="margin-left: 10px; width: 120px"
                />
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>`;
}
