package com.email.assistant.controller;

import com.email.assistant.model.ReplyHistory;
import com.email.assistant.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin("*")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    public List<ReplyHistory> getHistory() {
        return historyService.getAllHistory();
    }

    @PostMapping
    public void saveHistory(@RequestBody ReplyHistory history) {
        historyService.saveHistory(history);
    }
}