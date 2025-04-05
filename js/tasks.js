updateCounters() {
    const currentCount = this.tasks.filter(t => t.status === 'current').length;
    const pendingCount = this.tasks.filter(t => t.status === 'pending').length;

    document.getElementById('counter-current').textContent = currentCount;
    document.getElementById('counter-pending').textContent = pendingCount;
}
