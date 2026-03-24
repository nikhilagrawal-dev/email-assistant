
package com.email.assistant.controller;

import com.email.assistant.model.UserSettings;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin("*")
public class SettingsController {

    // 🔥 In-memory storage
    private UserSettings settings = UserSettings.builder()
            .defaultTone("formal")
            .defaultLength("short")
            .build();

    // ✅ GET settings
    @GetMapping
    public UserSettings getSettings() {
        return settings;
    }

    // ✅ SAVE settings
    @PostMapping
    public UserSettings saveSettings(@RequestBody UserSettings newSettings) {
        this.settings = newSettings;
        return settings;
    }
}