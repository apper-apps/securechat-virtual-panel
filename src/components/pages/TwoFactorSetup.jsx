import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '@/services/auth/AuthContext';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const TwoFactorSetup = () => {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { setupTwoFactor, verifyTwoFactor } = useAuth();

  const handleSetup = async () => {
    try {
      setLoading(true);
      await setupTwoFactor();
      setStep(2);
      toast.success('Two-factor authentication setup initiated');
    } catch (err) {
      toast.error('Failed to setup two-factor authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      toast.error('Please enter verification code');
      return;
    }

    try {
      setLoading(true);
      await verifyTwoFactor(verificationCode);
      toast.success('Two-factor authentication enabled successfully');
    } catch (err) {
      toast.error('Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-surface/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-text-tertiary/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Shield" className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Two-Factor Authentication</h1>
            <p className="text-text-secondary">
              {step === 1 ? 'Add extra security to your account' : 'Enter verification code from your authenticator app'}
            </p>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Info" className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-text-primary mb-1">Setup Instructions</h3>
                    <ol className="text-sm text-text-secondary space-y-1 list-decimal list-inside">
                      <li>Install an authenticator app (Google Authenticator, Authy, etc.)</li>
                      <li>Click setup to generate a QR code</li>
                      <li>Scan the QR code with your authenticator app</li>
                      <li>Enter the verification code to complete setup</li>
                    </ol>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSetup}
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Settings" className="w-4 h-4 mr-2" />
                    Setup Two-Factor Authentication
                  </>
                )}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="bg-surface/30 rounded-2xl p-6 text-center">
                <div className="w-32 h-32 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <div className="text-xs text-gray-800">QR Code Placeholder</div>
                </div>
                <p className="text-sm text-text-secondary">
                  Scan this QR code with your authenticator app
                </p>
              </div>

              <Input
                label="Verification Code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                disabled={loading}
                maxLength="6"
              />

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  disabled={loading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Enable'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TwoFactorSetup;