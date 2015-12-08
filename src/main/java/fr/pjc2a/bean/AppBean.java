package fr.pjc2a.bean;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean
@ApplicationScoped
public class AppBean {
	
	private String mailAdress = "pascale@pj-c2a.fr";
	private String phoneNumber = "07 52 62 03 17";

	public String getMailAdress() {
		return mailAdress;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}
	

}
