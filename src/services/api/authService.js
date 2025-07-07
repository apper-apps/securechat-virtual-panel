const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let users = [
  {
    Id: 1,
    username: 'demo',
    password: 'demo123',
    name: 'Demo User',
    email: 'demo@securechat.com',
    twoFactorEnabled: false,
    devices: []
  }
];

let sessions = [];

export const authService = {
  async login(credentials) {
    await delay(500);
    
    const user = users.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = `token_${Date.now()}_${Math.random()}`;
    const session = {
      Id: sessions.length + 1,
      userId: user.Id,
      token,
      createdAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    sessions.push(session);

    return {
      token,
      user: {
        Id: user.Id,
        username: user.username,
        name: user.name,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled
      }
    };
  },

  async logout() {
    await delay(200);
    return { success: true };
  },

  async validateToken(token) {
    await delay(300);
    
    const session = sessions.find(s => s.token === token);
    if (!session || session.expiresAt < Date.now()) {
      throw new Error('Invalid or expired token');
    }

    const user = users.find(u => u.Id === session.userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      Id: user.Id,
      username: user.username,
      name: user.name,
      email: user.email,
      twoFactorEnabled: user.twoFactorEnabled
    };
  },

  async setupTwoFactor() {
    await delay(400);
    return {
      qrCode: 'mock_qr_code_data',
      secret: 'MOCK_SECRET_KEY',
      backupCodes: [
        '123456', '789012', '345678', '901234',
        '567890', '234567', '890123', '456789'
      ]
    };
  },

  async verifyTwoFactor(code) {
    await delay(300);
    
    // Mock verification - accept any 6-digit code
    if (!/^\d{6}$/.test(code)) {
      throw new Error('Invalid code format');
    }

    // Update user's 2FA status
    const userId = 1; // Mock current user
    const userIndex = users.findIndex(u => u.Id === userId);
    if (userIndex !== -1) {
      users[userIndex].twoFactorEnabled = true;
    }

    return {
      success: true,
      user: {
        Id: users[userIndex].Id,
        username: users[userIndex].username,
        name: users[userIndex].name,
        email: users[userIndex].email,
        twoFactorEnabled: true
      }
    };
  },

  async getDevices() {
    await delay(300);
    return [
      {
        Id: 1,
        name: 'Chrome on Windows',
        type: 'browser',
        lastActive: Date.now() - 300000,
        current: true
      },
      {
        Id: 2,
        name: 'Mobile App - iOS',
        type: 'mobile',
        lastActive: Date.now() - 3600000,
        current: false
      }
    ];
  },

  async revokeDevice(deviceId) {
    await delay(200);
    return { success: true };
  }
};