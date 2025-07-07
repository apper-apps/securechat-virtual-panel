import mockMessages from '@/services/mockData/messages.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let messages = [...mockMessages];

export const messageService = {
  async getAll() {
    await delay(300);
    return messages;
  },

  async getByChatId(chatId) {
    await delay(400);
    return messages.filter(message => message.chatId === chatId);
  },

  async getById(id) {
    await delay(200);
    const message = messages.find(msg => msg.Id === parseInt(id));
    if (!message) {
      throw new Error('Message not found');
    }
    return message;
  },

async create(data) {
    await delay(300);
    const newMessage = {
      Id: Math.max(...messages.map(m => m.Id)) + 1,
      id: `msg-${Date.now()}`,
      chatId: data.chatId,
      senderId: data.senderId,
      content: data.content,
      timestamp: Date.now(),
      status: 'delivered',
      selfDestruct: data.selfDestruct || null,
      type: data.type || 'text',
      file: data.file || null,
      reactions: [],
      edited: false
    };
    messages.push(newMessage);
    return newMessage;
  },

  async update(id, data) {
    await delay(200);
    const index = messages.findIndex(msg => msg.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    messages[index] = { ...messages[index], ...data };
    return messages[index];
  },

  async delete(id) {
    await delay(200);
    const index = messages.findIndex(msg => msg.id === id || msg.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    messages.splice(index, 1);
    return true;
  }
};