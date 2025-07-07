const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let files = [];

export const fileService = {
  async upload(file, chatId) {
    await delay(1000); // Simulate upload time
    
    const fileRecord = {
      Id: files.length + 1,
      id: `file_${Date.now()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      chatId,
      uploadedAt: Date.now(),
      url: URL.createObjectURL(file), // Mock URL
      thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    };
    
    files.push(fileRecord);
    return fileRecord;
  },

  async getById(id) {
    await delay(200);
    const file = files.find(f => f.Id === parseInt(id) || f.id === id);
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  },

  async getByChatId(chatId) {
    await delay(300);
    return files.filter(f => f.chatId === chatId);
  },

  async delete(id) {
    await delay(200);
    const index = files.findIndex(f => f.Id === parseInt(id) || f.id === id);
    if (index === -1) {
      throw new Error('File not found');
    }
    files.splice(index, 1);
    return true;
  },

  async generateThumbnail(file) {
    await delay(500);
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  }
};