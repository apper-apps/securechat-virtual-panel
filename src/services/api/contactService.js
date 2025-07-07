import mockContacts from '@/services/mockData/contacts.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let contacts = [...mockContacts];

export const contactService = {
  async getAll() {
    await delay(300);
    return contacts;
  },

  async getById(id) {
    await delay(200);
    const contact = contacts.find(contact => contact.Id === parseInt(id));
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  },

async create(data) {
    await delay(250);
    const newContact = {
      Id: Math.max(...contacts.map(c => c.Id)) + 1,
      id: `user-${Math.max(...contacts.map(c => c.Id)) + 1}`,
      name: data.name,
      avatar: data.avatar || null,
      status: data.status || 'offline',
      lastSeen: Date.now(),
      phone: data.phone || null,
      email: data.email || null,
      publicKey: data.publicKey || null
    };
    contacts.push(newContact);
    return newContact;
  },

  async update(id, data) {
    await delay(200);
    const index = contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Contact not found');
    }
    contacts[index] = { ...contacts[index], ...data };
    return contacts[index];
  },

  async delete(id) {
    await delay(200);
    const index = contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Contact not found');
    }
    contacts.splice(index, 1);
    return true;
  }
};