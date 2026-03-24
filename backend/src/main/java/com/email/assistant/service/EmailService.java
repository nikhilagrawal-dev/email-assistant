package com.email.assistant.service;

import com.email.assistant.model.EmailRequest;
import com.email.assistant.model.EmailResponse;

public interface EmailService {
    EmailResponse generateReply(EmailRequest request);
}
