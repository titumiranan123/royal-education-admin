import React from 'react';
import { FaTimes, FaBook } from 'react-icons/fa';

interface Prop {
    onClose: () => void
}

const Popup: React.FC<Prop> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="bg-white w-[600px] h-[400px] p-6 rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                >
                    <FaTimes size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome!</h2>
                <p className="text-gray-600">This is a one-time popup message.</p>
                <div className="flex items-center mt-6 space-x-2 animate-bounce">
                    <FaBook size={24} className="text-purple-500" />
                    <span className="text-lg font-semibold text-purple-500">New Course Available!</span>
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded hover:from-purple-600 hover:to-indigo-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
