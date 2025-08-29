
import React from 'react';

interface DeviceVerificationModalProps {
  onVerify: () => void;
}

const DeviceVerificationModal: React.FC<DeviceVerificationModalProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full border border-gray-700">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium leading-6 text-white">
            Confirm Your Device
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-400">
              For your security, please confirm that you want to authorize this device to access your account.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={onVerify}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 sm:text-sm transition-colors"
            >
              Verify This Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceVerificationModal;
