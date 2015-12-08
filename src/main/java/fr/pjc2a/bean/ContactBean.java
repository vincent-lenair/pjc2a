package fr.pjc2a.bean;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

@ManagedBean
@ViewScoped
public class ContactBean implements Serializable {

	private static final long serialVersionUID = -6599253081394161565L;
	private String contactName;
	private boolean errorName;
	private String contactMail;
	private boolean errorMail;
	private String subject;
	private String message;
	private boolean errorMessage;
	
	private boolean sendSucces;
	private boolean sendError;

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public boolean isErrorName() {
		return errorName;
	}

	public void setErrorName(boolean errorName) {
		this.errorName = errorName;
	}

	public String getContactMail() {
		return contactMail;
	}

	public void setContactMail(String contactMail) {
		this.contactMail = contactMail;
	}

	public boolean isErrorMail() {
		return errorMail;
	}

	public void setErrorMail(boolean errorMail) {
		this.errorMail = errorMail;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(boolean errorMessage) {
		this.errorMessage = errorMessage;
	}

	public boolean isSendSucces() {
		return sendSucces;
	}

	public void setSendSucces(boolean sendSucces) {
		this.sendSucces = sendSucces;
	}

	public boolean isSendError() {
		return sendError;
	}

	public void setSendError(boolean sendError) {
		this.sendError = sendError;
	}

}
