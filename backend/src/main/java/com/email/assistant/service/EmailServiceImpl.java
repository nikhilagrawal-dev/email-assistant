package com.email.assistant.service;

import com.email.assistant.model.EmailRequest;
import com.email.assistant.model.EmailResponse;
import com.email.assistant.model.ReplyHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final WebClient webClient;
    private final HistoryService historyService;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Override
    public EmailResponse generateReply(EmailRequest request) {

        String tone = request.getTone() != null ? request.getTone().toString().toLowerCase() : "formal";
        String length = request.getLength() != null ? request.getLength().toString().toLowerCase() : "short";

        // 🔥 PROMPT
        String prompt = "You are an AI email assistant.\n\n"
                + "Write a " + tone + " and " + length + " reply.\n\n"
                + "Email:\n"
                + request.getEmailContent();

        // ✅ GEMINI REQUEST BODY
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        Map response;

        try {
            response = webClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

        } catch (Exception e) {
            e.printStackTrace();

            String fallback = "⚠️ AI unavailable. Please try again later.";

            // SAVE FAILURE HISTORY
            ReplyHistory history = ReplyHistory.builder()
                    .id(System.currentTimeMillis())
                    .emailContent(request.getEmailContent())
                    .generatedReply(fallback)
                    .tone(tone)
                    .length(length)
                    .timestamp(LocalDateTime.now().toString())
                    .build();

            historyService.saveHistory(history);

            return EmailResponse.builder()
                    .generatedReply(fallback)
                    .build();
        }

        // ✅ PARSE RESPONSE
        if (response == null) {
            return EmailResponse.builder()
                    .generatedReply("No response from AI")
                    .build();
        }

        List candidates = (List) response.get("candidates");

        if (candidates == null || candidates.isEmpty()) {
            return EmailResponse.builder()
                    .generatedReply("No response from AI")
                    .build();
        }

        Map firstCandidate = (Map) candidates.get(0);
        Map content = (Map) firstCandidate.get("content");
        List parts = (List) content.get("parts");

        if (parts == null || parts.isEmpty()) {
            return EmailResponse.builder()
                    .generatedReply("No response from AI")
                    .build();
        }

        Map textPart = (Map) parts.get(0);
        String generatedText = (String) textPart.get("text");

        // 🔥 SAVE SUCCESS HISTORY
        ReplyHistory history = ReplyHistory.builder()
                .id(System.currentTimeMillis())
                .emailContent(request.getEmailContent())
                .generatedReply(generatedText)
                .tone(tone)
                .length(length)
                .timestamp(LocalDateTime.now().toString())
                .build();

        historyService.saveHistory(history);

        return EmailResponse.builder()
                .generatedReply(generatedText)
                .build();
    }
}