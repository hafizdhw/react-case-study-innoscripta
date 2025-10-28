import React from "react";
import { useAuth } from "../../../login/context/AuthContext";
import { usePollingSettings } from "../../context/PollingSettingsContext";
import { Select } from "../../../../components/ui/select/Select";
import { Text } from "../../../../components/ui/text/Text";
import "./SettingsPageView.css";

export const SettingsPageView = () => {
  const { user } = useAuth();
  const { pollingInterval, setPollingInterval } = usePollingSettings();

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="settings-page">
        <Text variant="h2" size="lg">
          Access Denied
        </Text>
        <Text variant="paragraph" size="md" className="mt-2">
          Only administrators can access settings.
        </Text>
      </div>
    );
  }

  const pollingOptions = [
    { value: "5", label: "5 seconds" },
    { value: "10", label: "10 seconds" },
    { value: "30", label: "30 seconds" },
    { value: "60", label: "60 seconds" },
    { value: "0", label: "Off (No polling)" },
  ];

  const handlePollingIntervalChange = (value: string) => {
    const interval = parseInt(value, 10);
    setPollingInterval(interval);
  };

  return (
    <div className="settings-page">
      <Text variant="h2" size="lg" weight="bold">
        Settings
      </Text>

      <div className="settings-page__section">
        <Text variant="h3" size="md" className="mb-2">
          Data Sync Settings
        </Text>
        <Text variant="paragraph" size="sm" className="mb-4 text-gray-600">
          Configure how often the application syncs data from the server.
        </Text>

        <div className="settings-page__controls">
          <Text variant="label" size="sm">
            Polling Interval:
          </Text>
          <Select
            options={pollingOptions}
            value={pollingInterval.toString()}
            onChange={handlePollingIntervalChange}
            placeholder="Select interval"
          />
        </div>

        {pollingInterval === 0 && (
          <Text variant="paragraph" size="sm" className="mt-2 text-red-500">
            ⚠️ Data will not sync automatically. You may need to refresh the
            page to see updates.
          </Text>
        )}
      </div>
    </div>
  );
};
