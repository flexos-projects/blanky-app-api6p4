/**
 * MockDB - CRUD interface for prototypes
 * Auto-loads mock-data.json and provides query methods
 */
const mockDb = {
  data: null,

  async init() {
    if (this.data) return this.data;
    const res = await fetch('shared/mock-data.json');
    this.data = await res.json();
    window.dispatchEvent(new CustomEvent('mockdb:ready'));
    return this.data;
  },

  getAll(collection) {
    return this.data?.[collection] || [];
  },

  getById(collection, id) {
    return this.getAll(collection).find(item => item.id === id);
  },

  query(collection, filterFn) {
    return this.getAll(collection).filter(filterFn);
  },

  create(collection, item) {
    if (!this.data[collection]) this.data[collection] = [];
    const newItem = { ...item, id: `${collection}-${Date.now()}`, createdAt: new Date().toISOString() };
    this.data[collection].push(newItem);
    return newItem;
  },

  update(collection, id, updates) {
    const item = this.getById(collection, id);
    if (item) Object.assign(item, updates, { updatedAt: new Date().toISOString() });
    return item;
  },

  delete(collection, id) {
    const arr = this.data?.[collection];
    if (arr) {
      const idx = arr.findIndex(item => item.id === id);
      if (idx > -1) arr.splice(idx, 1);
    }
  },

  getCurrentUser() {
    return this.data?.currentUser;
  }
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => mockDb.init());
