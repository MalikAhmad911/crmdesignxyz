import React from "react";
import { View, Text } from "react-native";
import { MapPin, Clock, User } from "lucide-react-native";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { colors, space, type } from "@/theme/tokens";

export type JobStatus = "scheduled" | "en-route" | "in-progress" | "complete" | "cancelled";
export type Job = { id: string; customer: string; title: string; address: string; when: string; tech: string; status: JobStatus; value: string };

const toneFor: Record<JobStatus, any> = {
  "scheduled": "info", "en-route": "warning", "in-progress": "primary", "complete": "success", "cancelled": "danger",
};

export function JobCard({ job, onPress }: { job: Job; onPress?: () => void }) {
  return (
    <Card onPress={onPress} style={{ gap: space[3] }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: space[3] }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={type.bodyStrong} numberOfLines={1}>{job.title}</Text>
          <Text style={type.small} numberOfLines={1}>{job.customer}</Text>
        </View>
        <Badge label={job.status.replace("-", " ")} tone={toneFor[job.status]} />
      </View>
      <View style={{ gap: 6 }}>
        <Row icon={<Clock size={13} color={colors.muted} />} text={job.when} />
        <Row icon={<MapPin size={13} color={colors.muted} />} text={job.address} />
        <Row icon={<User size={13} color={colors.muted} />} text={job.tech} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: space[2], borderTopWidth: 1, borderTopColor: colors.hairline }}>
        <Text style={type.small}>Job value</Text>
        <Text style={{ ...type.bodyStrong, fontFamily: "Inter_700Bold" }}>{job.value}</Text>
      </View>
    </Card>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      {icon}<Text style={type.small} numberOfLines={1}>{text}</Text>
    </View>
  );
}
