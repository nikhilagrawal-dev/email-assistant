package com.email.assistant.service;

import com.email.assistant.model.ReplyHistory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryService {

    private final List<ReplyHistory> historyList = new ArrayList<>();

    public void saveHistory(ReplyHistory history) {
        historyList.add(history);
    }

    public List<ReplyHistory> getAllHistory() {
        return historyList;
    }
}