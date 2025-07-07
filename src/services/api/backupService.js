const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let backups = [];

export const backupService = {
  async createBackup(data) {
    await delay(2000); // Simulate backup creation time
    
    const backup = {
      Id: backups.length + 1,
      id: `backup_${Date.now()}`,
      type: data.type || 'full',
      size: Math.floor(Math.random() * 100) + 50, // Mock size in MB
      createdAt: Date.now(),
      status: 'completed',
      chatCount: data.chatCount || 0,
      messageCount: data.messageCount || 0,
      encrypted: true
    };
    
    backups.push(backup);
    return backup;
  },

  async getAll() {
    await delay(300);
    return [...backups].sort((a, b) => b.createdAt - a.createdAt);
  },

  async restore(backupId) {
    await delay(3000); // Simulate restore time
    
    const backup = backups.find(b => b.Id === parseInt(backupId) || b.id === backupId);
    if (!backup) {
      throw new Error('Backup not found');
    }
    
    return {
      success: true,
      restoredChats: backup.chatCount,
      restoredMessages: backup.messageCount
    };
  },

  async delete(id) {
    await delay(200);
    const index = backups.findIndex(b => b.Id === parseInt(id) || b.id === id);
    if (index === -1) {
      throw new Error('Backup not found');
    }
    backups.splice(index, 1);
    return true;
  },

  async scheduleAutoBackup(settings) {
    await delay(300);
    return {
      enabled: settings.enabled,
      frequency: settings.frequency,
      nextBackup: Date.now() + (24 * 60 * 60 * 1000) // Next day
    };
  }
};