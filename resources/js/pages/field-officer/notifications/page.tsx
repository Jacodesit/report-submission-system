/* eslint-disable @typescript-eslint/no-unused-vars */
//field-officer/notifications/page.tsx
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  Bell,
  CheckCheck,
  Filter,
  MoreHorizontal,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  MessageSquare,
  UserPlus,
  FileCheck,
  FileWarning,
  Info,
  Star,
  Settings,
  Trash2,
  Archive,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/field-officer/dashboard',
  },
  {
    title: 'Notifications',
    href: '/field-officer/notifications',
  },
];

type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'reminder';
type NotificationCategory = 'report' | 'program' | 'submission' | 'message' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionable: boolean;
  actionLink?: string;
  actionText?: string;
  sender?: {
    name: string;
    avatar?: string;
    role: string;
  };
  metadata?: {
    reportId?: number;
    programId?: number;
    submissionId?: number;
    deadline?: string;
  };
}

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'all'>('all');

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'reminder',
      category: 'report',
      title: 'Report Deadline Approaching',
      message: 'Your Monthly Progress Report for Barangay Development Program is due in 2 days.',
      timestamp: '2024-02-18T09:30:00',
      read: false,
      actionable: true,
      actionLink: '/field-officer/programs/reports/1',
      actionText: 'Submit Now',
      sender: {
        name: 'System',
        role: 'Automated Reminder',
      },
      metadata: {
        reportId: 1,
        programId: 1,
        deadline: '2024-02-20',
      },
    },
    {
      id: 2,
      type: 'success',
      category: 'submission',
      title: 'Report Approved',
      message: 'Your Q1 Financial Report has been approved by Program Coordinator Maria Santos.',
      timestamp: '2024-02-17T14:15:00',
      read: false,
      actionable: true,
      actionLink: '/field-officer/my-report-submissions/2',
      actionText: 'View Report',
      sender: {
        name: 'Maria Santos',
        role: 'Program Coordinator',
      },
      metadata: {
        submissionId: 2,
        programId: 2,
      },
    },
    {
      id: 3,
      type: 'warning',
      category: 'submission',
      title: 'Report Needs Revision',
      message: 'Your Training Needs Assessment requires revisions. Please check the feedback and resubmit.',
      timestamp: '2024-02-17T11:20:00',
      read: true,
      actionable: true,
      actionLink: '/field-officer/my-report-submissions/3',
      actionText: 'Revise Report',
      sender: {
        name: 'Juan Dela Cruz',
        role: 'Program Coordinator',
      },
      metadata: {
        submissionId: 3,
        programId: 3,
      },
    },
    {
      id: 4,
      type: 'info',
      category: 'program',
      title: 'New Program Assigned',
      message: 'You have been assigned to the "Livelihood Development Program". Please review the program details.',
      timestamp: '2024-02-16T10:00:00',
      read: false,
      actionable: true,
      actionLink: '/field-officer/programs/4',
      actionText: 'View Program',
      sender: {
        name: 'Ana Lopez',
        role: 'Program Director',
      },
      metadata: {
        programId: 4,
      },
    },
    {
      id: 5,
      type: 'info',
      category: 'message',
      title: 'New Message from Coordinator',
      message: 'Please provide additional documentation for the Emergency Response Report.',
      timestamp: '2024-02-16T09:45:00',
      read: false,
      actionable: true,
      actionLink: '/field-officer/messages/5',
      actionText: 'Reply',
      sender: {
        name: 'Pedro Reyes',
        role: 'Program Coordinator',
      },
    },
    {
      id: 6,
      type: 'reminder',
      category: 'report',
      title: 'Template Available',
      message: 'A new template has been uploaded for the Quarterly Accomplishment Report.',
      timestamp: '2024-02-15T16:30:00',
      read: true,
      actionable: true,
      actionLink: '/field-officer/programs/reports/6/templates',
      actionText: 'Download Template',
      sender: {
        name: 'System',
        role: 'Automated Notification',
      },
    },
    {
      id: 7,
      type: 'error',
      category: 'submission',
      title: 'Submission Failed',
      message: 'Your report submission could not be processed due to an error. Please try again.',
      timestamp: '2024-02-15T14:20:00',
      read: true,
      actionable: true,
      actionLink: '/field-officer/my-report-submissions/draft',
      actionText: 'Retry',
      sender: {
        name: 'System',
        role: 'Error Notification',
      },
    },
    {
      id: 8,
      type: 'success',
      category: 'program',
      title: 'Program Milestone Achieved',
      message: 'Congratulations! The Barangay Development Program has reached 75% completion.',
      timestamp: '2024-02-14T11:00:00',
      read: true,
      actionable: false,
      sender: {
        name: 'System',
        role: 'Achievement Notification',
      },
    },
  ];

  const getNotificationIcon = (type: NotificationType, category: NotificationCategory) => {
    // Priority by type
    const iconMap = {
      info: Info,
      success: CheckCircle2,
      warning: AlertCircle,
      error: XCircle,
      reminder: Clock,
    };

    const IconComponent = iconMap[type] || Bell;
    return <IconComponent className="w-5 h-5" />;
  };

  const getNotificationColor = (type: NotificationType) => {
    const colorMap = {
      info: 'text-blue-500 bg-blue-500/10',
      success: 'text-emerald-500 bg-emerald-500/10',
      warning: 'text-amber-500 bg-amber-500/10',
      error: 'text-rose-500 bg-rose-500/10',
      reminder: 'text-purple-500 bg-purple-500/10',
    };
    return colorMap[type] || 'text-gray-500 bg-gray-500/10';
  };

  const getCategoryBadge = (category: NotificationCategory) => {
    const categoryMap = {
      report: { label: 'Report', class: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
      program: { label: 'Program', class: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
      submission: { label: 'Submission', class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
      message: { label: 'Message', class: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
      system: { label: 'System', class: 'bg-gray-500/10 text-gray-600 dark:text-gray-400' },
    };
    return categoryMap[category] || categoryMap.system;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    if (selectedCategory !== 'all' && notification.category !== selectedCategory) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Notifications" />

      <div className="flex-1 space-y-6 p-6 md:p-8 bg-background">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Bell className="w-8 h-8" />
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with your reports, submissions, and program activities
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}
            <button className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
              <Settings className="w-4 h-4" />
              Preferences
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mt-2">{notifications.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Unread</span>
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <p className="text-2xl font-bold mt-2">{unreadCount}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reports</span>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mt-2">{notifications.filter(n => n.category === 'report').length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Submissions</span>
              <FileCheck className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold mt-2">{notifications.filter(n => n.category === 'submission').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-2 ${
                filter === 'unread'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary-foreground/20">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'read'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              Read
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as NotificationCategory | 'all')}
              className="rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              <option value="report">Reports</option>
              <option value="program">Programs</option>
              <option value="submission">Submissions</option>
              <option value="message">Messages</option>
              <option value="system">System</option>
            </select>
            <button className="p-2 rounded-lg border border-input hover:bg-accent transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border border-input hover:bg-accent transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {filter === 'unread'
                  ? "You don't have any unread notifications."
                  : filter === 'read'
                  ? "You haven't read any notifications yet."
                  : "You don't have any notifications at the moment."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type, notification.category);
              const colorClass = getNotificationColor(notification.type);
              const categoryBadge = getCategoryBadge(notification.category);

              return (
                <div
                  key={notification.id}
                  className={`group relative rounded-xl border bg-card p-6 transition-all hover:shadow-lg ${
                    !notification.read ? 'border-l-4 border-l-primary' : ''
                  }`}
                >
                  {/* Hover Actions */}
                  <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Mark as read">
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Archive">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-accent transition-colors text-rose-500" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`rounded-full p-3 ${colorClass}`}>
                      {IconComponent}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryBadge.class}`}>
                          {categoryBadge.label}
                        </span>

                        {notification.sender && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <UserPlus className="w-3 h-3" />
                            {notification.sender.name} • {notification.sender.role}
                          </span>
                        )}

                        {notification.metadata?.deadline && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Due: {new Date(notification.metadata.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      {notification.actionable && notification.actionLink && (
                        <div className="mt-4">
                          <Link
                            href={notification.actionLink}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            {notification.actionText || 'View Details'}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="flex justify-center pt-4">
            <button className="px-6 py-2 text-sm font-medium rounded-lg border border-input hover:bg-accent transition-colors">
              Load More
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
          <p>Notifications are stored for 30 days. Older notifications are automatically archived.</p>
        </div>
      </div>
    </AppLayout>
  );
}
