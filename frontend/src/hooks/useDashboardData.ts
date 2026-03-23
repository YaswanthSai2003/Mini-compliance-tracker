import { useEffect, useMemo, useRef, useState } from "react";
import { buildApiUrl } from "@/lib/api";
import type { AnalyticsResponse, Client, Task, TaskFormData } from "../types/index";

export function useDashboardData() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse>({
    stats: {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
    },
    categoryDistribution: [],
    upcomingDeadlines: [],
  });

  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("DUE_DATE");

  const addTaskRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    category: "GST Filing",
    dueDate: "",
    priority: "MEDIUM",
  });

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId),
    [clients, selectedClientId]
  );

  async function fetchClients() {
    try {
      const res = await fetch(buildApiUrl("/clients"));
      const data = await res.json();
      setClients(data);

      if (data.length > 0) {
        setSelectedClientId((prev) => prev || data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTasks(clientId: string) {
    if (!clientId) return;

    try {
      setTaskLoading(true);
      const res = await fetch(
        buildApiUrl(`/clients/${clientId}/tasks`, {
          status: statusFilter,
          category: categoryFilter,
          search,
          sort: sortBy,
        })
      );
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setTaskLoading(false);
    }
  }

  async function fetchAnalytics(clientId: string) {
    if (!clientId) return;

    try {
      const res = await fetch(buildApiUrl(`/clients/${clientId}/analytics`));
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    }
  }

  async function refreshClientData(clientId: string) {
    await Promise.all([fetchTasks(clientId), fetchAnalytics(clientId)]);
  }

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClientId) {
      refreshClientData(selectedClientId);
    }
  }, [selectedClientId, statusFilter, categoryFilter, search, sortBy]);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedClientId) return;

    try {
      const res = await fetch(buildApiUrl("/tasks"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: selectedClientId,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          dueDate: formData.dueDate,
          priority: formData.priority,
        }),
      });

      if (!res.ok) {
        alert("Failed to create task");
        return;
      }

      setFormData({
        title: "",
        description: "",
        category: "GST Filing",
        dueDate: "",
        priority: "MEDIUM",
      });

      setIsAddTaskOpen(false);
      await refreshClientData(selectedClientId);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating task");
    }
  }

  async function handleStatusChange(taskId: string, status: Task["status"]) {
    try {
      const res = await fetch(buildApiUrl(`/tasks/${taskId}/status`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        alert("Failed to update status");
        return;
      }

      await refreshClientData(selectedClientId);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating status");
    }
  }

  function updateFormField(field: keyof TaskFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleOpenAddTask() {
    setIsAddTaskOpen(true);

    setTimeout(() => {
      addTaskRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  return {
    clients,
    selectedClientId,
    setSelectedClientId,
    tasks,
    analytics,
    loading,
    taskLoading,
    isAddTaskOpen,
    setIsAddTaskOpen,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    addTaskRef,
    formData,
    selectedClient,
    handleAddTask,
    handleStatusChange,
    updateFormField,
    handleOpenAddTask,
  };
}