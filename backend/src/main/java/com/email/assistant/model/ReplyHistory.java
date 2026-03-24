package com.email.assistant.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyHistory {

    private Long id;
    private String emailContent;
    private String generatedReply;
    private String tone;
    private String length;
    private String timestamp;
}