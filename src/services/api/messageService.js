import { toast } from 'react-toastify';

export const messageService = {
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
          { field: { Name: "chat_id" } },
          { field: { Name: "sender_id" } },
          { field: { Name: "content" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "status" } },
          { field: { Name: "self_destruct" } },
          { field: { Name: "type" } },
          { field: { Name: "file" } },
          { field: { Name: "reactions" } },
          { field: { Name: "edited" } }
        ]
      };

      const response = await apperClient.fetchRecords('message', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
      return [];
    }
  },

  async getByChatId(chatId) {
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
          { field: { Name: "chat_id" } },
          { field: { Name: "sender_id" } },
          { field: { Name: "content" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "status" } },
          { field: { Name: "self_destruct" } },
          { field: { Name: "type" } },
          { field: { Name: "file" } },
          { field: { Name: "reactions" } },
          { field: { Name: "edited" } }
        ],
        where: [
          {
            FieldName: "chat_id",
            Operator: "EqualTo",
            Values: [chatId],
            Include: true
          }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('message', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching messages for chat:", error);
      toast.error("Failed to fetch messages");
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
          { field: { Name: "chat_id" } },
          { field: { Name: "sender_id" } },
          { field: { Name: "content" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "status" } },
          { field: { Name: "self_destruct" } },
          { field: { Name: "type" } },
          { field: { Name: "file" } },
          { field: { Name: "reactions" } },
          { field: { Name: "edited" } }
        ]
      };

      const response = await apperClient.getRecordById('message', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching message with ID ${id}:`, error);
      toast.error("Failed to fetch message");
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
          Name: data.Name || `Message ${Date.now()}`,
          Tags: data.Tags || '',
          Owner: data.Owner || null,
          chat_id: data.chatId || data.chat_id,
          sender_id: data.senderId || data.sender_id,
          content: data.content || '',
          timestamp: data.timestamp ? new Date(data.timestamp).toISOString() : new Date().toISOString(),
          status: data.status || 'delivered',
          self_destruct: data.selfDestruct || data.self_destruct || null,
          type: data.type || 'text',
          file: data.file ? JSON.stringify(data.file) : null,
          reactions: data.reactions ? JSON.stringify(data.reactions) : null,
          edited: data.edited || false
        }]
      };

      const response = await apperClient.createRecord('message', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} messages:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success('Message sent successfully');
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating message:", error);
      toast.error("Failed to send message");
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
          chat_id: data.chatId || data.chat_id,
          sender_id: data.senderId || data.sender_id,
          content: data.content,
          timestamp: data.timestamp ? new Date(data.timestamp).toISOString() : undefined,
          status: data.status,
          self_destruct: data.selfDestruct || data.self_destruct,
          type: data.type,
          file: data.file ? JSON.stringify(data.file) : undefined,
          reactions: data.reactions ? JSON.stringify(data.reactions) : undefined,
          edited: data.edited
        }]
      };

      const response = await apperClient.updateRecord('message', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} messages:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success('Message updated successfully');
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
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

      const response = await apperClient.deleteRecord('message', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} messages:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success('Message deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
      return false;
    }
  }
};