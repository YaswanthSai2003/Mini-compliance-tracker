import ClientSidebar from "@/components/dashboard/ClientSidebar";
import HeaderCard from "@/components/dashboard/HeaderCard";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import AddTaskCard from "@/components/dashboard/AddTaskCard";
import FiltersBar from "@/components/dashboard/FiltersBar";
import TaskTable from "@/components/dashboard/TaskTable";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function App() {
  const {
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
  } = useDashboardData();

  if (loading) {
    return <div className="p-8 text-slate-700">Loading...</div>;
  }

  return (
    <main className="h-screen overflow-hidden bg-[#f7f8fa]">
      <div className="mx-auto h-full max-w-[1600px] px-4 py-6 lg:px-6">
        <div className="grid h-full gap-6 xl:grid-cols-[320px_minmax(0,1fr)_340px]">
          <ClientSidebar
            clients={clients}
            selectedClientId={selectedClientId}
            onSelect={setSelectedClientId}
          />

          <div className="min-h-0 overflow-y-auto pr-1">
            <div className="space-y-5">
              <HeaderCard client={selectedClient} onOpenAddTask={handleOpenAddTask} />

              <AnalyticsSection
                total={analytics.stats.total}
                pending={analytics.stats.pending}
                inProgress={analytics.stats.inProgress}
                completed={analytics.stats.completed}
                overdue={analytics.stats.overdue}
                categoryData={analytics.categoryDistribution}
              />

              <div ref={addTaskRef}>
                <AddTaskCard
                  isOpen={isAddTaskOpen}
                  onToggle={() => setIsAddTaskOpen((prev) => !prev)}
                  formData={formData}
                  onChange={updateFormField}
                  onSubmit={handleAddTask}
                />
              </div>

              <FiltersBar
                search={search}
                statusFilter={statusFilter}
                categoryFilter={categoryFilter}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onStatusChange={setStatusFilter}
                onCategoryChange={setCategoryFilter}
                onSortChange={setSortBy}
              />

              <TaskTable
                tasks={tasks}
                loading={taskLoading}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>

          <div className="min-h-0">
            <UpcomingDeadlines tasks={analytics.upcomingDeadlines} />
          </div>
        </div>
      </div>
    </main>
  );
}