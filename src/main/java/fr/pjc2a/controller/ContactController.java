package fr.pjc2a.controller;

import java.util.Properties;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.validator.routines.EmailValidator;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.Priority;

import fr.adp.socle.lang.utils.StringUtils;
import fr.pjc2a.bean.AppBean;
import fr.pjc2a.bean.ContactBean;

@ManagedBean
@RequestScoped
public class ContactController {

	private static final Logger LOGGER = Logger.getLogger(ContactController.class);

	@ManagedProperty(value = "#{contactBean}")
	private ContactBean contactBean;

	@ManagedProperty(value = "#{appBean}")
	private AppBean appBean;

	public void sendMail() {
		contactBean.setErrorMail(!EmailValidator.getInstance().isValid(contactBean.getContactMail()));
		contactBean.setErrorMessage(StringUtils.isEmpty(contactBean.getMessage()));
		contactBean.setErrorName(StringUtils.isEmpty(contactBean.getContactName()));
		if (!(contactBean.isErrorMail() || contactBean.isErrorMessage() || contactBean.isErrorName())) {
			boolean sendOK = send();
			contactBean.setSendError(!sendOK);
			contactBean.setSendSucces(sendOK);
		}
	}
	
	public void retry(){
		contactBean.setSendError(false);
		contactBean.setSendSucces(false);
	}

	private boolean send() {

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "auth.smtp.1and1.fr");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(appBean.getMailAdress(), "sirterton007");
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("donotreply@pj-c2a.fr"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("pascale@pj-c2a.fr"));
			message.setReplyTo(InternetAddress.parse(contactBean.getContactMail()));
			message.setSubject(StringUtils.isBlank(contactBean.getSubject()) ? "Un nouveau message depuis votre site" : contactBean.getSubject());
			message.setText(contactBean.getMessage());

			Transport.send(message);

		} catch (MessagingException e) {
			if (LOGGER.isEnabledFor(Level.ERROR)) {
				LOGGER.error("Erreur lors de l'envoi d'un Email : " + e.getLocalizedMessage(), e);
			}
			return false;
		}
		return true;
	}

	public void setContactBean(ContactBean contactBean) {
		this.contactBean = contactBean;
	}

	public void setAppBean(AppBean appBean) {
		this.appBean = appBean;
	}

}
