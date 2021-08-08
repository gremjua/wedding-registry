import { Couple } from 'context/CoupleContext';
import { Transaction } from 'context/TransactionContext';

export type EmailData = {
	from: string;
	to: string;
	content: string;
	subject: string;
};

const buildEmailForGifter = (
	transaction: Transaction,
	transactionId: string,
	couple: Couple
): EmailData => {
	const from = process.env.REACT_APP_EMAIL || '';
	const { email: to } = transaction;

	const content = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <!-- NOTE: external links are for testing only -->
        <link href="//cdn.muicss.com/mui-0.10.3/email/mui-email-styletag.css" rel="stylesheet" />
        <link href="//cdn.muicss.com/mui-0.10.3/email/mui-email-inline.css" rel="stylesheet" />
      </head>
      <body>
        <table class="mui-body" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <center>
                <!--[if mso]><table><tr><td class="mui-container-fixed"><![endif]-->
                <div class="mui-container">
                    <div class="mui--text-headline">
                        &#127881; ¡Confirmaste tu regalo! &#127881;
                    </div>
                    <div class="mui--text-body1">
                        El ID de tu regalo es: <b>${transactionId}</b>.<br />
                        Hacé la transferencia de <b>$${transaction.amount.toLocaleString(
																									'es-ar'
																								)}</b> a la siguiente cuenta y recordá <b>subir el comprobante</b>:
                        <br />
                        <b>
                            <i>${couple.bank.name}</i>
                        </b>
                        <br />
                        <b>Número de CBU</b>:
                        <input
                            readOnly
                            value='${couple.bank.cbu}'
                            style="width:172px; border:none;"
                        />
                        <br />
                        <b>Alias de CBU</b>: ${couple.bank.alias}
                        <br />
                    </div>
                    <div class="mui--text-button">
                        <a href="${process.env.REACT_APP_URL}/${
		couple.slug
	}/upload/${transactionId}">
                        Subí el comprobante de transferencia
                        </a>
                    </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
              </center>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
	const subject = `🎉 Confirmaste tu regalo para ${couple.title} 🎉 `;
	return { from, to, content, subject };
};

const buildEmailForCouple = (
	transaction: Transaction,
	coupleEmail: string
): EmailData => {
	const from = process.env.REACT_APP_EMAIL || '';
	const to = coupleEmail;
	const content = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width" />
      <!-- NOTE: external links are for testing only -->
      <link href="//cdn.muicss.com/mui-0.10.3/email/mui-email-styletag.css" rel="stylesheet" />
      <link href="//cdn.muicss.com/mui-0.10.3/email/mui-email-inline.css" rel="stylesheet" />
    </head>
    <body>
      <table class="mui-body" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <center>
              <!--[if mso]><table><tr><td class="mui-container-fixed"><![endif]-->
              <div class="mui-container">
                  <div class="mui--text-headline">
                      &#127881; ¡Recibiste un regalo! &#127881;
                  </div>
                  <div class="mui--text-body1">
                      Recibiste un regalo de <b>${
																							transaction.buyerName
																						}</b> por un monto de <b>$${transaction.amount.toLocaleString(
		'es-ar'
	)}</b> con la siguiente dedicatoria:<br />
                      <br />
                      <b>
                          <i>${transaction.tag}</i>
                      </b>
                      <br />
                      <br />
                      Podés agradecerle enviandole un email a <b>${
																							transaction.email
																						}</b>
                  </div>
              </div>
              <!--[if mso]></td></tr></table><![endif]-->
            </center>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
	const subject = '🎉 Recibiste un regalo 🎉 ';
	return { from, to, content, subject };
};

export const sendEmailToGifter = async (
	transaction: Transaction,
	id: string,
	couple: Couple,
	url = `${process.env.REACT_APP_URL}/api/email`
): Promise<JSON> => {
	const data = buildEmailForGifter(transaction, id, couple);
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
};

export const sendEmailToCouple = async (
	transaction: Transaction,
	coupleEmail: string,
	url = `${process.env.REACT_APP_URL}/api/email`
): Promise<JSON> => {
	const data = buildEmailForCouple(transaction, coupleEmail);
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	});
	return response.json();
};
