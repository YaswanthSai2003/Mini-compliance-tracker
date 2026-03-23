export type Client = {
  id: string;
  companyName: string;
  country: string;
  entityType: string;
};

export type Task = {
  id: string;
  clientId: string;
  title: string;
  description?: string | null;
  category: string;
  dueDate: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
};

export type AnalyticsResponse = {
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
  };
  categoryDistribution: { category: string; count: number }[];
  upcomingDeadlines: Task[];
};