import { toast } from 'react-toastify';

export const contactService = {
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
          { field: { Name: "avatar" } },
          { field: { Name: "status" } },
          { field: { Name: "last_seen" } },
          { field: { Name: "phone" } },
          { field: { Name: "email" } },
          { field: { Name: "public_key" } }
        ]
      };

      const response = await apperClient.fetchRecords('app_contact', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts");
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
          { field: { Name: "avatar" } },
          { field: { Name: "status" } },
          { field: { Name: "last_seen" } },
          { field: { Name: "phone" } },
          { field: { Name: "email" } },
          { field: { Name: "public_key" } }
        ]
      };

      const response = await apperClient.getRecordById('app_contact', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching contact with ID ${id}:`, error);
      toast.error("Failed to fetch contact");
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
          Name: data.Name || data.name,
          Tags: data.Tags || '',
          Owner: data.Owner || null,
          avatar: data.avatar || null,
          status: data.status || 'offline',
          last_seen: data.last_seen ? new Date(data.last_seen).toISOString() : new Date().toISOString(),
          phone: data.phone || null,
          email: data.email || null,
          public_key: data.public_key || data.publicKey || null
        }]
      };

      const response = await apperClient.createRecord('app_contact', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} contacts:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success('Contact created successfully');
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating contact:", error);
      toast.error("Failed to create contact");
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
          Name: data.Name || data.name,
          Tags: data.Tags || '',
          Owner: data.Owner || null,
          avatar: data.avatar || null,
          status: data.status || 'offline',
          last_seen: data.last_seen ? new Date(data.last_seen).toISOString() : new Date().toISOString(),
          phone: data.phone || null,
          email: data.email || null,
          public_key: data.public_key || data.publicKey || null
        }]
      };

      const response = await apperClient.updateRecord('app_contact', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} contacts:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success('Contact updated successfully');
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact");
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

      const response = await apperClient.deleteRecord('app_contact', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} contacts:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success('Contact deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
      return false;
    }
  }
};