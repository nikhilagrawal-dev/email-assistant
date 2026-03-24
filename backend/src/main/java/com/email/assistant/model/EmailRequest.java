package com.email.assistant.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequest {

    @NotBlank(message = "Email content is required")
    private String emailContent;

    @NotNull(message = "Tone is required")
    private Tone tone;

    @NotNull(message = "Length is required")
    private Length length;

    public enum Tone {
        FORMAL,
        CASUAL
    }
    public enum Length {
        SHORT,
        LONG
    }
}
