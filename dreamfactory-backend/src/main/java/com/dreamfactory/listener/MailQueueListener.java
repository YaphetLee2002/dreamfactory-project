package com.dreamfactory.listener;

import jakarta.annotation.Resource;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RabbitListener(queues = "mail")
public class MailQueueListener {

    @Resource
    JavaMailSender sender;

    @Value("${spring.mail.username}")
    String username;

    @RabbitHandler
    public void sendMailMessage(Map<String, Object> data) {
        String email = (String) data.get("email");
        Integer code = (Integer) data.get("code");
        String type = (String) data.get("type");
        SimpleMailMessage message = switch (type) {
            case "register" -> createMessage(
                        "Welcome to DreamFactory!",
                            "Thank you for creating a DreamFactory account. \n" +
                                    "Your email address verification code is: " +
                                    code +
                                    ", and it's valid for 3 minutes.\n" +
                                    "You are receiving this email because you recently created an account or changed your email address. " +
                                    "If you did not do this, please contact us."
                        , email);
            case "reset" -> createMessage(
                    "Reset Password at DreamFactory",
                    "You are undergoing a password reset operation, and your verification code is: " +
                            code +
                            ", and it's valid for 3 minutes.\n" +
                            "You are receiving this email because you recently reset your password. " +
                            "If you did not do this, please contact us."
                    , email);
            default -> null;
        };
        if (message == null) return ;
        sender.send(message);
    }

    private SimpleMailMessage createMessage(String title, String content, String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject(title);
        message.setText(content);
        message.setTo(email);
        message.setFrom(username);
        return message;
    }
}
