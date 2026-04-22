"use client";

import { Bell } from "lucide-react";
import { useLearner } from "@/components/learning/learner-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NotificationsPage() {
  const { markAllNotificationsRead, markNotificationRead, notifications } = useLearner();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Course enrollments, assessment passes, and completion milestones appear here.
          </p>
        </div>
        {notifications.length > 0 && (
          <Button variant="outline" onClick={markAllNotificationsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-2xl border p-4 ${
                notification.read
                  ? "border-border bg-card"
                  : "border-primary/20 bg-primary/5"
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{notification.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <Button variant="outline" onClick={() => markNotificationRead(notification.id)}>
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-lg font-semibold text-foreground">No notifications yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Start learning to generate notifications for enrollments, assessments, and certificates.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
