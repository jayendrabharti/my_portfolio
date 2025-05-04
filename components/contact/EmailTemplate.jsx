export default function EmailTemplate({ imagesrc = "https://i.postimg.cc/yxgSK1J6/icon2.png",email,name, subject, message }) {

 
return(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href=${imagesrc}
    />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="Iqlipse-email" />
    <!--$-->
  </head>
  <body
    style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:37.5em;margin:0 auto;padding:20px 0 48px"
    >
      <tbody>
        <tr style="width:100%">
          <td>
          
            <img
              alt="Iqlipse"
              height="80"
              src=${imagesrc}
              style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
            />
           
            <hr
              style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0"
            />

            <p style="font-size:16px;line-height:26px;margin:16px 0">
              Hi Team Iqlipse,
            </p>
            <p style="font-size:16px;line-height:26px;margin:16px 0">
              ${message}
            </p>
            
            <hr
              style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0"
            />
            
            <p>From: <a href="mailto:${email}" class="text-decoration:underline">${email}</a></p>
            <p style="font-weight:bold">${name}</p>

            <hr
              style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0"
            />

            <a
                href="mailto:${email}"
                style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#0bc5da;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px"
                target="_blank"
            >Reply</a>
            <p
              style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa"
            >
            Iqlipse Club, DSO, Lovely Professional University, Jalandhar-Delhi, G.T. Road, Phagwara, Punjab.
        </p>
  </body>
</html>
`
)
}
