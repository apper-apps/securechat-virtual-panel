import mockChats from '@/services/mockData/chats.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let chats = [...mockChats];

export const chatService = {
  async getAll() {
    await delay(300);
    return chats.map(chat => ({
      ...chat,
      participants: chat.participants || []
    }));
  },

  async getById(id) {
    await delay(200);
    const chat = chats.find(chat => chat.Id === parseInt(id));
    if (!chat) {
      throw new Error('Chat not found');
    }
    return {
      ...chat,
      participants: chat.participants || []
    };
  },

async create(data) {
    await delay(250);
    const newChat = {
      Id: Math.max(...chats.map(c => c.Id)) + 1,
      id: (Math.max(...chats.map(c => c.Id)) + 1).toString(),
      participants: data.participants || [],
      lastMessage: null,
      unreadCount: 0,
      type: data.type || 'private',
      theme: data.theme || 'default',
      createdAt: Date.now(),
      maxMembers: data.type === 'group' ? 100000 : 2,
      memberCount: data.participants?.length || 0
    };
    chats.push(newChat);
    return newChat;
  },

  async update(id, data) {
    await delay(200);
    const index = chats.findIndex(chat => chat.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Chat not found');
    }
    chats[index] = { ...chats[index], ...data };
    return chats[index];
  },

  async delete(id) {
    await delay(200);
    const index = chats.findIndex(chat => chat.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Chat not found');
    }
    chats.splice(index, 1);
    return true;
  }
};