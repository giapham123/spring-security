package com.example.demoSecurity.apiTest.services;

import com.example.demoSecurity.SendMail.EmailService;
import com.example.demoSecurity.apiTest.mappers.TestApiMapper;
import com.example.demoSecurity.apiTest.model.TestApiModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TestApiService implements ITestApiService{

    @Autowired
    TestApiMapper testApiMapper;

    @Autowired
    EmailService emailService;

    @Override
    public String getdata(String email) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8091/login2/confirm-account?token="+UUID.randomUUID());
        emailService.sendEmail(mailMessage);
        return "Verify email by the link sent on your email address";
    }
}
