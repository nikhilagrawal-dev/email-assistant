package com.email.assistant.controller;

import com.email.assistant.model.EmailRequest;
import com.email.assistant.model.EmailResponse;
import com.email.assistant.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private  EmailService emailService;

    @PostMapping("/generate-reply")
    public EmailResponse generateReply(@Valid  @RequestBody EmailRequest request){
        return emailService.generateReply(request);
    }
}
