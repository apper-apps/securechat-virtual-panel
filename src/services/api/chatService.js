import { toast } from 'react-toastify';

export const chatService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "participants" } },
          { field: { Name: "last_message" } },
          { field: { Name: "unread_count" } },
          { field: { Name: "type" } },
          { field: { Name: "theme" } },
          { field: { Name: "created_at" } },
          { field: { Name: "max_members" } },
          { field: { Name: "member_count" } }
        ]
      };

      const response = await apperClient.fetchRecords('chat', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(chat => ({
        ...chat,
        participants: chat.participants ? JSON.parse(chat.participants) : []
      }));
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Failed to fetch chats");
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "participants" } },
          { field: { Name: "last_message" } },
          { field: { Name: "unread_count" } },
          { field: { Name: "type" } },
          { field: { Name: "theme" } },
          { field: { Name: "created_at" } },
          { field: { Name: "max_members" } },
          { field: { Name: "member_count" } }
        ]
      };

      const response = await apperClient.getRecordById('chat', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const chat = response.data;
      return {
        ...chat,
        participants: chat.participants ? JSON.parse(chat.participants) : []
      };
    } catch (error) {
      console.error(`Error fetching chat with ID ${id}:`, error);
      toast.error("Failed to fetch chat");
      return null;
    }
  },

  async create(data) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: data.Name || `Chat ${Date.now()}`,
          Tags: data.Tags || '',
          Owner: data.Owner || null,
          participants: JSON.stringify(data.participants || []),
          last_message: data.last_message || null,
          unread_count: data.unread_count || 0,
          type: data.type || 'private',
          theme: data.theme || 'default',
          created_at: data.created_at ? new Date(data.created_at).toISOString() : new Date().toISOString(),
          max_members: data.type === 'group' ? 100000 : 2,
          member_count: data.participants?.length || 0
        }]
      };

      const response = await apperClient.createRecord('chat', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} chats:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success('Chat created successfully');
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Failed to create chat");
      return null;
    }
  },

  async update(id, data) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: data.Name,
          Tags: data.Tags,
          Owner: data.Owner,
          participants: data.participants ? JSON.stringify(data.participants) : undefined,
          last_message: data.last_message,
          unread_count: data.unread_count,
          type: data.type,
          theme: data.theme,
          created_at: data.created_at ? new Date(data.created_at).toISOString() : undefined,
          max_members: data.max_members,
          member_count: data.member_count
        }]
      };

      const response = await apperClient.updateRecord('chat', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} chats:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success('Chat updated successfully');
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating chat:", error);
      toast.error("Failed to update chat");
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('chat', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} chats:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success('Chat deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat");
      return false;
    }
  }
};